const Teacher = require("../models/Teacher");

// Create a new teacher
exports.createTeacher = async (req, res) => {
  try {
    // Validate request body (you can use a library like Joi or express-validator for more robust validation)
    const { name, email, academicBackground } = req.body;
    if (!name || !email || !academicBackground) {
      return res.status(400).json({
        status: "error",
        message: "Name, email, and academic background are required.",
      });
    }

    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json({
      status: "success",
      message: "Teacher created successfully",
      data: { teacher },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Retrieve all teachers
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("coursesTaught") // Assuming coursesTaught references another model
      .sort({ createdAt: -1 }); // Sort by creation date, descending

    res.status(200).json({
      status: "success",
      message: "Teachers retrieved successfully",
      data: { teachers },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
