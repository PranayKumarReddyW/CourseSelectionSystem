const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["Theory", "Lab"], required: true }, // Course type: Theory or Lab
    availableTeachers: [
      {
        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
          required: true,
        }, // Reference to the Teacher model
      },
    ],
    credits: { type: Number, required: true }, // Number of credits for the course
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Course", courseSchema);
