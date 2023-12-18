// models/form.js

// Importer le module mongoose pour la gestion de la base de données MongoDB
const mongoose = require("mongoose");

// Définir le schéma mongoose pour les formulaires
const formSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Champ userId, de type ObjectId, requis
  formName: { type: String, required: true }, // Champ formName, de type chaîne de caractères, requis
  formFields: { type: Array, required: true }, // Champ formFields, de type tableau, requis
});

// Créer le modèle Form en utilisant le schéma défini
const Form = mongoose.model("Form", formSchema);

// Exporter le modèle Form pour être utilisé dans d'autres parties de l'application
module.exports = Form;
