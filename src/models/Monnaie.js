class Monnaie {
    static PIECES_VALIDES = [0.5, 1, 2, 5, 10];

    constructor(valeur) {
        if (!Monnaie.PIECES_VALIDES.includes(valeur)) {
            throw new Error(`Pièce invalide. Les pièces acceptées sont : ${Monnaie.PIECES_VALIDES.join(', ')} MAD`);
        }
        this.valeur = valeur;
    }

    static estPieceValide(valeur) {
        return Monnaie.PIECES_VALIDES.includes(valeur);
    }
}

module.exports = Monnaie; 