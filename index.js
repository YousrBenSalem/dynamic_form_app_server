// Charger la configuration des variables d'environnement depuis un fichier .env
require("dotenv").config();

// Importer le module express
const express = require("express");

// Créer une instance de l'application express
const app = express();

// Importer le module CORS pour gérer les autorisations cross-origin
const cors = require("cors");

// Importer le module body-parser pour traiter les données JSON dans les requêtes
const bodyParser = require("body-parser");

// Importer le module de connexion à la base de données
const connection = require("./db");

// Importer les routes liées aux utilisateurs
const userRoutes = require("./routes/users");

// Importer les routes liées à l'authentification
const authRoutes = require("./routes/auth");

// Importer les routes liées aux formulaires
const formsRoutes = require("./routes/forms");

// Établir une connexion à la base de données
connection();

// Utiliser le middleware pour traiter les données JSON dans les requêtes
app.use(express.json());

// Utiliser le middleware CORS pour gérer les autorisations cross-origin
app.use(cors());

// Utiliser le middleware body-parser pour traiter les données JSON dans les requêtes
app.use(bodyParser.json());

// Définir les routes pour les utilisateurs, l'authentification et les formulaires
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/forms", formsRoutes);

// Définir le numéro de port pour l'application, en utilisant le port défini dans les variables d'environnement ou le port 8080 par défaut
const port = process.env.PORT || 8080;

// Démarrer le serveur sur le port spécifié
app.listen(port, console.log(`Listening on port ${port}...`));
