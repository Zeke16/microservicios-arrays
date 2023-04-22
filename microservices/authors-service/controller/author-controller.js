const data = require("../data/data-library");
const logger = (message) => console.log(`Authors Service: ${message}`);

const getAuthors = async (req, res) => {
  const response = {
    service: "authors",
    architecture: "microservices",
    data: data.dataLibrary.authors,
  };

  return res.send(response);
};

const getAuthorById = async (req, res) => {
  const author = data.dataLibrary.authors.filter((author) => {
    return req.params.id == author.id;
  });

  const response = {
    service: "authors",
    architecture: "microservices",
    data: author,
  };

  return res.send(response);
};

const getAuthorByName = async (req, res) => {
  const author = data.dataLibrary.authors.filter((author) => {
    return author.author.includes(req.params.name);
  });
  const response = {
    service: "authors",
    architecture: "microservices",
    data: author,
  };
  return res.send(response);
};

const getAuthorByCountry = async (req, res) => {
    const author = data.dataLibrary.authors.filter((author) => {
      return author.country.includes(req.params.country);
    });
    const response = {
      service: "authors",
      architecture: "microservices",
      data: author,
    };
    return res.send(response);
  };

module.exports = {
  getAuthors,
  getAuthorById,
  getAuthorByName,
  getAuthorByCountry
};
