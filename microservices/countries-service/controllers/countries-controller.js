const data = require("../data/data-library");
const { consumeAPI } = require("../fetch");
const logger = (message) => console.log(`Countries Service: ${message}`);

const getCountries = async (req, res) => {
  const response = {
    service: "countries",
    architecture: "microservices",
    length: data.dataLibrary.countries.length,
    data: data.dataLibrary.countries,
  };
  logger("Get countries data");
  return res.send(response);
};

const getCountriesByLanguage = async (req, res) => {
  let countries = [];
  for (let country in data.dataLibrary.countries) {
    let actualCountry = data.dataLibrary.countries[country];
    if (actualCountry.languages.includes(req.params.language)) {
      countries.push(actualCountry.name);
    }
  }
  const response = {
    service: "countries",
    architecture: "microservices",
    length: countries.length,
    data: countries,
  };
  logger("Get countries data");
  return res.send(response);
};

/**Listar el nombre del país al que pertenece.
Los nombres de los autores nacidos en ese país.
y listar los libros distribuidos en ese país */
const getCountriesAuthorsBooksByCapital = async (req, res) => {
  let country;
  for (let code in data.dataLibrary.countries) {
    if (data.dataLibrary.countries[code].capital == req.params.capital) {
      country = data.dataLibrary.countries[code].name;
      break;
    }
  }
  if (country == undefined) {
    return res.status(400).json({
      error: "Capital " + req.params.capital + " no existe en el registro.",
    });
  }
  let endpointAuthor = "http://authors:3000/api/v2/authors/country/" + country;
  let apiAuthors = await consumeAPI(endpointAuthor);

  let endpointBooks = "http://books:4000/api/v2/books/country/country?country=" + country;
  let apiBooks = await consumeAPI(endpointBooks);

  const response = {
    service: "country, authors and books by capital name",
    architecture: "microservices",
    country: country,
    authors: {
      length: Object.keys(apiAuthors.data).length,
      authors: apiAuthors.data,
    },
    books: {
      length: Object.keys(apiBooks.data).length,
      books: apiBooks.data,
    },
  };
  logger("Get book data by author name");
  res.status(200).send(response);
};

module.exports = {
  getCountries,
  getCountriesByLanguage,
  getCountriesAuthorsBooksByCapital,
};
