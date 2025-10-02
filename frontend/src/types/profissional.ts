// Tipos para o módulo de Profissionais
// Baseado no schema Prisma e código Delphi legado

export enum TipoProfissional {
  SOLICITANTE = 'SOLICITANTE',
  INTERNO = 'INTERNO', 
  AMBOS = 'AMBOS'
}

export interface Conselho {
  id: number;
  nome: string;
  sigla: string;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Profissional {
  id: number;
  nome: string;
  documento?: string | null;
  registro?: string | null;
  conselhoId?: number | null;
  telefone?: string | null;
  email?: string | null;
  endereco?: string | null;
  cidade?: string | null;
  uf?: string | null;
  cep?: string | null;
  tipo: TipoProfissional;
  ativo: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Relacionamentos
  conselho?: Conselho | null;
}

export interface CreateProfissionalData {
  nome: string;
  documento?: string;
  registro?: string;
  conselhoId?: number;
  telefone?: string;
  email?: string;
  endereco?: string;
  cidade?: string;
  uf?: string;
  cep?: string;
  tipo: TipoProfissional;
  ativo?: boolean;
}

export interface UpdateProfissionalData extends Partial<CreateProfissionalData> {
  id: number;
}

export interface ProfissionalFilters {
  nome?: string;
  search?: string;
  tipo?: TipoProfissional;
  conselhoId?: number;
  ativo?: boolean;
  cidade?: string;
  uf?: string;
}

export interface ProfissionalListResponse {
  profissionais: Profissional[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Estados UF brasileiros para o select
export const ESTADOS_BRASIL = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

// Opções para o tipo de profissional
export const TIPO_PROFISSIONAL_OPTIONS = [
  { value: TipoProfissional.SOLICITANTE, label: 'Solicitante' },
  { value: TipoProfissional.INTERNO, label: 'Interno' },
  { value: TipoProfissional.AMBOS, label: 'Ambos' }
];