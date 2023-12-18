// Importer le module mongoose pour la connexion à la base de données MongoDB
const mongoose = require("mongoose");

// Exporter la fonction de connexion à la base de données en tant que module
module.exports = () => {
  // Paramètres de connexion à la base de données
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    // Tenter de se connecter à la base de données en utilisant l'URL de connexion provenant des variables d'environnement
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to the database successfully");
  } catch (error) {
    // Afficher une erreur si la connexion échoue
    console.log(error);
    console.log("Could not connect to the database!");
  }
};
