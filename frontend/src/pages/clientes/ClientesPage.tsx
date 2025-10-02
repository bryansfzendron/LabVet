import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  Search,
  Filter,
  Plus,
  Users,
  Grid,
  List
} from 'lucide-react';
import { Cliente, ClienteFilters } from '@/types';
import { clienteService, useClientes } from '@/services/cliente.service';
import ClienteForm from '@/components/clientes/ClienteForm';
import ClienteCard from '@/components/clientes/ClienteCard';

const ClientesPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<ClienteFilters>({
    ativo: true,
    page: 1,
    limit: 20
  });
  const [showFilters, setShowFilters] = useState(false);

  const {
    clientes,
    loading, 
    error,
    pagination,
    refetch
  } = useClientes(filters);

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== filters.search) {
        setFilters(prev => ({
          ...prev,
          search: searchTerm || undefined,
          page: 1
        }));
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, filters.search]);

  const handleCreateCliente = () => {
    setEditingCliente(null);
    setShowForm(true);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setShowForm(true);
  };

  const handleDeleteCliente = async (cliente: Cliente) => {
    if (!confirm(`Tem certeza que deseja desativar o cliente ${cliente.nome}?`)) {
      return;
    }

    try {
      await clienteService.desativar(cliente.id);
      toast.success('Cliente desativado com sucesso!');
      refetch();
    } catch (error) {
      console.error('Erro ao desativar cliente:', error);
      toast.error('Erro ao desativar cliente');
    }
  };



  const handleSaveCliente = (_cliente: Cliente) => {
    setShowForm(false);
    setEditingCliente(null);
    toast.success(editingCliente ? 'Cliente atualizado com sucesso!' : 'Cliente criado com sucesso!');
    refetch();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCliente(null);
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleFilterChange = (newFilters: Partial<ClienteFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <ClienteForm
          cliente={editingCliente || undefined}
          onSave={handleSaveCliente}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clientes</h1>
            <p className="text-gray-600 mt-1">Gerencie os clientes do laboratório</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              title={`Alternar para visualização em ${viewMode === 'grid' ? 'lista' : 'grade'}`}
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
            
            <button
              onClick={handleCreateCliente}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Novo Cliente
            </button>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome, email ou CPF/CNPJ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Filtros */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-3 py-2 border rounded-md transition-colors ${
                showFilters 
                  ? 'bg-blue-50 border-blue-300 text-blue-700' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Filter size={16} className="mr-2" />
              Filtros
            </button>

            <select
              value={filters.ativo === undefined ? 'all' : filters.ativo ? 'active' : 'inactive'}
              onChange={(e) => {
                const value = e.target.value;
                handleFilterChange({
                  ativo: value === 'all' ? undefined : value === 'active'
                });
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos os status</option>
              <option value="active">Apenas ativos</option>
              <option value="inactive">Apenas inativos</option>
            </select>
          </div>
        </div>

        {/* Filtros Expandidos */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Itens por página
                </label>
                <select
                  value={filters.limit || 20}
                  onChange={(e) => handleFilterChange({ limit: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Estatísticas */}
      {pagination && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Mostrando {((pagination.page - 1) * pagination.limit) + 1} a{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} de{' '}
              {pagination.total} clientes
            </span>
            <span>
              Página {pagination.page} de {pagination.pages}
            </span>
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-600">Erro ao carregar clientes: {error}</p>
        </div>
      )}

      {/* Lista de Clientes */}
      {!loading && !error && clientes && (
        <>
          {clientes.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || Object.keys(filters).length > 2
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece criando seu primeiro cliente'}
              </p>
              <button
                onClick={handleCreateCliente}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center mx-auto"
              >
                <Plus size={20} className="mr-2" />
                Criar Primeiro Cliente
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {clientes.map((cliente) => (
                <ClienteCard
                  key={cliente.id}
                  cliente={cliente}
                  onEdit={handleEditCliente}
                  onDelete={handleDeleteCliente}
                  showActions={true}
                />
              ))}
            </div>
          )}

          {/* Paginação */}
          {pagination && pagination.pages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        page === pagination.page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientesPage;
