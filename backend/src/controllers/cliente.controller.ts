import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para criação de cliente
interface CreateClienteData {
  nome: string;
  endereco?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
  cidade?: string;
  uf?: string;
  telefone?: string;
  fax?: string;
  celular?: string;
  email?: string;
  cpfCnpj?: string;
  contato?: string;
  restricao?: string;
  codVetResp?: number;
}

// Listar clientes com filtros
export const getClientes = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search, 
      ativo = true 
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {
      ativo: ativo === 'true' ? 'S' : 'N'
    };
    
    if (search) {
      where.OR = [
        { nome: { contains: search as string, mode: 'insensitive' } },
        { telefone: { contains: search as string, mode: 'insensitive' } },
        { celular: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
        { cpfCnpj: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    const [clientes, total] = await Promise.all([
      prisma.cliente.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          veterinarioResp: {
            select: {
              id: true,
              nome: true,
              telefone: true
            }
          },
          _count: {
            select: { animais: true }
          }
        },
        orderBy: { nome: 'asc' }
      }),
      prisma.cliente.count({ where })
    ]);

    return res.json({
      data: clientes,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Buscar cliente por ID
export const getClienteById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do cliente inválido' });
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
      include: {
        veterinarioResp: {
          select: {
            id: true,
            nome: true,
            telefone: true,
            email: true
          }
        },
        animais: {
          where: { ativo: true },
          include: {
            especie: {
              select: {
                id: true,
                nome: true
              }
            },
            _count: {
              select: { pedidos: true }
            }
          },
          orderBy: { nome: 'asc' }
        }
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    return res.json(cliente);
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Criar novo cliente
export const createCliente = async (req: Request, res: Response) => {
  try {
    const {
      nome,
      endereco,
      numero,
      complemento,
      bairro,
      cep,
      cidade,
      uf,
      telefone,
      fax,
      celular,
      email,
      cpfCnpj,
      contato,
      restricao,
      codVetResp
    }: CreateClienteData = req.body;

    // Validações básicas
    if (!nome) {
      return res.status(400).json({ 
        error: 'Nome é obrigatório' 
      });
    }

    // Verificar se CPF/CNPJ já existe (se fornecido)
     if (cpfCnpj) {
       const cpfCnpjExiste = await prisma.cliente.findFirst({
         where: { 
           cpfCnpj,
           ativo: 'S'
         }
       });

       if (cpfCnpjExiste) {
         return res.status(400).json({ error: 'CPF/CNPJ já cadastrado' });
       }
     }

     // Verificar se email já existe (se fornecido)
     if (email) {
       const emailExiste = await prisma.cliente.findFirst({
         where: { 
           email,
           ativo: 'S'
         }
       });

       if (emailExiste) {
         return res.status(400).json({ error: 'Email já cadastrado' });
       }
     }

    // Verificar se veterinário responsável existe (se fornecido)
    if (codVetResp) {
      const veterinarioExiste = await prisma.profissional.findUnique({
        where: { id: codVetResp }
      });

      if (!veterinarioExiste) {
        return res.status(400).json({ error: 'Veterinário responsável não encontrado' });
      }
    }

    const cliente = await prisma.cliente.create({
       data: {
         nome,
         endereco: endereco || null,
         numero: numero || null,
         complemento: complemento || null,
         bairro: bairro || null,
         cep: cep || null,
         cidade: cidade || null,
         uf: uf || null,
         telefone: telefone || null,
         fax: fax || null,
         celular: celular || null,
         email: email || null,
         cpfCnpj: cpfCnpj || null,
         contato: contato || null,
         restricao: restricao || 'N',
         codVetResp: codVetResp || null
       },
      include: {
        veterinarioResp: {
          select: {
            id: true,
            nome: true,
            telefone: true
          }
        }
      }
    });

    return res.status(201).json(cliente);
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Atualizar cliente
export const updateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do cliente inválido' });
    }

    const clienteExistente = await prisma.cliente.findUnique({
      where: { id: Number(id) }
    });

    if (!clienteExistente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Se está alterando o CPF/CNPJ, verificar se não existe outro com o mesmo
     if (updateData.cpfCnpj && updateData.cpfCnpj !== clienteExistente.cpfCnpj) {
       const cpfCnpjExiste = await prisma.cliente.findFirst({
         where: { 
           cpfCnpj: updateData.cpfCnpj,
           ativo: 'S',
           id: { not: Number(id) }
         }
       });

       if (cpfCnpjExiste) {
         return res.status(400).json({ error: 'CPF/CNPJ já cadastrado para outro cliente' });
       }
     }

     // Se está alterando o email, verificar se não existe outro com o mesmo
     if (updateData.email && updateData.email !== clienteExistente.email) {
       const emailExiste = await prisma.cliente.findFirst({
         where: { 
           email: updateData.email,
           ativo: 'S',
           id: { not: Number(id) }
         }
       });

       if (emailExiste) {
         return res.status(400).json({ error: 'Email já cadastrado para outro cliente' });
       }
     }

    // Se está alterando o veterinário responsável, verificar se existe
    if (updateData.codVetResp) {
      const veterinarioExiste = await prisma.profissional.findUnique({
        where: { id: updateData.codVetResp }
      });

      if (!veterinarioExiste) {
        return res.status(400).json({ error: 'Veterinário responsável não encontrado' });
      }
    }

    const clienteAtualizado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: updateData,
      include: {
        veterinarioResp: {
          select: {
            id: true,
            nome: true,
            telefone: true
          }
        }
      }
    });

    return res.json(clienteAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Deletar cliente (soft delete)
export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: 'ID do cliente inválido' });
    }

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
      include: {
        _count: {
          select: { animais: true }
        }
      }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    // Verificar se há animais associados
    if (cliente._count.animais > 0) {
      return res.status(400).json({ 
        error: 'Não é possível excluir cliente que possui animais cadastrados. Use a desativação.' 
      });
    }

    await prisma.cliente.update({
       where: { id: Number(id) },
       data: { ativo: 'N' }
     });

     return res.json({ message: 'Cliente excluído com sucesso' });
   } catch (error) {
     console.error('Erro ao excluir cliente:', error);
     return res.status(500).json({ error: 'Erro interno do servidor' });
   }
 };

 // Buscar clientes (search)
export const searchClientes = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    
    if (!q || (q as string).length < 2) {
      return res.status(400).json({ 
        error: 'Query deve ter pelo menos 2 caracteres' 
      });
    }

    const clientes = await prisma.cliente.findMany({
      where: {
        AND: [
          { ativo: 'S' },
          {
            OR: [
              { nome: { contains: q as string, mode: 'insensitive' } },
              { telefone: { contains: q as string, mode: 'insensitive' } },
              { celular: { contains: q as string, mode: 'insensitive' } },
              { email: { contains: q as string, mode: 'insensitive' } },
              { cpfCnpj: { contains: q as string, mode: 'insensitive' } }
            ]
          }
        ]
      },
      select: {
        id: true,
        nome: true,
        telefone: true,
        celular: true,
        email: true,
        cidade: true,
        uf: true
      },
      take: 10,
      orderBy: { nome: 'asc' }
    });

    return res.json(clientes);
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

// Reativar cliente
export const reactivateCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) }
    });

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    if (cliente.ativo === 'S') {
      return res.status(400).json({ error: 'Cliente já está ativo' });
    }

    const clienteReativado = await prisma.cliente.update({
      where: { id: Number(id) },
      data: { ativo: 'S' }
    });

    return res.json({ 
      message: 'Cliente reativado com sucesso', 
      cliente: clienteReativado 
    });
  } catch (error) {
    console.error('Erro ao reativar cliente:', error);
    return res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
