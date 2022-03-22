const Movie = require("../models/Movie");

const movieController = {
  getBestsMovies: async (req, res, next) => {
    try {
      const results = await Movie.findBestsMovies();
      res.json(results);
    } catch (error) {
      throw new Error(error);
    }
  },

  getAll: async (req, res, next) => {
    try {
      const results = await Movie.findAll();
      return res.json({results:results, user:req.user});
    } catch (error) {
      throw new Error(error);
    }
  },
};

module.exports = movieController;
