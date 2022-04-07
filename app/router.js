const { Router } = require("express");
const router = Router();

const movieController = require("./controllers/movieController");
const userController = require("./controllers/userController");

const auth = require("./middlewares/auth");

//ajout d'un user
router.post("/signup", userController.add);

//le user veut se logger
router.post("/signin", userController.login);

//on envoie le cookie
router.get("/auth", userController.auth);

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

//rechercher un utilisateur afin de voir sa liste
router.post("/search-user", auth.authenticate, userController.searchUser);

//voir sa liste
router.get("/list-user/:user", auth.authenticate, movieController.getUserList);

//liste des films d'un autre user

//10 films les mieux notés
// router.get("/top", movieController.getBestsMovies);

module.exports = router;
