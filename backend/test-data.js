const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createTestData() {
  try {
    console.log('🌱 Criando dados de teste...');

    // Verificar se perfil ADMIN existe
    let perfilAdmin = await prisma.perfil.findFirst({
      where: { nome: 'ADMIN' }
    });

    if (!perfilAdmin) {
      perfilAdmin = await prisma.perfil.create({
        data: {
          nome: 'ADMIN',
          codigo: 'ADMIN',
          descricao: 'Administrador do sistema',
          ativo: true
        }
      });
      console.log('✅ Perfil ADMIN criado:', perfilAdmin);
    } else {
      console.log('✅ Perfil ADMIN já existe:', perfilAdmin);
    }

    // Verificar se usuário admin já existe
    let usuarioAdmin = await prisma.usuario.findFirst({
      where: { email: 'bryan.zendron@gmail.com' }
    });

    if (!usuarioAdmin) {
      const senhaHash = await bcrypt.hash('@cs7007B', 10);
      usuarioAdmin = await prisma.usuario.create({
        data: {
          nome: 'Bryan Zendron',
          email: 'bryan.zendron@gmail.com',
          senha: senhaHash,
          perfilId: perfilAdmin.id,
          ativo: true
        }
      });
      console.log('✅ Usuário admin criado:', { id: usuarioAdmin.id, nome: usuarioAdmin.nome, email: usuarioAdmin.email });
    } else {
      console.log('✅ Usuário admin já existe:', { id: usuarioAdmin.id, nome: usuarioAdmin.nome, email: usuarioAdmin.email });
    }

    // Verificar se cliente já existe
    let cliente = await prisma.cliente.findFirst({
      where: { email: 'teste@cliente.com' }
    });

    if (!cliente) {
      // Criar cliente de teste
      cliente = await prisma.cliente.create({
        data: {
          nome: 'João Silva',
          email: 'teste@cliente.com',
          telefone: '1199999999',
          cpfCnpj: '12345678900',
          endereco: 'Rua das Flores, 123',
          cidade: 'São Paulo',
          uf: 'SP',
          ativo: 'S'
        }
      });
      console.log('✅ Cliente criado:', cliente);
    } else {
      console.log('✅ Cliente já existe:', cliente);
    }

    // Verificar se espécie já existe
    let especie = await prisma.especie.findFirst({
      where: { nome: 'Cão' }
    });

    if (!especie) {
      // Criar espécie de teste
      especie = await prisma.especie.create({
        data: {
          nome: 'Cão',
          ativo: true
        }
      });
      console.log('✅ Espécie criada:', especie);
    } else {
      console.log('✅ Espécie já existe:', especie);
    }

    console.log('🎉 Dados de teste criados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar dados de teste:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestData();