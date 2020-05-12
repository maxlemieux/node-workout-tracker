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

  // PUT route for updating posts
  app.put("/api/workouts", function(req, res) {
    // Add code here to update a post using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
    const post = req.body;
    db.Workout.update({ post }, {
      where: {
        id: post.id
      }
    }
    ).then((result) => {
      return res.json(result)
    }
    )
  });

};