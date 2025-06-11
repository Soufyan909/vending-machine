const DistributeurService = require('../services/DistributeurService');

class DistributeurController {
    constructor() {
        this.distributeurService = new DistributeurService();
    }

    getSolde = (req, res) => {
        try {
            const solde = this.distributeurService.getSolde();
            res.json({ solde });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    insererPiece = (req, res) => {
        try {
            const { valeur } = req.body;
            const solde = this.distributeurService.insererPiece(valeur);
            res.json({ solde });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    getProduits = (req, res) => {
        try {
            const produits = this.distributeurService.getProduits();
            res.json(produits);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    ajouterAuPanier = (req, res) => {
        try {
            const { produitId } = req.body;
            const panier = this.distributeurService.ajouterAuPanier(produitId);
            res.json({ panier });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    validerAchat = (req, res) => {
        try {
            const resultat = this.distributeurService.validerAchat();
            res.json(resultat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    annulerTransaction = (req, res) => {
        try {
            const resultat = this.distributeurService.annulerTransaction();
            res.json(resultat);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = DistributeurController; 