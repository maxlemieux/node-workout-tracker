const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
    }
  ],
  /*
  toJson method here
      virtuals: true
  */
});

WorkoutSchema.methods.totalDuration = function totalDuration () {
  return 42;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
