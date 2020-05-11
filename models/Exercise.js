const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  author: String,
  title: String,
  workoutplans: [
    {
      type: Schema.Types.ObjectId,
      ref: "WorkoutPlan"
    }
  ]

});

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;
