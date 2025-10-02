// ================================
// TIPOS DE AUTENTICAÇÃO
// ================================

export interface Perfil {
  id: number;
  nome: string;
  codigo: 'ADMIN' | 'GERENTE' | 'VETERINARIO' | 'TECNICO' | 'OPERADOR';
  descricao: string;
  permissoes: any;
}

export interface User {
  id: number;
  nome: string;
  email: string;
  perfil: Perfil;
  role: 'admin' | 'veterinario' | 'atendente' | 'user';
  ativo: boolean;
  ultimoLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

// ================================
// TIPOS DE CLIENTE
// ================================

export interface Cliente {
  id: number;
  nome: string;
  email?: string;
  telefone?: string;
  cpfCnpj?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  fax?: string;
  celular?: string;
  contato?: string;
  restricao?: string;
  codVetResp?: number;
  observacoes?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  _count?: {
    animais: number;
    pedidos: number;
  };
}

export interface CreateClienteRequest {
  nome: string;
  email?: string;
  telefone?: string;
  cpfCnpj?: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  fax?: string;
  celular?: string;
  contato?: string;
  restricao?: string;
  codVetResp?: number;
  observacoes?: string;
}

export interface UpdateClienteRequest extends Partial<CreateClienteRequest> {
  id: number;
}

// ================================
// TIPOS DE ANIMAL
// ================================

export interface Especie {
  id: number;
  nome: string;
  ativo: boolean;
}

export interface Animal {
  id: number;
  nome: string;
  especie: Especie;
  raca?: string;
  sexo: 'MACHO' | 'FEMEA';
  dataNascimento?: string;
  peso?: number;
  microchip?: string;
  observacoes?: string;
  ativo: boolean;
  cliente: Cliente;
  criadoEm: string;
  atualizadoEm: string;
  _count?: {
    pedidos: number;
  };
}

export interface CreateAnimalRequest {
  nome: string;
  clienteId: number;
  especieId: number;
  raca?: string;
  sexo: 'MACHO' | 'FEMEA';
  dataNascimento?: string;
  peso?: number;
  microchip?: string;
  observacoes?: string;
}

// ================================
// TIPOS DE PROFISSIONAL
// ================================

export interface Profissional {
  id: number;
  nome: string;
  crmv: string;
  especialidade?: string;
  telefone?: string;
  email?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreateProfissionalRequest {
  nome: string;
  crmv: string;
  especialidade?: string;
  telefone?: string;
  email?: string;
}

// ================================
// TIPOS DE EXAME
// ================================

export interface Exame {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  preco: number;
  tempoResultado: number;
  metodologia?: string;
  observacoes?: string;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreateExameRequest {
  nome: string;
  codigo: string;
  categoria: string;
  preco: number;
  tempoResultado: number;
  metodologia?: string;
  observacoes?: string;
}

// ================================
// TIPOS DE PEDIDO
// ================================

export interface Pedido {
  id: number;
  numero: string;
  cliente: Cliente;
  animal: Animal;
  profissional: Profissional;
  dataColeta: string;
  dataPrevisao: string;
  status: 'PENDENTE' | 'COLETADO' | 'PROCESSANDO' | 'CONCLUIDO' | 'CANCELADO';
  observacoes?: string;
  valorTotal: number;
  criadoEm: string;
  atualizadoEm: string;
  exames: PedidoExame[];
}

export interface PedidoExame {
  id: number;
  pedido: Pedido;
  exame: Exame;
  resultado?: string;
  observacoes?: string;
  status: 'PENDENTE' | 'COLETADO' | 'PROCESSANDO' | 'CONCLUIDO';
  criadoEm: string;
  atualizadoEm: string;
}

export interface CreatePedidoRequest {
  clienteId: number;
  animalId: number;
  profissionalId: number;
  dataColeta: string;
  observacoes?: string;
  exames: number[];
}

// ================================
// TIPOS DE DASHBOARD
// ================================

export interface DashboardStats {
  pedidosHoje: number;
  laudosHoje: number;
  receitaHoje: number;
  clientesAtivos: number;
  animaisCadastrados: number;
  totalExames: number;
  pedidosPendentes: number;
}

// ================================
// TIPOS DE FILTROS
// ================================

export interface BaseFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface ClienteFilters extends BaseFilters {
  ativo?: boolean;
  cidade?: string;
  uf?: string;
}

export interface AnimalFilters extends BaseFilters {
  clienteId?: number;
  especieId?: number;
  sexo?: 'MACHO' | 'FEMEA';
  ativo?: boolean;
}

export interface PedidoFilters extends BaseFilters {
  clienteId?: number;
  animalId?: number;
  profissionalId?: number;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
}

// ================================
// TIPOS DE RELATÓRIOS
// ================================

export interface RelatorioFilters {
  dataInicio: string;
  dataFim: string;
  clienteId?: number;
  profissionalId?: number;
  exameId?: number;
  status?: string;
}

// ================================
// TIPOS DE API
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface PaginatedResponse<T = any> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
  errors?: string[];
}

// ================================
// TIPOS DE FORMULÁRIOS
// ================================

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox';
  required?: boolean;
  placeholder?: string;
  options?: { value: string | number; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}

export interface FormConfig {
  fields: FormField[];
  submitLabel: string;
  cancelLabel?: string;
}
