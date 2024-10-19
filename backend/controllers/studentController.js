const Student = require("../models/Student");
const Course = require("../models/Course"); // Assuming you have a Course model

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      status: "success",
      message: "Student created successfully",
      data: { student },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get all students with their enrolled courses
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.status(200).json({
      status: "success",
      message: "Students retrieved successfully",
      data: { students },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Enroll a student in a course
exports.enrollStudentInCourse = async (req, res) => {
  const { studentId, courseId } = req.body; // Assuming you send these IDs in the request body

  try {
    // Find the student by ID
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        status: "error",
        message: "Student not found",
      });
    }

    // Find the course by ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        status: "error",
        message: "Course not found",
      });
    }

    // Check if the student is already enrolled in the course
    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({
        status: "error",
        message: "Student is already enrolled in this course",
      });
    }

    // Add the course ID to the student's enrolledCourses array
    student.enrolledCourses.push(courseId);
    await student.save();

    res.status(200).json({
      status: "success",
      message: "Student enrolled in course successfully",
      data: { student },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
