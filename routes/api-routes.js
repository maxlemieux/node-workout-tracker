// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
// console.log(`Workout required: ${db.Workout}`);

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the workouts
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // GET route for getting all of the workouts in a range
  app.get("/api/workouts/range", function(req, res) {
    db.Workout.find({}).then((result) => {
      return res.json(result)
    })
  });
  
  // POST route for saving a new workout
  app.post("/api/workouts", function(req, res) {
    const workout = req.body;
    db.Workout.create({ workout }).then((result) => {
      return res.json(result)
    })
  });

  // PUT route for updating workouts
  app.put("/api/workouts/:id", function(req, res) {
    const workout = req.body;
    console.log(workout)
    db.Workout.update({ workout }, {
      where: {
        _id: req.params.id
      }
    }
    ).then((result) => {
      return res.json(result)
    }
    )
  });


  // DELETE route for deleting workouts
  app.delete("/api/workouts/:id", function(req, res) {
    db.Workout.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    ).then((result) => {
      return res.json(result);
    })
  });
};