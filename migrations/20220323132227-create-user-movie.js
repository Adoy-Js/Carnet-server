"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("user_movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
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
          model: "movies", // 'Movies' would also work
          key: "id",
        },
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "users", // 'Movies' would also work
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("user_movies");
  },
};
