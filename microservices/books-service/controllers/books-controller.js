const { consumeAPI } = require("../fetch");
const data = require("../data/data-library"); // importa los datos de data-library
const logger = (message) => console.log(`Author Services: ${message}`);

const getBooks = async (req, res) => {
  const response = {
    service: "books",
    architecture: "microservices",
    length: data.dataLibrary.books.length,
    data: data.dataLibrary.books,
  };
  logger("Get book data");
  return res.status(200).send(response);
};

const getBooksByTitle = async (req, res) => {
  const titles = data.dataLibrary.books.filter((title) => {
    return title.title.includes(req.params.title);
  });
  const response = {
    service: "books by title",
    architecture: "microservices",
    length: titles.length,
    data: titles,
  };
  logger("Get book data by title");
  return res.status(200).send(response);
};

const getBooksById = async (req, res) => {
  const booksById = data.dataLibrary.books.filter((books) => {
    return books.id == req.params.id;
  });
  const response = {
    service: "books by id",
    architecture: "microservices",
    length: booksById.length,
    data: booksById,
  };
  logger("Get book data by id");
  return res.status(200).send(response);
};

const getBooksByAuthorName = async (req, res) => {
  let endpoint = "http://authors:3000/api/v2/authors/author/" + req.params.name;
  let apiAuthors = await consumeAPI(endpoint);

  const booksByAuthorName = data.dataLibrary.books.filter((book) => {
    return book.authorid == apiAuthors.data[0].id;
  });

  const response = {
    service: "books by author name",
    architecture: "microservices",
    length: booksByAuthorName.length,
    data: booksByAuthorName,
  };
  logger("Get book data by author name");
  res.status(200).send(response);
};

const getBooksByAuthorId = async (req, res) => {
  let endpoint = "http://authors:3000/api/v2/authors/" + req.params.id;
  let apiAuthors = await consumeAPI(endpoint);

  const booksByAuthorId = data.dataLibrary.books.filter((book) => {
    return book.authorid == apiAuthors.data[0].id;
  });

  const response = {
    service: "books by author id",
    architecture: "microservices",
    length: booksByAuthorId.length,
    data: booksByAuthorId,
  };
  logger("Get book data by author id");
  res.status(200).send(response);
};

const getBooksByRange = async (req, res) => {
  const init = 1900;
  const end = 1930;

  const booksPerRange = data.dataLibrary.books
    .filter((books) => {
      return books.year >= init && books.year <= end;
    })
    .sort((a, b) => a.year - b.year);
  const response = {
    service: "books per range of dates",
    architecture: "microservices",
    length: booksPerRange.length,
    data: booksPerRange,
  };
  logger("Get book data by range of dates");
  return res.status(200).send(response);
};

const getBooksDateGreaterEqualThan1900 = async (req, res) => {
  const booksDateGreaterEqualThan1900 = data.dataLibrary.books
    .filter((books) => {
      return books.year >= req.query.mayor;
    })
    .sort((a, b) => a.year - b.year);
  const response = {
    service: "books with date greather or equals than 1900",
    architecture: "microservices",
    length: booksDateGreaterEqualThan1900.length,
    data: booksDateGreaterEqualThan1900,
  };
  logger("Get book data with date greather or equals than 1900");
  return res.send(response);
};

const getBooksDateUnderEqual1900 = async (req, res) => {
  const booksPerYear = data.dataLibrary.books
    .filter((books) => {
      return books.year <= req.query.menor;
    })
    .sort((a, b) => a.year - b.year);
  const response = {
    service: "books with date under or equals 1900",
    architecture: "microservices",
    length: booksPerYear.length,
    data: booksPerYear,
  };
  logger("Get book data with date under or equals than 1900");
  return res.send(response);
};

const getBooksDateEquals1900 = async (req, res) => {
  const booksPerYear = data.dataLibrary.books
    .filter((books) => {
      return books.year == req.query.igual;
    })
    .sort((a, b) => a.year - b.year);
  const response = {
    service: "books with date equals " + req.query.igual,
    architecture: "microservices",
    length: booksPerYear.length,
    data: booksPerYear,
  };
  logger("Get book data with date equals " + req.query.igual);
  return res.send(response);
};

const getBooksByDistributedCountries = async (req, res) => {
  const booksByDistributedCountries = data.dataLibrary.books
    .filter((books) => {
      return books.distributedCountries.includes(req.query.country);
    })
    .sort((a, b) => a.year - b.year);
  const response = {
    service: "books by distributed countries",
    architecture: "microservices",
    length: booksByDistributedCountries.length,
    data: booksByDistributedCountries,
  };
  logger("Get book data by distributed countries");
  return res.send(response);
};
module.exports = {
  getBooks,
  getBooksByTitle,
  getBooksById,
  getBooksByAuthorName,
  getBooksByAuthorId,
  getBooksByRange,
  getBooksDateGreaterEqualThan1900,
  getBooksDateUnderEqual1900,
  getBooksDateEquals1900,
  getBooksByDistributedCountries,
};
