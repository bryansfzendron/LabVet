const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('🔍 Verificando dados no banco...');

    // Verificar clientes
    const clientes = await prisma.cliente.findMany();
    console.log('📋 Clientes encontrados:', clientes.length);
    clientes.forEach(cliente => {
      console.log(`  - ID: ${cliente.id}, Nome: ${cliente.nome}, Ativo: ${cliente.ativo}`);
    });

    // Verificar espécies
    const especies = await prisma.especie.findMany();
    console.log('🐕 Espécies encontradas:', especies.length);
    especies.forEach(especie => {
      console.log(`  - ID: ${especie.id}, Nome: ${especie.nome}, Ativo: ${especie.ativo}`);
    });

    // Verificar usuários
    const usuarios = await prisma.usuario.findMany({
      include: { perfil: true }
    });
    console.log('👤 Usuários encontrados:', usuarios.length);
    usuarios.forEach(usuario => {
      console.log(`  - ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}, Perfil: ${usuario.perfil?.nome}`);
    });

  } catch (error) {
    console.error('❌ Erro ao verificar dados:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();