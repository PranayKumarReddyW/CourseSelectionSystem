const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    }, // Reference to the Student model
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    }, // Reference to the Teacher model
    feedbackText: { type: String, required: true }, // Feedback text from the student
    rating: { type: Number, min: 1, max: 5 }, // Optional rating from 1 to 5
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
