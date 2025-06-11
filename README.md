# Distributeur Automatique

Application de distributeur automatique avec une interface web et une API REST.

## Prérequis

- Docker
- Docker Compose

## Installation et démarrage

1. Cloner le repository :
```bash
git clone <repository-url>
cd distributeur-automatique
```

2. Construire et démarrer les conteneurs :
```bash
docker-compose up --build
```

3. L'application sera accessible à l'adresse : http://localhost:3000

## Commandes Docker utiles

- Démarrer l'application :
```bash
docker-compose up
```

- Démarrer l'application en arrière-plan :
```bash
docker-compose up -d
```

- Arrêter l'application :
```bash
docker-compose down
```

- Voir les logs :
```bash
docker-compose logs -f
```

- Reconstruire l'image :
```bash
docker-compose build
```

## Structure du projet

```
.
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── public/
│   ├── app.js
│   ├── styles.css
│   └── index.html
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Fonctionnalités

- Insertion de pièces
- Liste des produits disponibles
- Ajout de produits au panier
- Validation d'achat
- Rendu de monnaie
- Annulation de transaction
- Interface utilisateur responsive

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
git clone https://github.com/Soufyan909/vending-machine.git

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
