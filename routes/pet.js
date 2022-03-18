const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsController");
const petsValidator = require("../validations/petValidator");
const jwtToken = require("../validations/jwtValidator");

router.get("/pet", jwtToken.validateToken, petsValidator.id, petsController.getPet);
router.get("/pets", jwtToken.validateToken, petsController.getPets);
router.post("/pet", jwtToken.validateToken, petsValidator.add, petsController.postPet);
router.put("/pet", jwtToken.validateToken, petsValidator.id, petsController.putPet);
router.delete("/pet", jwtToken.validateToken, petsValidator.id, petsController.deletePet);

module.exports = router;
