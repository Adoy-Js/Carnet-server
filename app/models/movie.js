const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class Movie extends Model {}

Movie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Autre options du modeles
    sequelize, // On a besoin de donner l'instance de la connexion
    timestamps: false, // Pour ne pas avoir les champs createdAt et updatedAt
    tableName: "movies", // Pour imposer un nom de table, sinon il prend le model au pluriel par défaut
  }
);

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = Movie;
