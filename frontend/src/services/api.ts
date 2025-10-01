import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';
import { ApiError, ApiResponse } from '@/types';

// Configuração base da API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Criar instância do Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// ================================
// INTERCEPTADORES DE REQUISIÇÃO
// ================================

api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se existir
    const token = localStorage.getItem('labvet_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log da requisição em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// ================================
// INTERCEPTADORES DE RESPOSTA
// ================================

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log da resposta em desenvolvimento
    if (import.meta.env.DEV) {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`, {
        status: response.status,
        data: response.data,
      });
    }

    return response;
  },
  (error) => {
    const apiError: ApiError = error.response?.data || {
      error: 'Erro de conexão',
      code: 'NETWORK_ERROR',
      timestamp: new Date().toISOString(),
      path: error.config?.url || '',
      method: error.config?.method || '',
    };

    // Log do erro
    console.error(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      status: error.response?.status,
      error: apiError,
    });

    // Tratamento de erros específicos
    switch (error.response?.status) {
      case 401:
        // Token expirado ou inválido
        localStorage.removeItem('labvet_token');
        localStorage.removeItem('labvet_user');
        
        // Redirecionar para login apenas se não estiver já na página de login
        if (!window.location.pathname.includes('/login')) {
          toast.error('Sessão expirada. Faça login novamente.');
          window.location.href = '/login';
        }
        break;

      case 403:
        toast.error('Acesso negado. Você não tem permissão para esta ação.');
        break;

      case 404:
        toast.error('Recurso não encontrado.');
        break;

      case 409:
        toast.error(apiError.error || 'Conflito de dados.');
        break;

      case 422:
        toast.error(apiError.error || 'Dados inválidos.');
        break;

      case 429:
        toast.error('Muitas tentativas. Tente novamente em alguns minutos.');
        break;

      case 500:
        toast.error('Erro interno do servidor. Tente novamente mais tarde.');
        break;

      case 503:
        toast.error('Serviço temporariamente indisponível.');
        break;

      default:
        if (error.code === 'NETWORK_ERROR' || !error.response) {
          toast.error('Erro de conexão. Verifique sua internet.');
        } else {
          toast.error(apiError.error || 'Erro inesperado.');
        }
    }

    return Promise.reject(apiError);
  }
);

// ================================
// FUNÇÕES UTILITÁRIAS DA API
// ================================

/**
 * Função genérica para requisições GET
 */
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.get<ApiResponse<T>>(url, config);
  return response.data.data;
};

/**
 * Função genérica para requisições POST
 */
export const post = async <T, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.post<ApiResponse<T>>(url, data, config);
  return response.data.data;
};

/**
 * Função genérica para requisições PUT
 */
export const put = async <T, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.put<ApiResponse<T>>(url, data, config);
  return response.data.data;
};

/**
 * Função genérica para requisições PATCH
 */
export const patch = async <T, D = any>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.patch<ApiResponse<T>>(url, data, config);
  return response.data.data;
};

/**
 * Função genérica para requisições DELETE
 */
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  const response = await api.delete<ApiResponse<T>>(url, config);
  return response.data.data;
};

/**
 * Função para download de arquivos
 */
export const downloadFile = async (
  url: string,
  filename?: string,
  config?: AxiosRequestConfig
): Promise<void> => {
  const response = await api.get(url, {
    ...config,
    responseType: 'blob',
  });

  // Criar URL do blob
  const blob = new Blob([response.data]);
  const downloadUrl = window.URL.createObjectURL(blob);

  // Criar link temporário para download
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename || 'download';
  document.body.appendChild(link);
  link.click();

  // Limpar
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
};

/**
 * Função para upload de arquivos
 */
export const uploadFile = async <T>(
  url: string,
  file: File,
  onProgress?: (progress: number) => void,
  config?: AxiosRequestConfig
): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<ApiResponse<T>>(url, formData, {
    ...config,
    headers: {
      'Content-Type': 'multipart/form-data',
      ...config?.headers,
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(progress);
      }
    },
  });

  return response.data.data;
};

/**
 * Função para verificar se a API está online
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    await api.get('/health');
    return true;
  } catch {
    return false;
  }
};

/**
 * Função para configurar o token de autenticação
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    localStorage.setItem('labvet_token', token);
  } else {
    localStorage.removeItem('labvet_token');
  }
};

/**
 * Função para obter o token de autenticação
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem('labvet_token');
};

/**
 * Função para limpar dados de autenticação
 */
export const clearAuth = (): void => {
  localStorage.removeItem('labvet_token');
  localStorage.removeItem('labvet_user');
};

// Exportar instância do Axios para uso direto se necessário
export default api;