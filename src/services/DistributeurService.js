const Produit = require('../models/Produit');
const Monnaie = require('../models/Monnaie');
const Transaction = require('../models/Transaction');

class DistributeurService {
    constructor() {
        this.produits = [
            new Produit(1, 'Soda', 3.5),
            new Produit(2, 'Eau', 2),
            new Produit(3, 'Chips', 4),
            new Produit(4, 'Chocolat', 5),
            new Produit(5, 'Sandwich', 7)
        ];
        this.transaction = new Transaction();
    }

    getSolde() {
        return this.transaction.solde;
    }

    insererPiece(valeur) {
        if (!Monnaie.estPieceValide(valeur)) {
            throw new Error('Pièce invalide');
        }
        this.transaction.ajouterPiece(valeur);
        return this.transaction.solde;
    }

    getProduits() {
        return this.produits.map(produit => ({
            ...produit,
            achetable: produit.estAchetable(this.transaction.solde)
        }));
    }

    ajouterAuPanier(produitId) {
        const produit = this.produits.find(p => p.id === produitId);
        if (!produit) {
            throw new Error('Produit non trouvé');
        }
        if (!produit.estAchetable(this.transaction.solde)) {
            throw new Error('Solde insuffisant');
        }
        this.transaction.ajouterAuPanier(produit);
        return this.transaction.panier;
    }

    validerAchat() {
        const monnaieARendre = this.transaction.valider();
        const resultat = {
            produits: this.transaction.panier,
            monnaieARendre: this.calculerRenduMonnaie(monnaieARendre)
        };
        this.transaction.reinitialiser();
        return resultat;
    }

    annulerTransaction() {
        const monnaieARendre = this.transaction.annuler();
        const resultat = {
            monnaieARendre: this.calculerRenduMonnaie(monnaieARendre)
        };
        this.transaction.reinitialiser();
        return resultat;
    }

    calculerRenduMonnaie(montant) {
        const pieces = Monnaie.PIECES_VALIDES.sort((a, b) => b - a);
        const rendu = {};
        let reste = montant;

        for (const piece of pieces) {
            const nombrePieces = Math.floor(reste / piece);
            if (nombrePieces > 0) {
                rendu[piece] = nombrePieces;
                reste = parseFloat((reste - (piece * nombrePieces)).toFixed(2));
            }
        }

        return rendu;
    }
}

module.exports = DistributeurService; 