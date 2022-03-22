const User = require("./User");
const Movie = require("./Movie");

User.belongsToMany(Movie, {
  through: "users_movies",
  foreignKey: "id",
  otherKey: "id",
  as: "users",
});

Movie.belongsToMany(User, {
    through: "users_movies",
    foreignKey: "id",
    otherKey: "id",
    as: "users",
  });

  module.exports = { User, Movie };