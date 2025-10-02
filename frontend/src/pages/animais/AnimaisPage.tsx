import React, { useState, useEffect } from 'react';
import { Heart, Plus, Search, Filter } from 'lucide-react';
import { Animal, AnimalFilters, PaginatedResponse } from '@/types';
import { animalService } from '@/services/animal.service';
import AnimalCard from '@/components/animais/AnimalCard';
import AnimalForm from '@/components/animais/AnimalForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { toast } from 'react-hot-toast';

const AnimaisPage: React.FC = () => {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });
  
  const [filters, setFilters] = useState<AnimalFilters>({
    search: '',
    ativo: true,
    page: 1,
    limit: 12,
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | undefined>();
  const [showFilters, setShowFilters] = useState(false);
  const [especies, setEspecies] = useState<Array<{ id: number; nome: string }>>([]);

  // Carregar dados iniciais
  useEffect(() => {
    loadAnimais();
    loadEspecies();
  }, [filters]);

  const loadAnimais = async () => {
    try {
      setLoading(true);
      const response: PaginatedResponse<Animal> = await animalService.getAnimais(filters);
      setAnimais(response.data);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
      toast.error('Erro ao carregar animais');
    } finally {
      setLoading(false);
    }
  };

  const loadEspecies = async () => {
    try {
      const especiesData = await animalService.getEspecies();
      setEspecies(especiesData);
    } catch (error) {
      console.error('Erro ao carregar espécies:', error);
    }
  };

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleFilterChange = (newFilters: Partial<AnimalFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleNewAnimal = () => {
    setSelectedAnimal(undefined);
    setShowForm(true);
  };

  const handleEditAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setShowForm(true);
  };

  const handleDeleteAnimal = async (animal: Animal) => {
    if (window.confirm(`Tem certeza que deseja desativar o animal "${animal.nome}"?`)) {
      try {
        await animalService.deleteAnimal(animal.id);
        toast.success('Animal desativado com sucesso!');
        loadAnimais();
      } catch (error) {
        console.error('Erro ao desativar animal:', error);
        toast.error('Erro ao desativar animal');
      }
    }
  };

  const handleReactivateAnimal = async (animal: Animal) => {
    try {
      await animalService.reactivateAnimal(animal.id);
      toast.success('Animal reativado com sucesso!');
      loadAnimais();
    } catch (error) {
      console.error('Erro ao reativar animal:', error);
      toast.error('Erro ao reativar animal');
    }
  };

  const handleSaveAnimal = (_animal: Animal) => {
    setShowForm(false);
    setSelectedAnimal(undefined);
    loadAnimais();
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedAnimal(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Animais</h1>
          <p className="text-gray-600 mt-1">Gerencie os animais cadastrados</p>
        </div>
        <button 
          onClick={handleNewAnimal}
          className="btn-primary flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Novo Animal
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={filters.search || ''}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar animais..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filtros
            </button>
          </div>

          {/* Filtros expandidos */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Espécie
                </label>
                <select
                  value={filters.especieId || ''}
                  onChange={(e) => handleFilterChange({ especieId: e.target.value ? Number(e.target.value) : undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Todas as espécies</option>
                  {especies.map(especie => (
                    <option key={especie.id} value={especie.id}>
                      {especie.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sexo
                </label>
                <select
                  value={filters.sexo || ''}
                  onChange={(e) => handleFilterChange({ sexo: e.target.value as 'MACHO' | 'FEMEA' | undefined })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Todos</option>
                  <option value="MACHO">Macho</option>
                  <option value="FEMEA">Fêmea</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={filters.ativo?.toString() || 'true'}
                  onChange={(e) => handleFilterChange({ ativo: e.target.value === 'true' })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="true">Ativos</option>
                  <option value="false">Inativos</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : animais.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="text-center">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum animal encontrado
            </h3>
            <p className="text-gray-600 mb-4">
              {filters.search ? 'Tente ajustar os filtros de busca.' : 'Comece cadastrando o primeiro animal.'}
            </p>
            <button 
              onClick={handleNewAnimal}
              className="btn-primary flex items-center mx-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Animal
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Lista de animais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {animais.map(animal => (
              <AnimalCard
                key={animal.id}
                animal={animal}
                onEdit={handleEditAnimal}
                onDelete={handleDeleteAnimal}
                onReactivate={handleReactivateAnimal}
              />
            ))}
          </div>

          {/* Paginação */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Anterior
              </button>
              
              <span className="px-3 py-2 text-sm text-gray-700">
                Página {pagination.page} de {pagination.totalPages}
              </span>
              
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Próxima
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal do formulário */}
      <AnimalForm
        animal={selectedAnimal}
        isOpen={showForm}
        onSave={handleSaveAnimal}
        onCancel={handleCancelForm}
      />
    </div>
  );
};

export default AnimaisPage;