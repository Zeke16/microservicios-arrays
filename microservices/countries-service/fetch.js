const fetch = require("node-fetch");
async function consumeAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  consumeAPI,
};
