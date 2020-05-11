const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutPlanSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: Array,
});

const WorkoutPlan = mongoose.model("WorkoutPlan", WorkoutPlanSchema);

module.exports = WorkoutPlan;
