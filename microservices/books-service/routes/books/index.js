const express = require("express");
const router = express.Router();

const {
  getBooks,
  getBooksByTitle,
  getBooksById,
  getBooksByAuthorName,
  getBooksByAuthorId,
  getBooksByRange,
  getBooksDateGreaterEqualThan1900,
  getBooksDateUnderEqual1900,
  getBooksDateEquals1900,
  getBooksByDistributedCountries
} = require("../../controllers/books-controller");

router.get("/", getBooks);
router.get("/title/:title", getBooksByTitle);
router.get("/id/:id", getBooksById);
router.get("/author/name/:name", getBooksByAuthorName);
router.get("/author/id/:id", getBooksByAuthorId);
router.get("/rango", getBooksByRange);
router.get("/rango/mayor", getBooksDateGreaterEqualThan1900);
router.get("/rango/menor", getBooksDateUnderEqual1900);
router.get("/rango/igual", getBooksDateEquals1900);
router.get("/country/country", getBooksByDistributedCountries);

module.exports = router; // exporta el enrutador de Express para su uso en otras partes de la aplicación

/*
Este código es un ejemplo de cómo crear una API de servicios utilizando Express y un enrutador. El enrutador define dos rutas: una para obtener todos los libros y otra para obtener libros por título. También utiliza una función simple de registro para registrar mensajes en los registros.
*/
