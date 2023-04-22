const express = require("express");
const index = require("../routes");
const app = express();
app.use("/api/v2/languages", index);
module.exports = app;