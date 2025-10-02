import { useState } from 'react';
import { LogsService, LogSistema, SessaoAtiva } from '@/services/logs.service';

interface UseSecurityLogsConditionalProps {
  enabled: boolean;
}

interface UseSecurityLogsConditionalReturn {
  logs: LogSistema[];
  sessoes: SessaoAtiva[];
  historicoLogin: any[];
  loading: boolean;
  stats: any;
  loadData: (activeTab: 'logs' | 'sessions' | 'history', filtros: any) => Promise<void>;
  loadStats: () => Promise<void>;
}

export const useSecurityLogsConditional = ({ 
  enabled 
}: UseSecurityLogsConditionalProps): UseSecurityLogsConditionalReturn => {
  const [logs, setLogs] = useState<LogSistema[]>([]);
  const [sessoes, setSessoes] = useState<SessaoAtiva[]>([]);
  const [historicoLogin, setHistoricoLogin] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);

  const loadData = async (activeTab: 'logs' | 'sessions' | 'history', filtros: any) => {
    if (!enabled) {
      console.log('SecurityLogs: Chamadas de API desabilitadas - usuário sem permissão');
      return;
    }

    setLoading(true);
    try {
      switch (activeTab) {
        case 'logs':
          const logsResponse = await LogsService.getLogs(filtros);
          console.log('Resposta dos logs:', logsResponse); // Debug
          if (logsResponse && logsResponse.logs) {
            setLogs(logsResponse.logs);
          } else {
            console.error('Estrutura de resposta inválida:', logsResponse);
            setLogs([]);
          }
          break;
        case 'sessions':
          const sessoesData = await LogsService.getSessoesAtivas();
          setSessoes(sessoesData || []);
          break;
        case 'history':
          const historicoData = await LogsService.getHistoricoLogin();
          setHistoricoLogin(historicoData || []);
          break;
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Definir valores padrão em caso de erro
      switch (activeTab) {
        case 'logs':
          setLogs([]);
          break;
        case 'sessions':
          setSessoes([]);
          break;
        case 'history':
          setHistoricoLogin([]);
          break;
      }
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    if (!enabled) {
      console.log('SecurityLogs: Chamadas de API para stats desabilitadas - usuário sem permissão');
      return;
    }

    try {
      const statsData = await LogsService.getLogStats();
      setStats(statsData);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  return {
    logs,
    sessoes,
    historicoLogin,
    loading,
    stats,
    loadData,
    loadStats
  };
};