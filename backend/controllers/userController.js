const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); // Import bcrypt

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "error",
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Handle role-specific logic
    if (role === "student") {
      const student = new Student({
        name,
        email,
        selectedCourses: [],
        feedback: [],
      });
      await student.save();
    } else if (role === "teacher") {
      const teacher = new Teacher({
        name,
        email,
        coursesTaught: [],
        feedback: [],
        researchProjects: [],
        patents: [],
        academicBackground: "",
      });
      await teacher.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { user, token }, // Include token in response
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h", // Token expires in 1 hour
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { user, token }, // Include token in response
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
