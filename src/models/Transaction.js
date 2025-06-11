class Transaction {
    constructor() {
        this.solde = 0;
        this.panier = [];
        this.date = new Date();
        this.statut = 'EN_COURS'; // EN_COURS, VALIDEE, ANNULEE
    }

    ajouterPiece(valeur) {
        this.solde += valeur;
    }

    ajouterAuPanier(produit) {
        this.panier.push(produit);
    }

    getTotalPanier() {
        return this.panier.reduce((total, produit) => total + produit.prix, 0);
    }

    valider() {
        if (this.solde < this.getTotalPanier()) {
            throw new Error('Solde insuffisant');
        }
        this.statut = 'VALIDEE';
        return this.solde - this.getTotalPanier();
    }

    annuler() {
        this.statut = 'ANNULEE';
        return this.solde;
    }

    reinitialiser() {
        this.solde = 0;
        this.panier = [];
        this.statut = 'EN_COURS';
    }
}

module.exports = Transaction; 