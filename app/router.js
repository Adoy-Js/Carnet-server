const { Router } = require("express");
const router = Router();

const movieController = require("./controllers/movieController");
const userController = require("./controllers/userController");

const auth = require("./middlewares/auth");

//ajout d'un user
router.post("/signup", userController.add);

//le user veut se logger
router.post("/signin", userController.login);

//le user veut se déconnecter
router.get("/signout", userController.logout);

//liste de mes films
router.get("/list", auth.authenticate, movieController.getMyMovies);

//ajouter un film
router.post("/add-movie", auth.authenticate, movieController.addMovie);

//supprimer un film
router.delete(
  "/delete-movie/:movieId",
  auth.authenticate,
  movieController.deleteMovie
);

//liste des films d'un autre user

//10 films les mieux notés
// router.get("/top", movieController.getBestsMovies);

module.exports = router;
