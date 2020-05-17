const db = require('../models');

module.exports = (app) => {
  app.get('/api/workouts', (req, res) => {
    db.Workout.find({})
      .then((results) => {
        res.json(results);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  app.get('/api/workouts/range', (req, res) => {
    const millisecondsInAWeek = 7 * 60 * 60 * 24 * 1000;
    const todayOfWeek = new Date().getDay();
    db.Workout.find({ day: { $gte: new Date(new Date() - millisecondsInAWeek) } }, 'name day exercises totalDuration dayOfWeek totalWeight')
      .then((dbWorkoutRange) => {
        const data = [
          {
            dayOfWeek: 'Monday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Tuesday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Wednesday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Thursday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Friday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Saturday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Sunday',
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
        ];

        dbWorkoutRange.forEach((workout) => {
          const dayNumber = workout.day.getDay();
          data[dayNumber-1].dayNumber = dayNumber;
          data[dayNumber-1].totalDuration += workout.totalDuration;
          data[dayNumber-1].totalWeight += workout.totalWeight;
          workout.exercises.forEach((exercise) => {
            data[dayNumber-1].exerciseNames.push(exercise.name);
          });
        });

        let arrayRotation = true;
        while (arrayRotation === true) {
          if (data[6].dayNumber === Date().getDay()) {
            arrayRotation = false;
          } else {
            data.unshift(data.pop());
          }
        }

        res.json(data);
      })
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
    db.Workout.updateOne({ _id: req.params.id }, { $push: { exercises: exercise } })
      .then((result) => res.json(result));
  });
};
