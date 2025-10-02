import { api } from './api';

// ================================
// TIPOS
// ================================

export interface LogSistema {
  id: number;
  usuarioId?: number;
  acao: string;
  tabela?: string;
  registroId?: number;
  dadosAntigos?: any;
  dadosNovos?: any;
  ip?: string;
  userAgent?: string;
  createdAt: string;
  usuario?: {
    id: number;
    nome: string;
    email: string;
  };
}

export interface LogsResponse {
  logs: LogSistema[];
  total: number;
  page: number;
  limit: number;
}

export interface SessaoAtiva {
  id: string;
  usuarioId: number;
  nomeUsuario: string;
  ip: string;
  userAgent: string;
  ultimaAtividade: string;
  ativo: boolean;
}

// ================================
// SERVIÇO DE LOGS
// ================================

export class LogsService {
  /**
   * Listar logs do sistema
   */
  static async getLogs(params?: {
    page?: number;
    limit?: number;
    acao?: string;
    usuarioId?: number;
    dataInicio?: string;
    dataFim?: string;
  }): Promise<LogsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.acao) queryParams.append('acao', params.acao);
    if (params?.usuarioId) queryParams.append('usuarioId', params.usuarioId.toString());
    if (params?.dataInicio) queryParams.append('dataInicio', params.dataInicio);
    if (params?.dataFim) queryParams.append('dataFim', params.dataFim);

    const query = queryParams.toString();
    const response = await api.get<LogsResponse>(`/logs${query ? `?${query}` : ''}`);
    return response.data;
  }

  /**
   * Obter estatísticas de logs
   */
  static async getLogStats(): Promise<{
    totalLogs: number;
    logsHoje: number;
    logsSemana: number;
    acoesFrequentes: Array<{ acao: string; count: number }>;
  }> {
    const response = await api.get('/logs/stats');
    return response.data;
  }

  /**
   * Listar sessões ativas
   */
  static async getSessoesAtivas(): Promise<SessaoAtiva[]> {
    const response = await api.get<{sessions: any[], total: number, page: number, limit: number, totalPages: number}>('/auth/sessions');
    // Mapear os dados do backend para o formato esperado pelo frontend
    return (response.data.sessions || []).map((session: any) => ({
      id: session.id,
      usuarioId: session.usuario?.id || 0,
      nomeUsuario: session.usuario || session.usuario?.nome || 'Usuário desconhecido',
      ip: session.ip || '',
      userAgent: session.userAgent || '',
      ultimaAtividade: session.ultimaAtividade || session.inicioSessao,
      ativo: true
    }));
  }

  /**
   * Encerrar sessão específica
   */
  static async encerrarSessao(sessionId: string): Promise<void> {
    await api.post(`/auth/sessions/${sessionId}/terminate`);
  }

  /**
   * Obter histórico de login do usuário
   */
  static async getHistoricoLogin(usuarioId?: number): Promise<Array<{
    id: number;
    usuarioId: number;
    nomeUsuario: string;
    ip: string;
    userAgent: string;
    dataLogin: string;
    sucesso: boolean;
  }>> {
    const query = usuarioId ? `?usuarioId=${usuarioId}` : '';
    const response = await api.get<{history: any[], total: number, page: number, limit: number}>(`/auth/login-history${query}`);
    return response.data.history || [];
  }
}