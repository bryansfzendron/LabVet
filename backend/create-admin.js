const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔍 Verificando se usuário admin existe...');
    
    // Primeiro, vamos deletar o usuário admin se existir
    const existingAdmin = await prisma.usuario.findFirst({
      where: {
        email: 'admin@labvet.com'
      }
    });

    if (existingAdmin) {
      console.log('🗑️ Deletando usuário admin existente...');
      await prisma.usuario.delete({
        where: {
          id: existingAdmin.id
        }
      });
    }

    // Criar novo usuário admin com senha correta
    console.log('👤 Criando novo usuário admin...');
    const hashedPassword = await bcrypt.hash('admin123', 12); // Usando 12 rounds como no auth.controller.ts
    
    const admin = await prisma.usuario.create({
      data: {
        nome: 'Administrador',
        email: 'admin@labvet.com',
        senha: hashedPassword,
        perfil: 'ADMIN',
        ativo: true
        // createdAt e updatedAt são automáticos
      }
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('📧 Email: admin@labvet.com');
    console.log('🔑 Senha: admin123');
    console.log('👑 Perfil: ADMIN');
    
    // Verificar se foi criado corretamente
    const verification = await prisma.usuario.findUnique({
      where: {
        email: 'admin@labvet.com'
      }
    });
    
    console.log('🔍 Verificação:', {
      id: verification.id,
      email: verification.email,
      perfil: verification.perfil,
      ativo: verification.ativo
    });

  } catch (error) {
    console.error('❌ Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
