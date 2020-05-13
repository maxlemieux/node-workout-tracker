const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

const path = require('path');

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
require("./routes/api-routes.js")(app);

const MongoOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercisedb", MongoOpts);

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/exercise.html'));
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/stats.html'));
})

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});