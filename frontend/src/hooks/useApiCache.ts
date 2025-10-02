import { useState, useEffect, useRef, useCallback } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface UseApiCacheOptions {
  cacheTime?: number; // Tempo de cache em ms (padrão: 5 minutos)
  debounceTime?: number; // Tempo de debounce em ms (padrão: 300ms)
  retryAttempts?: number; // Número de tentativas (padrão: 3)
  retryDelay?: number; // Delay inicial entre tentativas em ms (padrão: 1000ms)
}

export function useApiCache<T>(
  key: string,
  apiCall: () => Promise<T>,
  options: UseApiCacheOptions = {}
) {
  const {
    cacheTime = 5 * 60 * 1000, // 5 minutos
    debounceTime = 300,
    retryAttempts = 3,
    retryDelay = 1000
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());
  const debounceRef = useRef<number>();
  const abortControllerRef = useRef<AbortController>();

  // Função para verificar se o cache é válido
  const isCacheValid = useCallback((entry: CacheEntry<T>): boolean => {
    return Date.now() < entry.expiresAt;
  }, []);

  // Função para obter dados do cache
  const getCachedData = useCallback((): T | null => {
    const entry = cacheRef.current.get(key);
    if (entry && isCacheValid(entry)) {
      return entry.data;
    }
    return null;
  }, [key, isCacheValid]);

  // Função para armazenar dados no cache
  const setCachedData = useCallback((newData: T) => {
    const entry: CacheEntry<T> = {
      data: newData,
      timestamp: Date.now(),
      expiresAt: Date.now() + cacheTime
    };
    cacheRef.current.set(key, entry);
  }, [key, cacheTime]);

  // Função de retry com backoff exponencial
  const executeWithRetry = useCallback(async (
    fn: () => Promise<T>,
    attempt: number = 1
  ): Promise<T> => {
    try {
      return await fn();
    } catch (error: any) {
      if (attempt >= retryAttempts) {
        throw error;
      }

      // Se for rate limiting (429), aguarda muito mais tempo
      const isRateLimit = error?.response?.status === 429;
      const delay = isRateLimit 
        ? Math.min(retryDelay * Math.pow(3, attempt) * 5, 30000) // Max 60s para rate limit, crescimento mais agressivo
        : retryDelay * Math.pow(2, attempt - 1);

      console.log(`Tentativa ${attempt} falhou, tentando novamente em ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
      return executeWithRetry(fn, attempt + 1);
    }
  }, [retryAttempts, retryDelay]);

  // Função principal para buscar dados
  const fetchData = useCallback(async (forceRefresh: boolean = false) => {
    // Cancela requisição anterior se existir
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Verifica cache primeiro (se não for refresh forçado)
    if (!forceRefresh) {
      const cachedData = getCachedData();
      if (cachedData) {
        setData(cachedData);
        setError(null);
        return cachedData;
      }
    }

    setLoading(true);
    setError(null);
    
    // Cria novo AbortController
    abortControllerRef.current = new AbortController();

    try {
      const result = await executeWithRetry(apiCall);
      setCachedData(result);
      setData(result);
      setError(null);
      return result;
    } catch (err: any) {
      // Se foi cancelado, não atualiza o estado
      if (err.name === 'AbortError') {
        return;
      }
      
      console.error(`Erro ao buscar dados para ${key}:`, err);
      setError(err);
      
      // Mantém dados do cache se disponível, mesmo expirado
      const cachedData = cacheRef.current.get(key)?.data;
      if (cachedData) {
        setData(cachedData);
      }
    } finally {
      setLoading(false);
    }
  }, [key, getCachedData, setCachedData, executeWithRetry, apiCall]);

  // Função com debounce
  const debouncedFetch = useCallback((forceRefresh: boolean = false) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchData(forceRefresh);
    }, debounceTime);
  }, [fetchData, debounceTime]);

  // Função para refresh manual
  const refresh = useCallback(() => {
    fetchData(true);
  }, [fetchData]);

  // Função para limpar cache
  const clearCache = useCallback(() => {
    cacheRef.current.delete(key);
  }, [key]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    fetch: debouncedFetch,
    refresh,
    clearCache,
    isCached: !!getCachedData()
  };
}

export default useApiCache;