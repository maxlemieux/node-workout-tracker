// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
// console.log(`WorkoutPlan required: ${db.WorkoutPlan}`);

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the workouts
  app.get("/api/workouts", (req, res) => {
    db.WorkoutPlan.find({})
      .then(dbWorkoutPlan => {
        res.json(dbWorkoutPlan);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // GET route for getting all of the exercises
  app.get("/api/exercises", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });


  // GET route for getting all of the workouts in a range
  app.get("/api/workouts/range", function(req, res) {
    db.WorkoutPlan.find({}).then((result) => {
      return res.json(result)
    })
  });
  
  // POST route for saving a new workout
  app.post("/api/workouts", function(req, res) {
    const workout = req.body;
    db.WorkoutPlan.create({ workout }).then((result) => {
      return res.json(result)
    })
  });

  // POST route for saving a new exercise
  app.post("/api/exercises", function(req, res) {
    const exercise = req.body;
    db.Exercise.create({ exercise }).then((result) => {
      return res.json(result)
    })
  });

  // PUT route for updating workouts
  app.put("/api/workouts/:id", function(req, res) {
    const workout = req.body;
    db.WorkoutPlan.update({ workout }, {
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
    db.WorkoutPlan.destroy(
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