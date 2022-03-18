const { Router } = require("express")
const router = Router();

const movieController = require("./controllers/movieController")
const userController = require("./controllers/userController")

//liste de tous films pour tester
router.get("/movie", movieController.getAll);

//10 films les mieux notés
router.get("/top", movieController.getBestsMovies);

//le user veut se logger
router.post("/signin", userController.login);

//ajout d'un user
router.post("/signup", userController.add);

//liste de ses films

//ajouter un film

//liste des films d'un autre user

module.exports = router;