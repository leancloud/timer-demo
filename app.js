const express = require("express");
const AV = require("leanengine");
const path = require("path");
require("./cloud");
const app = express();
app.use(AV.express());
app.enable("trust proxy");
app.use(AV.Cloud.HttpsRedirect());
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
module.exports = app;
