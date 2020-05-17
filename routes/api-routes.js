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
    const millisecondsInAWeek = 7 * 24 * 60 * 60 * 1000;
    console.log(new Date(new Date() - millisecondsInAWeek));
    // db.Workout.find({ day: { $gte: new Date(new Date() - millisecondsInAWeek) } })
    db.Workout.find()
      .then((dbWorkoutRange) => {
        console.log(dbWorkoutRange);
        const data = [
          {
            dayOfWeek: 'Monday',
            dayNumber: 1,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Tuesday',
            dayNumber: 2,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Wednesday',
            dayNumber: 3,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Thursday',
            dayNumber: 4,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Friday',
            dayNumber: 5,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Saturday',
            dayNumber: 6,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
          {
            dayOfWeek: 'Sunday',
            dayNumber: 7,
            totalDuration: 0,
            totalWeight: 0,
            exerciseNames: [],
          },
        ];

        dbWorkoutRange.forEach((workout) => {
          console.log('workout')
          console.log(workout)
          // sunday is day 0, needs to be 7 
          let dayNumber = workout.day.getDay();
          if (dayNumber === 0) dayNumber = 7;
          console.log(`dayOfWeek ${workout.dayOfWeek} and dayNumber ${dayNumber}`);
          data[dayNumber - 1].totalDuration += workout.totalDuration;
          data[dayNumber - 1].totalWeight += workout.totalWeight;
          workout.exercises.forEach((exercise) => {
            data[dayNumber - 1].exerciseNames.push(exercise.name);
          });
        });

        /* Arrange with today at the end of the array */
        const toDay = new Date();
        if (data[6].dayNumber !== toDay.getDay()) {
          data.unshift(data.pop());
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
