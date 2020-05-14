const mongoose = require('mongoose');

const { Schema } = mongoose;

const schemaOptions = {
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
};

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      exerciseType: String,
      name: String,
      weight: Number,
      sets: Number,
      reps: Number,
      duration: Number,
    },
  ],
}, schemaOptions);

WorkoutSchema.virtual('totalDuration').get(function () {
  let totalDuration = 0;
  for (let i=0; i<this.exercises.length; i++) {
    totalDuration += this.exercises[i].duration;
  }
  return totalDuration;
  // return this.exercises[0];
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;
