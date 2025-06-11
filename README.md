# API Distributeur Automatique

Une API REST qui simule un distributeur automatique avec gestion des pièces, des produits et des transactions.

## Fonctionnalités

- Insertion de pièces de monnaie (MAD)
- Liste des produits disponibles avec état d'achat
- Sélection et achat de produits
- Distribution automatique des produits
- Rendu optimal de la monnaie
- Annulation de transaction

## 🛠️ Installation

```bash
# Cloner le repository
git clone [URL_DU_REPO]

# Installer les dépendances
npm install

# Lancer l'application
npm start

# Lancer les tests
npm test
```

## 📝 API Endpoints

### Pièces
- `POST /pieces` - Insérer une pièce
  - Body: `{ "valeur": 5 }`

### Produits
- `GET /produits` - Lister tous les produits avec leur état d'achat

### Panier
- `POST /panier` - Ajouter un produit au panier
  - Body: `{ "produitId": "1" }`

### Transaction
- `POST /valider` - Valider l'achat et distribuer les produits
- `POST /annuler` - Annuler la transaction

## 🧪 Tests

Les tests unitaires couvrent :
- Insertion de pièces
- Achat de produits
- Annulation de transaction
- Rendu de monnaie

## 📦 Structure du Projet

```
src/
├── controllers/    # Contrôleurs des routes
├── models/        # Modèles de données
├── services/      # Logique métier
├── routes/        # Définition des routes
└── tests/         # Tests unitaires
```

## 🔄 Workflow

1. Insérer des pièces
2. Consulter les produits disponibles
3. Ajouter des produits au panier
4. Valider l'achat ou annuler la transaction

## 📋 Hypothèses

- Stock illimité de pièces et produits
- Pièces acceptées : 0.5, 1, 2, 5, 10 MAD
- Pas de limite sur le nombre de produits dans le panier
- Rendu de monnaie optimisé (algorithme glouton) 

# Pour le développement (avec rechargement automatique)
npm run dev

# Pour la production
npm start

# Pour lancer les tests
npm test 
