// Importer les modules nécessaires
const mongoose = require("mongoose"); // Mongoose pour la gestion de la base de données MongoDB
const jwt = require("jsonwebtoken"); // JSON Web Token pour la génération et la vérification des tokens d'authentification
const Joi = require("joi"); // Joi pour la validation des données
const passwordComplexity = require("joi-password-complexity"); // Extension Joi pour définir des règles de complexité de mot de passe

// Définir le schéma mongoose pour l'utilisateur
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true }, // Champ prénom, de type chaîne de caractères, requis
  lastName: { type: String, required: true }, // Champ nom de famille, de type chaîne de caractères, requis
  email: { type: String, required: true }, // Champ email, de type chaîne de caractères, requis
  password: { type: String, required: true }, // Champ mot de passe, de type chaîne de caractères, requis
});

// Ajouter une méthode personnalisée au schéma pour générer un jeton d'authentification
userSchema.methods.generateAuthToken = function () {
  // Utiliser le module 'jsonwebtoken' pour signer un jeton avec l'ID de l'utilisateur et la clé secrète JWT
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d", // Le jeton expirera après 7 jours
  });
  return token; // Retourner le jeton généré
};

// Créer le modèle User en utilisant le schéma défini
const User = mongoose.model("user", userSchema);

// Définir une fonction 'validate' pour valider les données de l'utilisateur
const validate = (data) => {
  // Utiliser le module 'Joi' avec l'extension 'joi-password-complexity' pour valider les données
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"), // Chaine de caractères pour le prénom, requis
    lastName: Joi.string().required().label("Last Name"), // Chaine de caractères pour le nom de famille, requis
    email: Joi.string().email().required().label("Email"), // Chaine de caractères pour l'email, requis et doit être au format email
    password: passwordComplexity().required().label("Password"), // Règles de complexité pour le mot de passe, requis
  });

  // Valider les données en utilisant le schéma Joi et renvoyer le résultat
  return schema.validate(data);
};

// Exporter le modèle User et la fonction de validation
module.exports = { User, validate };
