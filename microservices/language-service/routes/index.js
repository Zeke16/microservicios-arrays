const express = require("express");
const router = express.Router();
const { getLanguages, getAuthorByLanguage } = require("../controllers/language-controller")


router.get("/", getLanguages);
router.get("/:language", getAuthorByLanguage)
// Exportamos el router
module.exports = router;
