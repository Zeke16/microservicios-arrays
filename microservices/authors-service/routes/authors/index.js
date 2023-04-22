const express = require("express");
const router = express.Router();
const { getAuthors, getAuthorById, getAuthorByName, getAuthorByCountry} = require("../../controller/author-controller")

router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.get("/author/:name", getAuthorByName);
router.get("/country/:country", getAuthorByCountry);

module.exports = router;