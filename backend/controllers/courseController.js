const Course = require("../models/Course");
const Student = require("../models/Student"); // Ensure to import the Student model

// Create a new course
exports.createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({
      status: "success",
      message: "Course created successfully",
      data: { course },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("availableTeachers");
    res.status(200).json({
      status: "success",
      message: "Courses retrieved successfully",
      data: { courses },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Add selected courses for a student
exports.addSelectedCourses = async (req, res) => {
  const { selectedCourses, studentId } = req.body;

  // Validate input
  if (!selectedCourses || !Array.isArray(selectedCourses) || !studentId) {
    return res.status(400).json({ status: "error", message: "Invalid input." });
  }

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res
        .status(404)
        .json({ status: "error", message: "Student not found." });
    }

    // Count current theory and lab courses
    const theoryCount = student.selectedCourses.filter(
      (course) => course.type === "Theory"
    ).length;
    const labCount = student.selectedCourses.filter(
      (course) => course.type === "Lab"
    ).length;

    // Check selected courses for limits
    for (const course of selectedCourses) {
      if (course.type === "Theory" && theoryCount >= 4) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "You can't add more than 4 theory courses.",
          });
      }
      if (course.type === "Lab" && labCount >= 2) {
        return res
          .status(400)
          .json({
            status: "error",
            message: "You can't add more than 2 lab courses.",
          });
      }
    }

    // Update the student's selected courses
    student.selectedCourses.push(
      ...selectedCourses.map(({ courseId, teacherId, type }) => ({
        courseId,
        teacherId,
        type,
      }))
    );

    // Save the updated student record
    await student.save();

    res.status(200).json({
      status: "success",
      message: "Courses added successfully!",
      data: { student },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Server error. Please try again later.",
    });
  }
};
