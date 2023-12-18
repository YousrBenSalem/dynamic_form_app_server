// Middleware d'authentification avec JSON Web Token (JWT)

// Importer le module jsonwebtoken
const jwt = require("jsonwebtoken");

// Fonction middleware pour authentifier les utilisateurs
const authenticate = (req, res, next) => {
  // Obtenir le jeton du header de la requête
  const token = req.header("Authorization").replace("Bearer ", "");

  // Vérifier si le jeton est présent
  if (!token) {
    return res
      .status(401)
      .json({ message: "Non autorisé : aucun jeton fourni" });
  }

  try {
    // Vérifier le jeton
    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);

    // Ajouter les données de l'utilisateur décryptées à l'objet de requête (req)
    req.user = decoded.user;

    // Continuer avec le prochain middleware ou le gestionnaire de route
    next();
  } catch (error) {
    console.error("Erreur lors de la vérification du jeton :", error);
    return res.status(401).json({ message: "Non autorisé : jeton invalide" });
  }
};

// Exporter la fonction middleware pour être utilisée dans d'autres parties de l'application
module.exports = { authenticate };
