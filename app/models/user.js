const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Autre options du modeles
    sequelize, // On a besoin de donner l'instance de la connexion
    timestamps: false, // Pour ne pas avoir les champs createdAt et updatedAt
    tableName: "users", // Pour imposer un nom de table, sinon il prend le model au pluriel par défaut
  }
);

// Puis on export pour pouvoir le require là ou on va l'instancier
module.exports = User;
