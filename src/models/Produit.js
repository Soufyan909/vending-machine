class Produit {
    constructor(id, nom, prix) {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
    }

    // Vérifie si le produit est achetable avec le solde donné
    estAchetable(solde) {
        return solde >= this.prix;
    }
}

module.exports = Produit; 