const express = require('express');
const router = express.Router();
const DistributeurController = require('../controllers/DistributeurController');

const controller = new DistributeurController();

// Routes pour les pièces
router.post('/pieces', controller.insererPiece);

// Routes pour les produits
router.get('/produits', controller.getProduits);

// Route pour le solde
router.get('/solde', controller.getSolde);

// Routes pour le panier
router.post('/panier', controller.ajouterAuPanier);

// Routes pour la transaction
router.post('/valider', controller.validerAchat);
router.post('/annuler', controller.annulerTransaction);

module.exports = router; 