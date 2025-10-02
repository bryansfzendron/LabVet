const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function restorePerfis() {
  try {
    console.log('🔧 Restaurando perfis do sistema...');

    // Perfis necessários para o sistema
    const perfis = [
      {
        nome: 'ADMIN',
        codigo: 'ADMIN',
        descricao: 'Administrador do sistema com acesso total'
      },
      {
        nome: 'GERENTE',
        codigo: 'GERENTE', 
        descricao: 'Gerente com acesso administrativo e relatórios'
      },
      {
        nome: 'VETERINARIO',
        codigo: 'VETERINARIO',
        descricao: 'Veterinário com acesso a laudos e exames'
      },
      {
        nome: 'TECNICO',
        codigo: 'TECNICO',
        descricao: 'Técnico de laboratório'
      },
      {
        nome: 'OPERADOR',
        codigo: 'OPERADOR',
        descricao: 'Operador básico do sistema'
      }
    ];

    for (const perfil of perfis) {
      const existing = await prisma.perfil.findUnique({
        where: { codigo: perfil.codigo }
      });

      if (!existing) {
        const created = await prisma.perfil.create({
          data: perfil
        });
        console.log(`✅ Perfil criado: ${created.nome} (ID: ${created.id})`);
      } else {
        console.log(`ℹ️  Perfil já existe: ${existing.nome} (ID: ${existing.id})`);
      }
    }

    // Verificar resultado final
    const allPerfis = await prisma.perfil.findMany({
      orderBy: { id: 'asc' }
    });

    console.log('\n📋 Perfis no sistema:');
    allPerfis.forEach(perfil => {
      console.log(`- ${perfil.nome} (${perfil.codigo}) - ${perfil.descricao}`);
    });

    console.log('\n🎉 Perfis restaurados com sucesso!');

  } catch (error) {
    console.error('❌ Erro ao restaurar perfis:', error);
  } finally {
    await prisma.$disconnect();
  }
}

restorePerfis();