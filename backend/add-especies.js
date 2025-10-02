const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addEspecies() {
  try {
    console.log('🐾 Adicionando espécies...');

    const especies = [
      { nome: 'Gato' },
      { nome: 'Coelho' },
      { nome: 'Hamster' },
      { nome: 'Pássaro' },
      { nome: 'Peixe' },
      { nome: 'Réptil' },
      { nome: 'Outros' }
    ];

    for (const especie of especies) {
      const especieExistente = await prisma.especie.findFirst({
        where: { nome: especie.nome }
      });

      if (!especieExistente) {
        const novaEspecie = await prisma.especie.create({
          data: especie
        });
        console.log(`✅ Espécie criada: ${novaEspecie.nome} (ID: ${novaEspecie.id})`);
      } else {
        console.log(`⚠️ Espécie já existe: ${especie.nome}`);
      }
    }

    console.log('🎉 Espécies adicionadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao adicionar espécies:', error);
  } finally {
    await prisma.$disconnect();
  }
}

addEspecies();