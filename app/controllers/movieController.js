const { User, Movie, User_movie } = require("../../models");

const movieController = {
  // getBestsMovies: async (req, res, next) => {
  //   try {
  //     const results = await Movie.findBestsMovies();
  //     res.json(results);
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },

  addMovie: async (req, res, next) => {
    const { userId, name, date, score } = req.body;

    try {
      //on regarde si le film est deja dans la table movie
      const movie = await Movie.findOne({ where: { name } });

      if (!movie) {
        console.log("creation du film dans la base");
        const newMovie = await Movie.create({ name });
        const movieWatched = await User_movie.create({
          date,
          score,
          MovieId: newMovie.id,
          UserId: userId,
        });
        return res.json({
          movie: movieWatched,
          messgae: "Le film a bien été ajouté à votre liste",
        });
      } else {
        console.log("le film est deja en base");
        const movieWatched = await User_movie.create({
          date,
          score,
          MovieId: movie.id,
          UserId: userId,
        });
        return res.json({
          movie: movieWatched,
          messgae: "Le film a bien été ajouté à votre liste",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  },

  getMyMovies: async (req, res, next) => {
    const { userId } = req.user;
    const moviesUser = await User.findOne({
      where: { id: userId },
      include: {
        model: Movie,
      },
    });

    return res.json({
      moviesUser,
    });
  },

  deleteMovie: async (req, res, next) => {
    const { userId } = req.user;
    const { movieId } = req.params;
    try {
      await User_movie.destroy({ where: { MovieId: movieId, UserId: userId } });
      return res.json({ message: "film supprimé !" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  },

  getUserList: async (req, res, next) => {
    const { user } = req.body;

    try {
      const moviesUser = await User.findOne({
        where: { pseudo: user },
        include: {
          model: Movie,
        },
      });

      return res.json({
        moviesUser,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Something went wrong" });
    }
  },
};

module.exports = movieController;
