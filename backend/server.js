const express = require("express");
const connectDB = require("./config/db"); // Import the database connection
const userRoutes = require("./routes/userRoutes");
const studentRoutes = require("./routes/studentRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const courseRoutes = require("./routes/courseRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const cors = require("cors");
const app = express();
app.use(express.json());

app.use(cors());
// Connect to MongoDB
connectDB(); // Call the connection function

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
