const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class User_movie extends Model {}

User_movie.init(
  {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    // Autre options du modeles
    sequelize, // On a besoin de donner l'instance de la connexion
    timestamps: false, // Pour ne pas avoir les champs createdAt et updatedAt
    tableName: "users_movies", // Pour imposer un nom de table, sinon il prend le model au pluriel par défaut
  }
);

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = User_movie;
