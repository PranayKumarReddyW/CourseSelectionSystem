const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  reviewer: {
    type: String, // Can be a student's name or ID
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  coursesTaught: {
    type: [String],
    default: [],
  },
  feedback: {
    type: [String],
    default: [],
  },
  researchProjects: {
    type: [String],
    default: [],
  },
  patents: {
    type: [String],
    default: [],
  },
  academicBackground: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  ratings: [ratingSchema], // Include ratings as an array of rating objects
});

// Create the Teacher model
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
