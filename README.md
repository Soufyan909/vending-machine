# Distributeur Automatique

Application de distributeur automatique avec une interface web et une API REST.

## Prérequis

- Docker
- Docker Compose

## Installation et démarrage

1. Cloner le repository :
```bash
git clone https://github.com/Soufyan909/vending-machine.git
cd vending-machine
```

2. Construire et démarrer les conteneurs :
```bash
docker compose up --build
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
