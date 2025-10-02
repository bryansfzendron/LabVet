const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createEspecies() {
  console.log('🐾 Criando espécies básicas...');

  const especies = [
    'Cão',
    'Gato', 
    'Coelho',
    'Hamster',
    'Chinchila',
    'Ferret',
    'Porquinho da Índia',
    'Ave',
    'Réptil',
    'Peixe',
    'Equino',
    'Bovino',
    'Suíno',
    'Ovino',
    'Caprino'
  ];

  try {
    for (const nomeEspecie of especies) {
      // Verificar se já existe
      const existingEspecie = await prisma.especie.findFirst({
        where: { nome: nomeEspecie }
      });

      if (!existingEspecie) {
        const especie = await prisma.especie.create({
          data: {
            nome: nomeEspecie,
            ativo: true
          }
        });
        console.log(`✅ Espécie criada: ${especie.nome}`);
      } else {
        console.log(`⚠️  Espécie já existe: ${nomeEspecie}`);
      }
    }

    console.log('🎉 Espécies criadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao criar espécies:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createEspecies();