"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
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
      MovieId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Movie", // 'Movies' would also work
          key: "id",
        },
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "User", // 'Movies' would also work
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "user_movies",
      modelName: "User_movie",
    }
  );
  return User_movie;
};
