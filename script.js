const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Création d'un utilisateur
  const utilisateur = await prisma.utilisateur.create({
    data: {
      nom: "Jean Dupont",
      email: "jean.dupont@example.com",
      password: "securepassword123"
    },
  });

  // Création d'une catégorie
  const categorie = await prisma.categorie.create({
    data: { nom: "Travail" }
  });

  // Création d'une note
  const note = await prisma.note.create({
    data: {
      titre: "Réunion importante",
      contenu: "Il faut préparer le rapport pour demain.",
      utilisateurId: utilisateur.id,
      categorieId: categorie.id
    },
  });

  // Création d'un tag
  const tag = await prisma.tag.create({
    data: { nom: "Urgent" }
  });

  // Associer un tag à la note
  await prisma.note.update({
    where: { id: note.id },
    data: {
      tags: {
        connect: { id: tag.id }
      }
    }
  });

  console.log("Note créée avec succès !");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
