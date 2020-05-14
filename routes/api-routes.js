const db = require('../models');

module.exports = (app) => {
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
      .then((results) => {
        const dbWorkout = results;
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get('/api/workouts/range', (req, res) => {
    db.Workout.find({})
      .then((dbWorkoutRange) => res.json(dbWorkoutRange))
      .catch((err) => {
        res.json(err);
      });
  });

  app.post('/api/workouts', (req, res) => {
    const workout = req.body;
    db.Workout.create({ workout }).then((result) => res.json(result))
      .catch((err) => {
        res.json(err);
      });
  });

  app.put('/api/workouts/:id', (req, res) => {
    const exercise = req.body;
    console.log(`totalDuration: ${db.Workout.totalDuration}`);
    db.Workout.updateOne({ _id: req.params.id }, { $push: { exercises: exercise } })
      .then((result) => res.json(result));
  });
};
