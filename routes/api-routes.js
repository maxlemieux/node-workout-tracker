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
    db.Workout.find({ day: { $gte: new Date(new Date() - millisecondsInAWeek) } }, 'name day exercises totalDuration dayOfWeek totalWeight')
      .sort([['day', -1]])
      .then((dbWorkoutRange) => {
        const rangeResponseArr = [
          {
            dayOfWeek: 'Monday',
            totalDuration: 0,
            totalWeight: 0,
          },
          {
            dayOfWeek: 'Tuesday',
            totalDuration: 0,
            totalWeight: 0,
          },
          {
            dayOfWeek: 'Wednesday',
            totalDuration: 0,
            totalWeight: 0,
          },
          {
            dayOfWeek: 'Thursday',
            totalDuration: 0,
            totalWeight: 0,
          },
          {
            dayOfWeek: 'Friday',
            totalDuration: 0,
            totalWeight: 0,
          },
          {
            dayOfWeek: 'Saturday',
            totalDuration: 0,
            totalWeight: 0,
          },
          {
            dayOfWeek: 'Sunday',
            totalDuration: 0,
            totalWeight: 0,
          },
        ];

        const dayWorkoutDuration = {
          Monday: 0,
          Tuesday: 0,
          Wednesday: 0,
          Thursday: 0,
          Friday: 0,
          Saturday: 0,
          Sunday: 0,
        };
        const dayOfWeekObj = {
          0: 'Monday',
          1: 'Tuesday',
          2: 'Wednesday',
          3: 'Thursday',
          4: 'Friday',
          5: 'Saturday',
          6: 'Sunday',
        };
        dbWorkoutRange.forEach((workout) => {
          const dayNumber = workout.day.getDay();
          const dayOfWeek = dayOfWeekObj[workout.day.getDay()];
          rangeResponseArr[dayNumber].totalDuration += workout.totalDuration;

          // console.log(`dayWorkoutDuration obj entry for ${dayOfWeekObj[dayNumber]}: ${dayWorkoutDuration[dayOfWeek]}`)
        });
        console.log(rangeResponseArr);
        // console.log(dbWorkoutRange);
        res.json(dbWorkoutRange);
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
