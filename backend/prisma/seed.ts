import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Verificar se já existe um usuário admin
  const existingAdmin = await prisma.usuario.findFirst({
    where: {
      email: 'admin@labvet.com'
    }
  });

  if (existingAdmin) {
    console.log('✅ Usuário admin já existe');
    return;
  }

  // Buscar o perfil de administrador
  const perfilAdmin = await prisma.perfil.findUnique({
    where: { codigo: 'ADMIN' }
  });

  if (!perfilAdmin) {
    throw new Error('Perfil ADMIN não encontrado. Execute as migrações primeiro.');
  }

  // Criar usuário admin
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.usuario.create({
    data: {
      nome: 'Administrador',
      email: 'admin@labvet.com',
      senha: hashedPassword,
      perfilId: perfilAdmin.id,
      ativo: true,
    },
    include: {
      perfil: true
    }
  });

  console.log('✅ Usuário admin criado com sucesso:', {
    id: admin.id,
    nome: admin.nome,
    email: admin.email,
    perfil: admin.perfil.codigo
  });

  // Criar outros usuários de teste
  const users = [
    {
      nome: 'Gerente Teste',
      email: 'gerente@labvet.com',
      senha: 'gerente123',
      perfil: 'GERENTE' as const
    },
    {
      nome: 'Dr. Veterinário',
      email: 'vet@labvet.com',
      senha: 'vet123',
      perfil: 'VETERINARIO' as const
    },
    {
      nome: 'Atendente Teste',
      email: 'atendente@labvet.com',
      senha: 'atendente123',
      perfil: 'OPERADOR' as const
    }
  ];

  for (const userData of users) {
    const existingUser = await prisma.usuario.findFirst({
      where: { email: userData.email }
    });

    if (!existingUser) {
      // Buscar o perfil correspondente
      const perfil = await prisma.perfil.findUnique({
        where: { codigo: userData.perfil }
      });

      if (!perfil) {
        console.error(`❌ Perfil ${userData.perfil} não encontrado`);
        continue;
      }

      const hashedUserPassword = await bcrypt.hash(userData.senha, 10);
      
      const user = await prisma.usuario.create({
        data: {
          nome: userData.nome,
          email: userData.email,
          senha: hashedUserPassword,
          perfilId: perfil.id,
          ativo: true,
        },
        include: {
          perfil: true
        }
      });

      console.log(`✅ Usuário ${userData.perfil} criado:`, {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil.codigo
      });
    }
  }

  console.log('🎉 Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });