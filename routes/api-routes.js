// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/workouts", function(req, res) {
    // Add sequelize code to find all posts, and return them to the user with res.json
    db.WorkoutPlan.findAll().then((result) => {
      return res.json(result)
    })
  });

  // PUT route for updating workouts
  app.put("/api/workouts/?id=:id", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    const workout = req.body;
    db.WorkoutPlan.update({ workout }, {
      where: {
        id: req.params.id
      }
    }
    ).then((result) => {
      return res.json(result)
    }
    )
  });

  // POST route for saving a new workouts
  app.post("/api/workouts", function(req, res) {
    const workout = req.body;
    db.WorkoutPlan.create({ workout }).then((result) => {
      return res.json(result)
    })
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