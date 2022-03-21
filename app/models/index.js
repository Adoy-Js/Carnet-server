const User = require("./User");
const Movie = require("./Movie");

User.belongsToMany(Movie, {
  through: "users_movies",
  foreignKey: "id_users",
  otherKey: "id_movies",
  as: "users",
});

Movie.belongsToMany(User, {
    through: "users_movies",
    foreignKey: "id_movies",
    otherKey: "id_users",
    as: "users",
  });

  module.exports = { User, Movie };