const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  type: String,
  name: String,
  distance: Number,
  duration: Number,
  weight: Number,
  sets: Number,
  reps: Number,
  duration: Number,  
  workoutplans: [
    {
      type: Schema.Types.ObjectId,
      ref: "WorkoutPlan"
    }
  ],
});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
