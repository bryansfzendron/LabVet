import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';

// ================================
// INTERFACES
// ================================

export interface EmpresaConfig {
  nome: string;
  cnpj: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  telefone: string;
  email: string;
  website: string;
  logo?: string;
}

export interface SistemaConfig {
  timezone: string;
  logs_nivel: 'debug' | 'info' | 'warn' | 'error';
  backup_automatico: boolean;
  manutencao: boolean;
}

export interface NotificacoesConfig {
  email_novos_pedidos: boolean;
  email_resultados_prontos: boolean;
  email_pagamentos: boolean;
  sms_resultados: boolean;
  push_notifications: boolean;
}

export interface EmailConfig {
  servidor: string;
  porta: string;
  usuario: string;
  senha: string;
  ssl: boolean;
  remetente_nome: string;
  remetente_email: string;
}

export interface ExamesConfig {
  prazo_padrao: string;
  auto_aprovacao: boolean;
  template_laudo: 'padrao' | 'detalhado' | 'simples';
  numeracao_automatica: boolean;
  prefixo_pedido: string;
}

export interface FinanceiroConfig {
  moeda: 'BRL' | 'USD' | 'EUR';
  desconto_maximo: string;
  juros_atraso: string;
  dias_vencimento: string;
  forma_pagamento_padrao: 'dinheiro' | 'cartao' | 'pix' | 'transferencia';
}

export interface AppConfig {
  empresa: EmpresaConfig;
  sistema: SistemaConfig;
  notificacoes: NotificacoesConfig;
  email: EmailConfig;
  exames: ExamesConfig;
  financeiro: FinanceiroConfig;
}

// ================================
// STORE INTERFACES
// ================================

interface ConfigState {
  config: AppConfig;
  isLoading: boolean;
  error: string | null;
  hasUnsavedChanges: boolean;
}

interface ConfigActions {
  // Ações principais
  loadConfig: () => Promise<void>;
  saveConfig: () => Promise<void>;
  resetConfig: () => void;
  clearError: () => void;
  
  // Atualizações por seção
  updateEmpresa: (data: Partial<EmpresaConfig>) => void;
  updateSistema: (data: Partial<SistemaConfig>) => void;
  updateNotificacoes: (data: Partial<NotificacoesConfig>) => void;
  updateEmail: (data: Partial<EmailConfig>) => void;
  updateExames: (data: Partial<ExamesConfig>) => void;
  updateFinanceiro: (data: Partial<FinanceiroConfig>) => void;
  
  // Getters
  getTimezone: () => string;
}

type ConfigStore = ConfigState & ConfigActions;

// ================================
// CONFIGURAÇÃO PADRÃO
// ================================

const defaultConfig: AppConfig = {
  empresa: {
    nome: 'LabVet',
    cnpj: '',
    endereco: '',
    cidade: '',
    estado: '',
    cep: '',
    telefone: '',
    email: '',
    website: '',
  },
  sistema: {
    timezone: 'America/Sao_Paulo',
    logs_nivel: 'info',
    backup_automatico: true,
    manutencao: false,
  },
  notificacoes: {
    email_novos_pedidos: true,
    email_resultados_prontos: true,
    email_pagamentos: true,
    sms_resultados: false,
    push_notifications: true,
  },
  email: {
    servidor: '',
    porta: '587',
    usuario: '',
    senha: '',
    ssl: true,
    remetente_nome: 'LabVet',
    remetente_email: '',
  },
  exames: {
    prazo_padrao: '3',
    auto_aprovacao: false,
    template_laudo: 'padrao',
    numeracao_automatica: true,
    prefixo_pedido: 'VL',
  },
  financeiro: {
    moeda: 'BRL',
    desconto_maximo: '20',
    juros_atraso: '2',
    dias_vencimento: '30',
    forma_pagamento_padrao: 'dinheiro',
  },
};

// ================================
// STORE DE CONFIGURAÇÕES
// ================================

export const useConfigStore = create<ConfigStore>()(
  persist(
    (set, get) => ({
      // Esta
      config: defaultConfig,
      isLoading: false,
      error: null,
      hasUnsavedChanges: false,

      // ================================
      // AÇÕES GERAIS
      // ================================

      loadConfig: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implementar chamada real para a API
          // const response = await configService.getConfig();
          
          // Por enquanto, usar configuração local
          await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
          
          set({
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Erro ao carregar configurações',
          });
        }
      },

      saveConfig: async () => {
        set({ isLoading: true, error: null });
        
        try {
          // TODO: Implementar chamada real para a API
          // await configService.saveConfig(get().config);
          
          // Simular salvamento
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          set({
            isLoading: false,
            error: null,
            hasUnsavedChanges: false,
          });
          
          toast.success('Configurações salvas com sucesso!');
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Erro ao salvar configurações',
          });
          
          toast.error('Erro ao salvar configurações');
        }
      },

      resetConfig: () => {
        set({
          config: defaultConfig,
          hasUnsavedChanges: true,
        });
        toast.info('Configurações resetadas para o padrão');
      },

      clearError: () => {
        set({ error: null });
      },

      // ================================
      // AÇÕES ESPECÍFICAS
      // ================================

      updateEmpresa: (data: Partial<EmpresaConfig>) => {
        set(state => ({
          config: {
            ...state.config,
            empresa: { ...state.config.empresa, ...data }
          },
          hasUnsavedChanges: true,
        }));
      },

      updateSistema: (data: Partial<SistemaConfig>) => {
        set(state => ({
          config: {
            ...state.config,
            sistema: { ...state.config.sistema, ...data }
          },
          hasUnsavedChanges: true,
        }));
        
        // Aplicar tema imediatamente
        if (data.tema) {
          applyTheme(data.tema);
        }
      },

      updateNotificacoes: (data: Partial<NotificacoesConfig>) => {
        set(state => ({
          config: {
            ...state.config,
            notificacoes: { ...state.config.notificacoes, ...data }
          },
          hasUnsavedChanges: true,
        }));
      },

      updateEmail: (data: Partial<EmailConfig>) => {
        set(state => ({
          config: {
            ...state.config,
            email: { ...state.config.email, ...data }
          },
          hasUnsavedChanges: true,
        }));
      },

      updateExames: (data: Partial<ExamesConfig>) => {
        set(state => ({
          config: {
            ...state.config,
            exames: { ...state.config.exames, ...data }
          },
          hasUnsavedChanges: true,
        }));
      },

      updateFinanceiro: (data: Partial<FinanceiroConfig>) => {
        set(state => ({
          config: {
            ...state.config,
            financeiro: { ...state.config.financeiro, ...data }
          },
          hasUnsavedChanges: true,
        }));
      },

      // ================================
      // GETTERS
      // ================================

      getTheme: () => {
        return get().config.sistema.tema;
      },

      getLanguage: () => {
        return get().config.sistema.idioma;
      },

      getTimezone: () => {
        return get().config.sistema.timezone;
      },
    }),
    {
      name: 'labvet-config',
      partialize: (state) => ({
        config: state.config,
      }),
    }
  )
);

// ================================
// FUNÇÕES AUXILIARES
// ================================

/**
 * Aplicar tema ao documento
 */
function applyTheme(theme: 'light' | 'dark' | 'auto') {
  const root = document.documentElement;
  
  if (theme === 'auto') {
    // Detectar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    theme = prefersDark ? 'dark' : 'light';
  }
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}

/**
 * Hook para inicializar configurações
 */
export const useInitializeConfig = () => {
  const { loadConfig, getTheme } = useConfigStore();
  
  useEffect(() => {
    loadConfig();
    
    // Aplicar tema inicial
    applyTheme(getTheme());
    
    // Escutar mudanças na preferência do sistema
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (getTheme() === 'auto') {
        applyTheme('auto');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [loadConfig, getTheme]);
};

export default useConfigStore;