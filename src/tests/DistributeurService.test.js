const DistributeurService = require('../services/DistributeurService');

describe('DistributeurService', () => {
    let service;

    beforeEach(() => {
        service = new DistributeurService();
    });

    describe('insererPiece', () => {
        it('devrait accepter une pièce valide', () => {
            const solde = service.insererPiece(5);
            expect(solde).toBe(5);
        });

        it('devrait rejeter une pièce invalide', () => {
            expect(() => service.insererPiece(3)).toThrow('Pièce invalide');
        });
    });

    describe('getProduits', () => {
        it('devrait retourner la liste des produits avec leur état d\'achat', () => {
            service.insererPiece(5);
            const produits = service.getProduits();
            expect(produits).toHaveLength(5);
            expect(produits[0]).toHaveProperty('achetable');
        });
    });

    describe('ajouterAuPanier', () => {
        it('devrait ajouter un produit au panier si le solde est suffisant', () => {
            service.insererPiece(5);
            const panier = service.ajouterAuPanier(1); // Soda à 3.5
            expect(panier).toHaveLength(1);
            expect(panier[0].nom).toBe('Soda');
        });

        it('devrait rejeter l\'ajout si le solde est insuffisant', () => {
            expect(() => service.ajouterAuPanier(1)).toThrow('Solde insuffisant');
        });
    });

    describe('validerAchat', () => {
        it('devrait valider l\'achat et retourner la monnaie', () => {
            service.insererPiece(5);
            service.ajouterAuPanier(1); // Soda à 3.5
            const resultat = service.validerAchat();
            expect(resultat.produits).toHaveLength(1);
            expect(resultat.monnaieARendre).toEqual({ 1: 1, 0.5: 1 });
        });

        it('devrait rejeter la validation si le solde est insuffisant', () => {
            service.insererPiece(2);
            service.ajouterAuPanier(1); // Soda à 3.5
            expect(() => service.validerAchat()).toThrow('Solde insuffisant');
        });
    });

    describe('annulerTransaction', () => {
        it('devrait annuler la transaction et rendre la monnaie', () => {
            service.insererPiece(5);
            const resultat = service.annulerTransaction();
            expect(resultat.monnaieARendre).toEqual({ 5: 1 });
        });
    });
}); 