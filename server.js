const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const port = 3000;

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes pour les Utilisateurs

// Route POST pour créer un utilisateur
app.post('/utilisateur', async (req, res) => {
  const { nom, email, password } = req.body;
  if (!nom || !email || !password) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis" });
  }
  try {
    const utilisateur = await prisma.utilisateur.create({
      data: { nom, email, password },
    });
    res.status(201).json(utilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
});

// Route PUT pour mettre à jour un utilisateur
app.put('/utilisateur/:id', async (req, res) => {
  const { id } = req.params;
  const { nom, email, password } = req.body;
  if (!nom || !email || !password) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis" });
  }
  try {
    const utilisateurExist = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) },
    });
    if (!utilisateurExist) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    const utilisateur = await prisma.utilisateur.update({
      where: { id: parseInt(id) },
      data: { nom, email, password },
    });
    res.json(utilisateur);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});
// Route GET pour récupérer toutes les notes
app.get('/notes', async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      include: {
        utilisateur: true, // Inclure les informations de l'utilisateur qui a créé la note
        categorie: true, // Inclure les informations de la catégorie de la note
      },
    });
    res.json(notes); // Retourne la liste des notes
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des notes" });
  }
});
// Route DELETE pour supprimer un utilisateur
app.delete('/utilisateur/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const utilisateurExist = await prisma.utilisateur.findUnique({
      where: { id: parseInt(id) },
    });
    if (!utilisateurExist) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    await prisma.utilisateur.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

// Routes pour les Catégories

// Route POST pour créer une catégorie
app.post('/categorie', async (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res.status(400).json({ message: "Le champ nom est requis" });
  }
  try {
    const categorie = await prisma.categorie.create({
      data: { nom },
    });
    res.status(201).json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la catégorie" });
  }
});

// Route PUT pour mettre à jour une catégorie
app.put('/categorie/:id', async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  if (!nom) {
    return res.status(400).json({ message: "Le champ nom est requis" });
  }
  try {
    const categorieExist = await prisma.categorie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!categorieExist) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    const categorie = await prisma.categorie.update({
      where: { id: parseInt(id) },
      data: { nom },
    });
    res.json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la catégorie" });
  }
});

// Route DELETE pour supprimer une catégorie
app.delete('/categorie/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const categorieExist = await prisma.categorie.findUnique({
      where: { id: parseInt(id) },
    });
    if (!categorieExist) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    await prisma.categorie.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Catégorie supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la catégorie" });
  }
});

// Routes pour les Tags

// Route POST pour créer un tag
app.post('/tag', async (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res.status(400).json({ message: "Le champ nom est requis" });
  }
  try {
    const tag = await prisma.tag.create({
      data: { nom },
    });
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du tag" });
  }
});

// Route PUT pour mettre à jour un tag
app.put('/tag/:id', async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  if (!nom) {
    return res.status(400).json({ message: "Le champ nom est requis" });
  }
  try {
    const tagExist = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });
    if (!tagExist) {
      return res.status(404).json({ message: "Tag non trouvé" });
    }
    const tag = await prisma.tag.update({
      where: { id: parseInt(id) },
      data: { nom },
    });
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour du tag" });
  }
});

// Route DELETE pour supprimer un tag
app.delete('/tag/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tagExist = await prisma.tag.findUnique({
      where: { id: parseInt(id) },
    });
    if (!tagExist) {
      return res.status(404).json({ message: "Tag non trouvé" });
    }
    await prisma.tag.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Tag supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression du tag" });
  }
});

// Routes pour les Notes

// Route POST pour créer une note
app.post('/note', async (req, res) => {
  const { titre, contenu, utilisateurId, categorieId } = req.body;
  if (!titre || !contenu || !utilisateurId || !categorieId) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis" });
  }
  try {
    const note = await prisma.note.create({
      data: { titre, contenu, utilisateurId, categorieId },
    });
    res.status(201).json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création de la note" });
  }
});

// Route PUT pour mettre à jour une note
app.put('/note/:id', async (req, res) => {
  const { id } = req.params;
  const { titre, contenu, utilisateurId, categorieId } = req.body;
  if (!titre || !contenu || !utilisateurId || !categorieId) {
    return res.status(400).json({ message: "Tous les champs doivent être remplis" });
  }
  try {
    const noteExistante = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });
    if (!noteExistante) {
      return res.status(404).json({ message: "Note non trouvée" });
    }
    const note = await prisma.note.update({
      where: { id: parseInt(id) },
      data: { titre, contenu, utilisateurId, categorieId },
    });
    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la mise à jour de la note" });
  }
});

// Route DELETE pour supprimer une note
app.delete('/note/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const noteExistante = await prisma.note.findUnique({
      where: { id: parseInt(id) },
    });
    if (!noteExistante) {
      return res.status(404).json({ message: "Note non trouvée" });
    }
    await prisma.note.delete({ where: { id: parseInt(id) } });
    res.json({ message: "Note supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la suppression de la note" });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});
