const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    selectedCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          required: true,
        },
        type: { type: String, enum: ["Theory", "Lab"], required: true }, // Type of course (Theory or Lab)
      },
    ],
    feedback: [
      {
        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          required: true,
        },
        rating: { type: Number, min: 1, max: 5, required: true },
        comments: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", studentSchema);
