var db = require("../models");

module.exports = function(app) {
  app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.get("/api/workouts/range", function(req, res) {
    db.Workout.find({})
      .then((dbWorkoutRange) => {
        return res.json(dbWorkoutRange)
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.post("/api/workouts", function(req, res) {
    const workout = req.body;
    db.Workout.create({ workout }).then((result) => {
      return res.json(result)
    });
  });

  app.put("/api/workouts/:id", function(req, res) {  
    const exercise = req.body;
    console.log(`totalDuration: ${db.Workout.totalDuration}`);
    db.Workout.updateOne({ _id: req.params.id }, { $push: { exercises: exercise } })
      .then((result) => {
        return res.json(result)
      }
    )
  });
  // app.put("/api/workouts/:id", function(req, res) {  
  //   db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
  //     .then((result) => {
  //       return res.json(result)
  //     }
  //   )
  // });
};