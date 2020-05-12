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
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/exercise_db", MongoOpts);
/*
db.Library.create({ name: "Campus Library" })
  .then(dbLibrary => {
    console.log(dbLibrary);
  })
  .catch(({message}) => {
    console.log(message);
  });

app.post("/submit", ({body}, res) => {
  db.Book.create(body)
    .then(({_id}) => db.Library.findOneAndUpdate({}, { $push: { books: _id } }, { new: true }))
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
});
*/

app.get("/exercise", (req, res) => {
  db.Exercise.findOne({_id: req.params.id}, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.sendFile(path.join(__dirname + '/public/exercise.html'));
      // res.json(data);
    }
  })
})

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname + '/public/stats.html'));
})

/*
app.get("/library", (req, res) => {
  db.Library.find({})
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
});

app.get("/populated", (req, res) => {
  db.Library.find({})
    .populate("books")
    .then(dbLibrary => {
      res.json(dbLibrary);
    })
    .catch(err => {
      res.json(err);
    });
});
*/
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});