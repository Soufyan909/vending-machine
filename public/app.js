const API_URL = 'http://localhost:3000/api';

// Éléments du DOM
const soldeElement = document.getElementById('solde');
const listeProduitsElement = document.getElementById('liste-produits');
const panierElement = document.getElementById('panier');
const messageElement = document.getElementById('message');

// État de l'application
let solde = 0;
let panier = [];
let historique = [];

// Fonctions utilitaires
function afficherMessage(message, type = 'success') {
    const messageElement = document.getElementById('message');
    if (!messageElement) return;

    messageElement.textContent = message;
    messageElement.className = `message ${type}`;
    messageElement.style.display = 'flex';
    
    // Ajouter une icône selon le type de message
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    messageElement.innerHTML = `<i class="fas fa-${icon}"></i> ${message}`;
    
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

function formaterPrix(prix) {
    return prix.toFixed(2);
}

function afficherChargement() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loading);
}

function masquerChargement() {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.remove();
    }
}

// Fonction pour obtenir l'icône appropriée pour un produit
function obtenirIconeProduit(nomProduit) {
    const nomProduitLower = nomProduit.toLowerCase();
    
    if (nomProduitLower.includes('coca')) return 'fa-bottle-water';
    if (nomProduitLower.includes('fanta')) return 'fa-glass-water';
    if (nomProduitLower.includes('sprite')) return 'fa-glass-water';
    if (nomProduitLower.includes('mars')) return 'fa-cookie';
    if (nomProduitLower.includes('snickers')) return 'fa-cookie';
    if (nomProduitLower.includes('twix')) return 'fa-cookie';
    if (nomProduitLower.includes('kitkat')) return 'fa-cookie';
    if (nomProduitLower.includes('chips')) return 'fa-bowl-food';
    if (nomProduitLower.includes('crackers')) return 'fa-bowl-food';
    if (nomProduitLower.includes('biscuits')) return 'fa-bowl-food';
    if (nomProduitLower.includes('sandwich')) return 'fa-burger';
    if (nomProduitLower.includes('pizza')) return 'fa-pizza-slice';
    if (nomProduitLower.includes('salade')) return 'fa-leaf';
    if (nomProduitLower.includes('eau')) return 'fa-bottle-water';
    if (nomProduitLower.includes('jus')) return 'fa-glass-water';
    if (nomProduitLower.includes('café')) return 'fa-mug-hot';
    if (nomProduitLower.includes('thé')) return 'fa-mug-hot';
    
    return 'fa-box'; // Icône par défaut
}

// Fonction pour sauvegarder l'historique
function sauvegarderHistorique(action, details) {
    const transaction = {
        date: new Date().toLocaleString(),
        action,
        details,
        solde
    };
    historique.unshift(transaction);
    localStorage.setItem('historique', JSON.stringify(historique));
}

// Fonction pour charger l'historique
function chargerHistorique() {
    const historiqueSauvegarde = localStorage.getItem('historique');
    if (historiqueSauvegarde) {
        historique = JSON.parse(historiqueSauvegarde);
    }
}

// Fonctions d'interaction avec l'API
async function insererPiece(valeur) {
    try {
        afficherChargement();
        const response = await fetch(`${API_URL}/pieces`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ valeur }),
        });

        const data = await response.json();
        if (response.ok) {
            solde = data.solde;
            soldeElement.textContent = formaterPrix(solde);
            chargerProduits();
            mettreAJourPanier();
            sauvegarderHistorique('Insertion de pièce', `Ajout de ${valeur} MAD`);
            afficherMessage(`Pièce de ${valeur} MAD insérée`, 'success');
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        afficherMessage(error.message, 'error');
    } finally {
        masquerChargement();
    }
}

// Fonction pour calculer le total du panier
function calculerTotalPanier() {
    return panier.reduce((sum, produit) => sum + produit.prix, 0);
}

// Fonction pour vérifier si un produit peut être ajouté au panier
function peutAjouterAuPanier(prixProduit) {
    const totalActuel = calculerTotalPanier();
    return (totalActuel + prixProduit) <= solde;
}

async function chargerProduits() {
    try {
        afficherChargement();
        const response = await fetch(`${API_URL}/produits`);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des produits');
        }
        
        const produits = await response.json();
        const totalActuel = calculerTotalPanier();
        
        listeProduitsElement.innerHTML = produits.map(produit => {
            const peutEtreAchete = solde >= produit.prix && peutAjouterAuPanier(produit.prix);
            return `
                <div class="produit-card ${peutEtreAchete ? 'achetable' : 'non-achetable'}">
                    <div class="produit-icon">
                        <i class="fas ${obtenirIconeProduit(produit.nom)}"></i>
                    </div>
                    <h3>${produit.nom}</h3>
                    <p class="prix">${formaterPrix(produit.prix)} MAD</p>
                    <div class="produit-status">
                        ${peutEtreAchete 
                            ? '<span class="status-achetable">✓ Disponible</span>' 
                            : solde < produit.prix 
                                ? '<span class="status-non-achetable">✗ Solde insuffisant</span>'
                                : '<span class="status-non-achetable">✗ Total dépasserait le solde</span>'}
                    </div>
                    <button 
                        onclick="ajouterAuPanier(${produit.id})"
                        ${!peutEtreAchete ? 'disabled' : ''}
                        class="${!peutEtreAchete ? 'btn-disabled' : ''}">
                        <i class="fas fa-cart-plus"></i> Ajouter au panier
                    </button>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
        afficherMessage(error.message, 'error');
    } finally {
        masquerChargement();
    }
}

async function ajouterAuPanier(produitId) {
    try {
        afficherChargement();
        
        // Récupération du produit depuis la liste des produits déjà chargés
        const produits = await fetch(`${API_URL}/produits`).then(res => res.json());
        const produit = produits.find(p => p.id === produitId);
        
        if (!produit) {
            throw new Error('Produit non trouvé');
        }
        
        if (!peutAjouterAuPanier(produit.prix)) {
            throw new Error('Le total dépasserait votre solde disponible');
        }

        // Animation du bouton
        const bouton = document.querySelector(`button[onclick="ajouterAuPanier(${produitId})"]`);
        if (bouton) {
            bouton.classList.add('adding');
            bouton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Ajout en cours...';
            bouton.disabled = true;
        }

        // Ajout au panier
        const responsePanier = await fetch(`${API_URL}/panier`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ produitId }),
        });

        if (!responsePanier.ok) {
            const errorData = await responsePanier.json();
            throw new Error(errorData.error || 'Erreur lors de l\'ajout au panier');
        }

        const data = await responsePanier.json();
        panier = data.panier;
        mettreAJourPanier();
        chargerProduits();
        sauvegarderHistorique('Ajout au panier', `${produit.nom} - ${formaterPrix(produit.prix)} MAD`);
        
        // Animation de succès
        if (bouton) {
            bouton.classList.remove('adding');
            bouton.classList.add('success');
            bouton.innerHTML = '<i class="fas fa-check"></i> Ajouté !';
            
            setTimeout(() => {
                bouton.classList.remove('success');
                bouton.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter au panier';
                bouton.disabled = false;
            }, 1500);
        }

        afficherMessage('Produit ajouté au panier', 'success');
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
        
        // Réinitialisation du bouton en cas d'erreur
        const bouton = document.querySelector(`button[onclick="ajouterAuPanier(${produitId})"]`);
        if (bouton) {
            bouton.classList.remove('adding');
            bouton.innerHTML = '<i class="fas fa-cart-plus"></i> Ajouter au panier';
            bouton.disabled = false;
        }
        
        afficherMessage(error.message || 'Une erreur est survenue lors de l\'ajout au panier', 'error');
    } finally {
        masquerChargement();
    }
}

async function supprimerDuPanier(produitId) {
    try {
        afficherChargement();
        const produit = panier.find(p => p.id === produitId);
        const response = await fetch(`${API_URL}/panier/${produitId}`, {
            method: 'DELETE',
        });

        const data = await response.json();
        if (response.ok) {
            panier = data.panier;
            mettreAJourPanier();
            chargerProduits();
            sauvegarderHistorique('Suppression du panier', `${produit.nom} - ${formaterPrix(produit.prix)} MAD`);
            afficherMessage('Produit retiré du panier', 'success');
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        afficherMessage(error.message, 'error');
    } finally {
        masquerChargement();
    }
}

function mettreAJourPanier() {
    if (panier.length === 0) {
        panierElement.innerHTML = `
            <div class="panier-vide">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
        return;
    }

    const total = calculerTotalPanier();
    const soldeSuffisant = solde >= total;
    const reste = solde - total;

    panierElement.innerHTML = `
        <div class="panier-items">
            ${panier.map(produit => `
                <div class="panier-item" data-id="${produit.id}">
                    <div class="panier-item-icon">
                        <i class="fas ${obtenirIconeProduit(produit.nom)}"></i>
                    </div>
                    <div class="panier-item-details">
                        <span class="panier-item-nom">${produit.nom}</span>
                        <span class="panier-item-prix">${formaterPrix(produit.prix)} MAD</span>
                    </div>
                    <button class="btn-supprimer" onclick="supprimerDuPanier(${produit.id})" title="Retirer du panier">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>
        <div class="panier-total">
            <div class="total-info">
                <strong>Total : ${formaterPrix(total)} MAD</strong>
                <span class="solde-reste">Solde restant : ${formaterPrix(reste)} MAD</span>
            </div>
            ${!soldeSuffisant ? '<p class="solde-insuffisant">Solde insuffisant</p>' : ''}
        </div>
        <div class="panier-actions">
            <button class="btn-valider" onclick="validerAchat()" ${!soldeSuffisant ? 'disabled' : ''}>
                <i class="fas fa-check"></i> Valider l'achat
            </button>
            <button class="btn-annuler" onclick="annulerTransaction()">
                <i class="fas fa-times"></i> Annuler
            </button>
        </div>
    `;
}

async function validerAchat() {
    try {
        const total = calculerTotalPanier();
        if (solde < total) {
            throw new Error('Solde insuffisant pour valider l\'achat');
        }

        afficherChargement();
        const response = await fetch(`${API_URL}/valider`, {
            method: 'POST',
        });

        const data = await response.json();
        if (response.ok) {
            sauvegarderHistorique('Achat validé', {
                produits: panier.map(p => `${p.nom} - ${formaterPrix(p.prix)} MAD`),
                total: formaterPrix(total),
                monnaieRendue: data.monnaieARendre
            });
            localStorage.setItem('monnaieRendue', JSON.stringify(data.monnaieARendre));
            localStorage.setItem('produitsAchetes', JSON.stringify(data.produits));
            window.location.href = '/success.html';
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        afficherMessage(error.message, 'error');
    } finally {
        masquerChargement();
    }
}

async function annulerTransaction() {
    try {
        afficherChargement();
        const response = await fetch(`${API_URL}/annuler`, {
            method: 'POST',
        });

        const data = await response.json();
        if (response.ok) {
            const monnaieARendre = Object.entries(data.monnaieARendre)
                .map(([valeur, quantite]) => `${quantite} x ${valeur} MAD`)
                .join(', ');
            
            sauvegarderHistorique('Transaction annulée', {
                monnaieRendue: monnaieARendre,
                soldeInitial: solde
            });
            
            afficherMessage(`Transaction annulée. Monnaie rendue : ${monnaieARendre}`, 'success');
            solde = 0;
            soldeElement.textContent = formaterPrix(solde);
            panier = [];
            mettreAJourPanier();
            chargerProduits();
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        afficherMessage(error.message, 'error');
    } finally {
        masquerChargement();
    }
}

// Initialisation
chargerHistorique();
chargerProduits(); 