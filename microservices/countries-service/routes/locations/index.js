const express = require("express");
const router = express.Router();
const { getCountries, getCountriesByLanguage, getCountriesAuthorsBooksByCapital } = require("../../controllers/countries-controller")


router.get("/", getCountries);
router.get("/:capital", getCountriesAuthorsBooksByCapital);
router.get("/language/:language", getCountriesByLanguage);
// Exportamos el router
module.exports = router;
