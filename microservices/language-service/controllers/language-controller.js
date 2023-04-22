const fs = require("fs");
const { consumeAPI } = require("../helpers/fetch");
const logger = (message) => console.log(`Language Service: ${message}`);

const getLanguages = async (req, res) => {
  fs.readFile("data/language-codes.csv", (error, data) => {
    if (error) {
      throw error;
    }

    const contenido = data.toString();
    //separar todo en lineas independientes
    const lineas = contenido.split(/\r?\n/);
    
    //array donde se guardaran los objetos
    let lenguajes = {};
    for (let linea of lineas) {
      let lenguaje = linea.replace('"', "").replace(" ", "").split(",");
      if (lenguaje[0] == undefined || lenguaje[1] == undefined) {
        continue;
      }
      let key = lenguaje[0];
      let value = lenguaje[1].split(";");
      lenguajes[key] = value;
    }

    const response = {
      service: "countries",
      architecture: "microservices",
      length: Object.keys(lenguajes).length,
      data: lenguajes,
    };
    logger("Get language data");
    return res.send(response);
  });
};

const getAuthorByLanguage = async (req, res) => {
  fs.readFile("data/language-codes.csv", async (error, data) => {
    if (error) {
      throw error;
    }
    const contenido = data.toString();
    //separar todo en lineas independientes
    const lineas = contenido.split(/\r?\n/);

    //objeto donde se guardaran la data de lenguajes
    let lenguajes = {};
    for (let linea of lineas) {
      //eliminando ", espacios en blanco y separando columnas
      let lenguaje = linea.replace('"', "").replace(" ", "").split(",");
      if (lenguaje[0] == undefined || lenguaje[1] == undefined) {
        continue;
      }
      //Primer columna, silabas
      let key = lenguaje[0];
      //Segunda columna, palabras
      let value = lenguaje[1].split(";");
      //Busqueda de valor en columna de palabras
      let indexValue = lenguaje[1].indexOf(req.params.language);

      if (indexValue != -1 || key == req.params.language) {
        lenguajes[key] = value;
      }
    }
    //objeto donde se guardaran los paises que poseen x lenguaje
    let countries = {};
    for (let lenguaje in lenguajes) {
      let endpointCountries =
        "http://countries:5000/api/v2/countries/language/" + lenguaje;
      let apiCountries = await consumeAPI(endpointCountries);
      countries.data = apiCountries.data;
    }

    //objeto donde se guardaran autores que pertenecen a x pais
    let authors = {};
    let books = {};
    for (let country of countries.data) {
      let endpointAuthor =
        "http://authors:3000/api/v2/authors/country/" + country;
      let apiAuthors = await consumeAPI(endpointAuthor);
      if (apiAuthors.data.length > 0) {
        authors[country] = apiAuthors.data;
      }

      let endpointBooks =
        "http://books:4000/api/v2/books/country/country?country=" + country;
      let apiBooks = await consumeAPI(endpointBooks);

      if (apiBooks.data.length > 0) {
        books[country] = apiBooks.data;
      }
    }

    const response = {
      service: "Get authors, countries and books by language",
      architecture: "microservices",
      languageLength: Object.keys(lenguajes).length,
      language: lenguajes,
      countriesLength: countries.data.length,
      countries: countries,
      authorsLength: authors.length,
      authors: authors,
      booksLength: books.length,
      books: books,
    };
    logger("Get language data");
    return res.send(response);
  });
};

module.exports = {
  getLanguages,
  getAuthorByLanguage,
};
