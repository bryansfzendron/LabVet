import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../config/database';
import { asyncHandler, AppError, createValidationError } from '../middleware/errorHandler';
import { AuthenticatedRequest } from '../middleware/auth';

// Apenas o perfil ADMIN é verdadeiramente crítico, pois:
// - É o único que não pode ter suas permissões alteradas
// - É usado como referência em todos os middlewares de autenticação
// - VETERINARIO e GERENTE são apenas códigos usados em middlewares, mas suas permissões podem ser alteradas pelo ADMIN
const CRITICAL_PROFILE_CODES = ['ADMIN'] as const;

/**
 * @route   GET /api/perfis
 * @desc    Listar todos os perfis ativos (para página de permissões)
 * @access  Private
 */
export const getPerfis = asyncHandler(async (req: Request, res: Response) => {
  try {
    const perfis = await prisma.perfil.findMany({
      where: {
        ativo: true
      },
      select: {
        id: true,
        nome: true,
        codigo: true,
        descricao: true,
        permissoes: true,
        ativo: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return res.json(perfis);
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route   GET /api/perfis/all
 * @desc    Listar todos os perfis (ativos e inativos) para gerenciamento
 * @access  Private (Admin only)
 */
export const getAllPerfis = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Verificar se o usuário é admin
    if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores podem visualizar todos os perfis' });
    }

    const perfis = await prisma.perfil.findMany({
      select: {
        id: true,
        nome: true,
        codigo: true,
        descricao: true,
        permissoes: true,
        ativo: true
      },
      orderBy: {
        nome: 'asc'
      }
    });

    return res.json(perfis);
  } catch (error) {
    console.error('Erro ao buscar todos os perfis:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route   GET /api/perfis/:id
 * @desc    Buscar perfil por ID
 * @access  Private
 */
export const getPerfilById = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const perfil = await prisma.perfil.findUnique({
      where: {
        id: Number(id)
      },
      select: {
        id: true,
        nome: true,
        codigo: true,
        descricao: true,
        permissoes: true,
        ativo: true
      }
    });

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    return res.json(perfil);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

/**
 * @route   PUT /api/perfis/:id/permissoes
 * @desc    Atualizar permissões de um perfil
 * @access  Private (Admin only)
 */
export const updatePerfilPermissoes = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    throw createValidationError('ID do perfil é obrigatório');
  }
  
  const perfilId = parseInt(id);

  if (isNaN(perfilId)) {
    throw createValidationError('ID do perfil deve ser um número válido');
  }

  // Verificar se o usuário é admin
  if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
    throw new AppError('Acesso negado. Apenas administradores podem alterar permissões', 403);
  }

  // Schema de validação para permissões
  const permissoesSchema = z.object({
    admin: z.boolean().optional(),
    configuracoes: z.boolean().optional(),
    usuarios: z.boolean().optional(),
    relatorios: z.boolean().optional(),
    pedidos: z.boolean().optional(),
    laudos: z.boolean().optional(),
    clientes: z.boolean().optional(),
    animais: z.boolean().optional(),
    exames: z.boolean().optional(),
    financeiro: z.boolean().optional(),
    agenda: z.boolean().optional(),
    dashboard: z.boolean().optional(),
  });

  const permissoes = permissoesSchema.parse(req.body);

  // Verificar se o perfil existe
  const existingPerfil = await prisma.perfil.findUnique({
    where: { id: perfilId }
  });

  if (!existingPerfil) {
    throw new AppError('Perfil não encontrado', 404);
  }

  // Não permitir alterar permissões do perfil ADMIN
  if (existingPerfil.codigo === 'ADMIN') {
    throw new AppError('Não é possível alterar as permissões do perfil Administrador', 400);
  }

  // Atualizar as permissões
  const updatedPerfil = await prisma.perfil.update({
    where: { id: perfilId },
    data: {
      permissoes,
      updatedAt: new Date()
    },
    select: {
      id: true,
      nome: true,
      codigo: true,
      descricao: true,
      permissoes: true,
      ativo: true
    }
  });

  res.json({
    message: 'Permissões atualizadas com sucesso',
    perfil: updatedPerfil
  });
});

/**
 * @route   POST /api/perfis
 * @desc    Criar novo perfil
 * @access  Private (Admin only)
 */
export const createPerfil = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  // Verificar se o usuário é admin
  if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
    throw new AppError('Acesso negado. Apenas administradores podem criar perfis', 403);
  }

  // Schema de validação
  const createPerfilSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    codigo: z.string().min(1, 'Código é obrigatório').max(50, 'Código deve ter no máximo 50 caracteres').regex(/^[A-Z_]+$/, 'Código deve conter apenas letras maiúsculas e underscore'),
    descricao: z.string().optional(),
    permissoes: z.object({
      admin: z.boolean().optional(),
      configuracoes: z.boolean().optional(),
      usuarios: z.boolean().optional(),
      relatorios: z.boolean().optional(),
      pedidos: z.boolean().optional(),
      laudos: z.boolean().optional(),
      clientes: z.boolean().optional(),
      animais: z.boolean().optional(),
      exames: z.boolean().optional(),
      financeiro: z.boolean().optional(),
      agenda: z.boolean().optional(),
      dashboard: z.boolean().optional(),
    }).optional()
  });

  const { nome, codigo, descricao, permissoes } = createPerfilSchema.parse(req.body);

  // Verificar se o código não é um código crítico reservado
  if (CRITICAL_PROFILE_CODES.includes(codigo as any)) {
    throw new AppError(`O código "${codigo}" é reservado pelo sistema e não pode ser usado para novos perfis`, 400);
  }

  // Verificar se já existe um perfil com o mesmo código
  const existingPerfil = await prisma.perfil.findUnique({
    where: { codigo }
  });

  if (existingPerfil) {
    throw new AppError('Já existe um perfil com este código', 400);
  }

  // Criar o perfil
  const novoPerfil = await prisma.perfil.create({
    data: {
      nome,
      codigo,
      descricao,
      permissoes: permissoes || {},
      ativo: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    select: {
      id: true,
      nome: true,
      codigo: true,
      descricao: true,
      permissoes: true,
      ativo: true
    }
  });

  res.status(201).json({
    message: 'Perfil criado com sucesso',
    perfil: novoPerfil
  });
});

/**
 * @route   PUT /api/perfis/:id
 * @desc    Atualizar perfil
 * @access  Private (Admin only)
 */
export const updatePerfil = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    throw createValidationError('ID do perfil é obrigatório');
  }
  
  const perfilId = parseInt(id);

  if (isNaN(perfilId)) {
    throw createValidationError('ID do perfil deve ser um número válido');
  }

  // Verificar se o usuário é admin
  if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
    throw new AppError('Acesso negado. Apenas administradores podem atualizar perfis', 403);
  }

  // Schema de validação
  const updatePerfilSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres').optional(),
    codigo: z.string().min(1, 'Código é obrigatório').max(50, 'Código deve ter no máximo 50 caracteres').regex(/^[A-Z_]+$/, 'Código deve conter apenas letras maiúsculas e underscore').optional(),
    descricao: z.string().optional(),
    ativo: z.boolean().optional(),
    permissoes: z.object({
      admin: z.boolean().optional(),
      configuracoes: z.boolean().optional(),
      usuarios: z.boolean().optional(),
      relatorios: z.boolean().optional(),
      pedidos: z.boolean().optional(),
      laudos: z.boolean().optional(),
      clientes: z.boolean().optional(),
      animais: z.boolean().optional(),
      exames: z.boolean().optional(),
      financeiro: z.boolean().optional(),
      agenda: z.boolean().optional(),
      dashboard: z.boolean().optional(),
    }).optional()
  });

  const updateData = updatePerfilSchema.parse(req.body);

  // Verificar se o perfil existe
  const existingPerfil = await prisma.perfil.findUnique({
    where: { id: perfilId }
  });

  if (!existingPerfil) {
    throw new AppError('Perfil não encontrado', 404);
  }

  // Verificar se é um perfil crítico
  const isCriticalProfile = CRITICAL_PROFILE_CODES.includes(existingPerfil.codigo as any);

  // Não permitir alterar perfis críticos do sistema
  if (isCriticalProfile) {
    throw new AppError(`Não é possível alterar o perfil "${existingPerfil.nome}" pois é um perfil crítico do sistema`, 400);
  }

  // Validações de segurança para desativação de perfil
  if (updateData.ativo === false && existingPerfil.ativo === true) {
    // Verificar se há usuários ativos com este perfil
    const usuariosAtivos = await prisma.usuario.count({
      where: {
        perfilId: perfilId,
        ativo: true
      }
    });

    if (usuariosAtivos > 0) {
      throw new AppError(`Não é possível desativar o perfil "${existingPerfil.nome}" pois existem ${usuariosAtivos} usuário(s) ativo(s) utilizando este perfil. Desative primeiro os usuários ou altere seus perfis.`, 400);
    }
  }

  // Se está alterando o código, verificar se não é um código crítico reservado
  if (updateData.codigo && updateData.codigo !== existingPerfil.codigo) {
    if (CRITICAL_PROFILE_CODES.includes(updateData.codigo as any)) {
      throw new AppError(`O código "${updateData.codigo}" é reservado pelo sistema e não pode ser usado`, 400);
    }

    // Verificar se não existe outro perfil com o mesmo código
    const perfilWithSameCode = await prisma.perfil.findUnique({
      where: { codigo: updateData.codigo }
    });

    if (perfilWithSameCode) {
      throw new AppError('Já existe um perfil com este código', 400);
    }
  }

  // Atualizar o perfil
  const updatedPerfil = await prisma.perfil.update({
    where: { id: perfilId },
    data: {
      ...updateData,
      updatedAt: new Date()
    },
    select: {
      id: true,
      nome: true,
      codigo: true,
      descricao: true,
      permissoes: true,
      ativo: true
    }
  });

  res.json({
    message: 'Perfil atualizado com sucesso',
    perfil: updatedPerfil
  });
});

/**
 * @route   DELETE /api/perfis/:id
 * @desc    Deletar perfil (soft delete)
 * @access  Private (Admin only)
 */
export const deletePerfil = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  
  if (!id) {
    throw createValidationError('ID do perfil é obrigatório');
  }
  
  const perfilId = parseInt(id);

  if (isNaN(perfilId)) {
    throw createValidationError('ID do perfil deve ser um número válido');
  }

  // Verificar se o usuário é admin
  if (!req.user?.perfil || req.user.perfil !== 'ADMIN') {
    throw new AppError('Acesso negado. Apenas administradores podem deletar perfis', 403);
  }

  // Verificar se o perfil existe
  const existingPerfil = await prisma.perfil.findUnique({
    where: { id: perfilId }
  });

  if (!existingPerfil) {
    throw new AppError('Perfil não encontrado', 404);
  }

  // Verificar se é um perfil crítico
  const isCriticalProfile = CRITICAL_PROFILE_CODES.includes(existingPerfil.codigo as any);

  // Não permitir deletar perfis críticos do sistema
  if (isCriticalProfile) {
    throw new AppError(`Não é possível deletar o perfil "${existingPerfil.nome}" pois é um perfil crítico do sistema`, 400);
  }

  // Verificar se existem usuários usando este perfil
  const usuariosComPerfil = await prisma.usuario.count({
    where: { perfilId: perfilId }
  });

  if (usuariosComPerfil > 0) {
    throw new AppError('Não é possível deletar este perfil pois existem usuários associados a ele', 400);
  }

  // Soft delete - marcar como inativo
  await prisma.perfil.update({
    where: { id: perfilId },
    data: {
      ativo: false,
      updatedAt: new Date()
    }
  });

  res.json({
    message: 'Perfil deletado com sucesso'
  });
});