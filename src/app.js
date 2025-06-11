const express = require('express');
const cors = require('cors');
const path = require('path');
const distributeurRoutes = require('./routes/distributeurRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Routes API
app.use('/api', distributeurRoutes);

// Routes des pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route pour la page de succès
app.get('/success.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/success.html'));
});

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Une erreur est survenue' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

module.exports = app; 