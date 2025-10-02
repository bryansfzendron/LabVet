import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Plus,
  Search,
  Edit,
  Trash2,
  Shield,
  AlertTriangle,
  X,
  Check,
  Lock
} from 'lucide-react';
import { PerfilService, Perfil, CreatePerfilData, UpdatePerfilData } from '../../services/perfil.service';
import { useAuthStore } from '@/stores/auth.store';

// Apenas o perfil ADMIN é verdadeiramente crítico, pois:
// - É o único que não pode ter suas permissões alteradas
// - É usado como referência em todos os middlewares de autenticação
// - VETERINARIO e GERENTE são apenas códigos usados em middlewares, mas suas permissões podem ser alteradas pelo ADMIN
const CRITICAL_PROFILE_CODES = ['ADMIN'] as const;

interface ProfileManagementProps {
  onClose?: () => void;
}

const ProfileManagement: React.FC<ProfileManagementProps> = () => {
  const { user: currentUser } = useAuthStore();
  const [perfis, setPerfis] = useState<Perfil[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPerfil, setEditingPerfil] = useState<Perfil | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // Verificar se o usuário atual tem permissão para gerenciar perfis
  const canManageProfiles = currentUser?.perfil?.permissoes?.admin || currentUser?.perfil?.permissoes?.configuracoes;

  // Carregar perfis (todos - ativos e inativos para gerenciamento)
  const loadPerfis = async () => {
    try {
      setLoading(true);
      const data = await PerfilService.getAllPerfis();
      setPerfis(data);
    } catch (err: any) {
      console.error('Erro ao carregar perfis:', err.message || 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (canManageProfiles) {
      loadPerfis();
    }
  }, [canManageProfiles]);

  // Criar perfil
  const handleCreatePerfil = async (data: CreatePerfilData) => {
    try {
      await PerfilService.createPerfil(data);
      setShowCreateModal(false);
      await loadPerfis();
      showNotification('success', 'Perfil criado com sucesso!');
    } catch (err: any) {
      console.error('Erro ao criar perfil:', err);
      console.log('Erro completo:', err);
      
      // Re-lançar o erro para que o modal possa capturá-lo
      throw err;
    }
  };

  // Atualizar perfil
  const handleUpdatePerfil = async (data: UpdatePerfilData) => {
    if (!editingPerfil) return;
    
    try {
      await PerfilService.updatePerfil(editingPerfil.id, data);
      setEditingPerfil(null);
      await loadPerfis();
      showNotification('success', 'Perfil atualizado com sucesso!');
    } catch (err: any) {
      showNotification('error', err.message || 'Erro ao atualizar perfil');
    }
  };

  // Deletar perfil
  const handleDeletePerfil = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir este perfil?')) return;
    
    try {
      await PerfilService.deletePerfil(id);
      await loadPerfis();
      showNotification('success', 'Perfil excluído com sucesso!');
    } catch (err: any) {
      showNotification('error', err.message || 'Erro ao excluir perfil');
    }
  };

  // Mostrar notificação
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  if (!canManageProfiles) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Acesso Restrito</h3>
          <p className="text-gray-600">
            Você não tem permissão para gerenciar perfis do sistema.
          </p>
        </div>
      </div>
    );
  }

  // Filtrar perfis
  const filteredPerfis = perfis.filter(perfil =>
    perfil.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    perfil.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (perfil.descricao && perfil.descricao.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
          notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <div className="flex items-center">
            {notification.type === 'success' ? (
              <Check className="w-5 h-5 mr-2" />
            ) : (
              <AlertTriangle className="w-5 h-5 mr-2" />
            )}
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <UserCheck className="w-6 h-6 text-blue-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Gerenciamento de Perfis</h2>
            <p className="text-sm text-gray-600">Gerencie os perfis de acesso do sistema</p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Novo Perfil
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Buscar perfis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Perfis Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perfil
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPerfis.map((perfil) => {
                const isCriticalProfile = CRITICAL_PROFILE_CODES.includes(perfil.codigo as any);
                
                return (
                  <tr key={perfil.id} className={`hover:bg-gray-50 ${!perfil.ativo ? 'opacity-60' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Shield className={`w-5 h-5 mr-3 ${perfil.ativo ? 'text-blue-500' : 'text-gray-400'}`} />
                        <div>
                          <div className={`text-sm font-medium ${perfil.ativo ? 'text-gray-900' : 'text-gray-500'}`}>
                            {perfil.nome}
                            {!perfil.ativo && <span className="ml-2 text-xs text-red-500">(Inativo)</span>}
                          </div>
                          {perfil.descricao && (
                            <div className="text-sm text-gray-500">{perfil.descricao}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {isCriticalProfile && (
                          <Lock className="h-4 w-4 text-amber-500" />
                        )}
                        <span className={`text-sm font-medium ${perfil.ativo ? 'text-gray-900' : 'text-gray-500'}`}>
                          {perfil.codigo}
                        </span>
                      </div>
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      perfil.ativo 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {perfil.ativo ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {!isCriticalProfile && (
                          <button
                            onClick={() => setEditingPerfil(perfil)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Editar perfil"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {!isCriticalProfile && (
                          <button
                            onClick={() => handleDeletePerfil(perfil.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Excluir perfil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPerfis.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Nenhum perfil encontrado</p>
        </div>
      )}

      {/* Modals */}
      {showCreateModal && (
        <CreatePerfilModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreatePerfil}
        />
      )}

      {editingPerfil && (
        <EditPerfilModal
          perfil={editingPerfil}
          onClose={() => setEditingPerfil(null)}
          onSubmit={handleUpdatePerfil}
        />
      )}
    </div>
  );
};

// Create Perfil Modal
const CreatePerfilModal: React.FC<{
  onClose: () => void;
  onSubmit: (data: CreatePerfilData) => void;
}> = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState<CreatePerfilData>({
    nome: '',
    codigo: '',
    descricao: '',
    permissoes: {
      admin: false,
      usuarios: false,
      configuracoes: false,
      relatorios: false,
      exames: false,
      financeiro: false,
      pedidos: false,
      laudos: false,
      clientes: false,
      animais: false,
      agenda: false,
      dashboard: false
    }
  });

  const [codeError, setCodeError] = useState<string>('');
  const [submitError, setSubmitError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(''); // Limpar erro anterior
    
    // Validar se o código não é um código crítico reservado
    if (CRITICAL_PROFILE_CODES.includes(formData.codigo as any)) {
      setCodeError(`O código "${formData.codigo}" é reservado pelo sistema e não pode ser usado.`);
      return;
    }

    // Validar formato do código
    if (!/^[A-Z_]+$/.test(formData.codigo)) {
      setCodeError('O código deve conter apenas letras maiúsculas e underscore (_)');
      return;
    }
    
    setCodeError('');
    
    try {
      await onSubmit(formData);
    } catch (err: any) {
      setSubmitError(err.message);
    }
  };

  const handleCodeChange = (value: string) => {
    // Remover caracteres inválidos em tempo real
    const upperValue = value.toUpperCase().replace(/[^A-Z_]/g, '');
    setFormData(prev => ({ ...prev, codigo: upperValue }));
    
    // Verificar se é um código crítico
    if (CRITICAL_PROFILE_CODES.includes(upperValue as any)) {
      setCodeError(`O código "${upperValue}" é reservado pelo sistema e não pode ser usado.`);
    } else {
      setCodeError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Criar Novo Perfil</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center text-red-600">
              <AlertTriangle className="w-4 h-4 mr-2" />
              <span className="text-sm">{submitError}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Perfil
            </label>
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código
            </label>
            <input
              type="text"
              value={formData.codigo}
              onChange={(e) => handleCodeChange(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                codeError 
                  ? 'border-red-300 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
              placeholder="Ex: GERENTE, TECNICO_LAB"
            />
            {codeError && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {codeError}
              </div>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Use apenas letras maiúsculas e underscore (_). Códigos reservados: {CRITICAL_PROFILE_CODES.join(', ')}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!!codeError}
              className={`px-4 py-2 text-white rounded-md transition-colors ${
                codeError 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Criar Perfil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const EditPerfilModal: React.FC<{
  perfil: Perfil;
  onClose: () => void;
  onSubmit: (data: UpdatePerfilData) => void;
}> = ({ perfil, onClose, onSubmit }) => {
  const [formData, setFormData] = useState<UpdatePerfilData>({
    nome: perfil.nome,
    codigo: perfil.codigo,
    descricao: perfil.descricao || '',
    ativo: perfil.ativo,
    permissoes: perfil.permissoes || {}
  });

  const [codeError, setCodeError] = useState<string>('');
  
  // Verificar se é um perfil crítico
  const isCriticalProfile = CRITICAL_PROFILE_CODES.includes(perfil.codigo as any);

  const handleInputChange = (field: keyof UpdatePerfilData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Se é um perfil crítico e o código foi alterado, bloquear
    if (isCriticalProfile && formData.codigo !== perfil.codigo) {
      setCodeError('Não é possível alterar o código de perfis críticos do sistema.');
      return;
    }
    
    // Se não é crítico, validar se não está tentando usar um código reservado
    if (!isCriticalProfile && formData.codigo !== perfil.codigo && CRITICAL_PROFILE_CODES.includes(formData.codigo as any)) {
      setCodeError(`O código "${formData.codigo}" é reservado pelo sistema e não pode ser usado.`);
      return;
    }
    
    setCodeError('');
    
    // Enviar dados do perfil incluindo o status ativo
    const updateData: UpdatePerfilData = {
      nome: formData.nome,
      codigo: formData.codigo,
      descricao: formData.descricao,
      ativo: formData.ativo
    };
    
    onSubmit(updateData);
  };

  const handleCodeChange = (value: string) => {
    const upperValue = value.toUpperCase();
    
    // Se é um perfil crítico, não permitir alteração
    if (isCriticalProfile) {
      return;
    }
    
    setFormData(prev => ({ ...prev, codigo: upperValue }));
    
    // Verificar se é um código crítico
    if (CRITICAL_PROFILE_CODES.includes(upperValue as any)) {
      setCodeError(`O código "${upperValue}" é reservado pelo sistema e não pode ser usado.`);
    } else {
      setCodeError('');
    }
  };



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Editar Perfil</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isCriticalProfile && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-center">
              <Lock className="w-4 h-4 text-amber-600 mr-2" />
              <span className="text-sm text-amber-800">
                Este é um perfil crítico do sistema. O código não pode ser alterado.
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Perfil
            </label>
            <input
              type="text"
              value={formData.nome || ''}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código
              {isCriticalProfile && (
                <Lock className="w-3 h-3 inline ml-1 text-gray-500" />
              )}
            </label>
            <input
              type="text"
              value={formData.codigo || ''}
              onChange={(e) => handleCodeChange(e.target.value)}
              disabled={isCriticalProfile}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                isCriticalProfile 
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed' 
                  : codeError 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
              }`}
              required
            />
            {codeError && (
              <div className="mt-1 flex items-center text-sm text-red-600">
                <AlertTriangle className="w-4 h-4 mr-1" />
                {codeError}
              </div>
            )}
            {!isCriticalProfile && (
              <p className="mt-1 text-xs text-gray-500">
                Códigos reservados: {CRITICAL_PROFILE_CODES.join(', ')}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={formData.descricao || ''}
              onChange={(e) => handleInputChange('descricao', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          {!isCriticalProfile && (
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status do Perfil
                </label>
                <p className="text-xs text-gray-500">
                  {formData.ativo ? 'Perfil ativo no sistema' : 'Perfil desativado no sistema'}
                </p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ativo || false}
                    onChange={(e) => handleInputChange('ativo', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {formData.ativo ? 'Ativo' : 'Inativo'}
                </span>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!!codeError}
              className={`px-4 py-2 text-white rounded-md transition-colors ${
                codeError 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;