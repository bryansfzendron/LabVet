const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkPerfis() {
  try {
    console.log('🔍 Verificando perfis no banco...');
    
    const perfis = await prisma.perfil.findMany({
      orderBy: { id: 'asc' }
    });

    console.log('📋 Perfis encontrados:');
    perfis.forEach(perfil => {
      console.log(`- ID: ${perfil.id}, Nome: ${perfil.nome}, Código: ${perfil.codigo}`);
    });

    console.log('\n🔍 Verificando usuários...');
    const usuarios = await prisma.usuario.findMany({
      include: {
        perfil: true
      }
    });

    console.log('👥 Usuários encontrados:');
    usuarios.forEach(usuario => {
      console.log(`- ${usuario.nome} (${usuario.email}) - Perfil: ${usuario.perfil.codigo}`);
    });

  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPerfis();