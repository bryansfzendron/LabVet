import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  Search,
  Filter,
  Plus,
  UserCheck,
  Grid,
  List,
  AlertTriangle
} from 'lucide-react';
import { Profissional, ProfissionalFilters, TipoProfissional, ESTADOS_BRASIL, TIPO_PROFISSIONAL_OPTIONS } from '@/types/profissional';
import { 
  useProfissionais, 
  useProfissionalDelete, 
  useProfissionalChangeStatus 
} from '@/hooks/useProfissionais';
import ProfissionalForm from '@/components/profissionais/ProfissionalForm';
import ProfissionalCard from '@/components/profissionais/ProfissionalCard';
import { ConfirmModal } from '@/components/ui/ConfirmModal';

const ProfissionaisPage: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProfissional, setEditingProfissional] = useState<Profissional | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [profissionalToDelete, setProfissionalToDelete] = useState<Profissional | null>(null);
  const [profissionalToChangeStatus, setProfissionalToChangeStatus] = useState<Profissional | null>(null);

  const {
    profissionais,
    total,
    totalPages,
    currentPage,
    limit,
    isLoading: loading,
    error,
    filters,
    updateFilters,
    goToPage,
    changeLimit,
    refetch
  } = useProfissionais({
    initialFilters: { ativo: true },
    initialLimit: 20
  });
// Mutations
  const deleteMutation = useProfissionalDelete();
  const changeStatusMutation = useProfissionalChangeStatus();

  // Funções para gerenciar exclusão
  const handleDeleteClick = (profissional: Profissional) => {
    setProfissionalToDelete(profissional);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (profissionalToDelete) {
      await deleteMutation.mutateAsync(profissionalToDelete.id);
      setShowDeleteModal(false);
      setProfissionalToDelete(null);
    }
  };

  // Funções para gerenciar alteração de status
  const handleStatusChangeClick = (profissional: Profissional) => {
    setProfissionalToChangeStatus(profissional);
    setShowStatusModal(true);
  };

  const confirmStatusChange = async () => {
    if (profissionalToChangeStatus) {
      await changeStatusMutation.mutateAsync({
        id: profissionalToChangeStatus.id,
        ativo: !profissionalToChangeStatus.ativo
      });
      setShowStatusModal(false);
      setProfissionalToChangeStatus(null);
    }
  };

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchTerm !== filters.search) {
        updateFilters({
          search: searchTerm || undefined
        });
      }
    }, 500);

    return () => clearTimeout(delayedSearch);
  }, [searchTerm, filters.search, updateFilters]);

  const handleCreateProfissional = () => {
    setEditingProfissional(null);
    setShowForm(true);
  };

  const handleEditProfissional = (profissional: Profissional) => {
    setEditingProfissional(profissional);
    setShowForm(true);
  };



  const handleToggleStatus = (profissional: Profissional) => {
    handleStatusChangeClick(profissional);
  };

  const handleSaveProfissional = () => {
    setShowForm(false);
    setEditingProfissional(null);
    toast.success(editingProfissional ? 'Profissional atualizado com sucesso!' : 'Profissional criado com sucesso!');
    refetch();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProfissional(null);
  };

  const handlePageChange = (page: number) => {
    goToPage(page);
  };

  const handleFilterChange = (newFilters: Partial<ProfissionalFilters>) => {
    updateFilters(newFilters);
  };

  if (showForm) {
    return (
      <div className="space-y-6">
        <ProfissionalForm
          profissional={editingProfissional || undefined}
          onSave={handleSaveProfissional}
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
            <h1 className="text-3xl font-bold text-gray-900">Profissionais</h1>
            <p className="text-gray-600 mt-1">Gerencie os profissionais do laboratório</p>
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
              onClick={handleCreateProfissional}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <Plus size={20} className="mr-2" />
              Novo Profissional
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
              placeholder="Buscar por nome, documento ou registro..."
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Profissional
                </label>
                <select
                  value={filters.tipo || ''}
                  onChange={(e) => handleFilterChange({ 
                    tipo: e.target.value as TipoProfissional || undefined 
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os tipos</option>
                  {TIPO_PROFISSIONAL_OPTIONS.map((tipo) => (
                    <option key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <select
                  value={filters.uf || ''}
                  onChange={(e) => handleFilterChange({ uf: e.target.value || undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Todos os estados</option>
                  {ESTADOS_BRASIL.map((estado) => (
                    <option key={estado.value} value={estado.value}>
                      {estado.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Itens por página
                </label>
                <select
                value={limit}
                onChange={(e) => changeLimit(parseInt(e.target.value))}
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Mostrando {((currentPage - 1) * limit) + 1} a{' '}
            {Math.min(currentPage * limit, total)} de{' '}
            {total} profissionais
          </span>
          <span>
            Página {currentPage} de {totalPages}
          </span>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-2">Carregando profissionais...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-600">
            Erro ao carregar profissionais: {String(error)}
          </p>
          <button
            onClick={() => refetch()}
            className="mt-2 text-blue-600 hover:text-blue-800"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Lista de Profissionais */}
      {!loading && !error && profissionais && (
        <>
          {profissionais.length === 0 ? (
            <div className="text-center py-12">
              <UserCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum profissional encontrado</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || Object.keys(filters).length > 2
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece criando seu primeiro profissional'}
              </p>
              <button
                onClick={handleCreateProfissional}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center mx-auto"
              >
                <Plus size={20} className="mr-2" />
                Criar Primeiro Profissional
              </button>
            </div>
          ) : (
            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {profissionais.map((profissional) => (
                <ProfissionalCard
                  key={profissional.id}
                  profissional={profissional}
                  onEdit={handleEditProfissional}
                  onDelete={handleDeleteClick}
                  onToggleStatus={handleToggleStatus}
                  showActions={true}
                />
              ))}
            </div>
          )}

          {/* Paginação */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Próximo
                </button>
              </nav>
            </div>
          )}
        </>
      )}

      {/* Modal de Confirmação de Exclusão */}
      <ConfirmModal
         isOpen={showDeleteModal}
         onClose={() => {
           setShowDeleteModal(false);
           setProfissionalToDelete(null);
         }}
         onConfirm={confirmDelete}
         title="Confirmar Exclusão"
         message={`Tem certeza que deseja excluir o profissional ${profissionalToDelete?.nome}? Esta ação não pode ser desfeita.`}
         confirmText="Excluir"
         cancelText="Cancelar"
         type="danger"
         isLoading={deleteMutation.isLoading}
       />

       {/* Modal de Confirmação de Alteração de Status */}
       <ConfirmModal
         isOpen={showStatusModal}
         onClose={() => {
           setShowStatusModal(false);
           setProfissionalToChangeStatus(null);
         }}
         onConfirm={confirmStatusChange}
         title={`${profissionalToChangeStatus?.ativo ? 'Desativar' : 'Ativar'} Profissional`}
         message={`Tem certeza que deseja ${profissionalToChangeStatus?.ativo ? 'desativar' : 'ativar'} o profissional ${profissionalToChangeStatus?.nome}?`}
         confirmText={profissionalToChangeStatus?.ativo ? 'Desativar' : 'Ativar'}
         cancelText="Cancelar"
         type={profissionalToChangeStatus?.ativo ? 'warning' : 'info'}
         isLoading={changeStatusMutation.isLoading}
       />
    </div>
  );
};

export default ProfissionaisPage;