const Feedback = require("../models/Feedback");

exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({
      status: "success",
      message: "Feedback submitted successfully",
      data: { feedback },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate("courseId studentId");
    res.status(200).json({
      status: "success",
      message: "Feedback retrieved successfully",
      data: { feedbacks },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

exports.getFeedbackByTeacherId = async (req, res) => {
  const { teacherId } = req.params; // Extract teacherId from request parameters

  try {
    // Find feedbacks where teacherId matches the given teacherId
    const feedbacks = await Feedback.find({ teacherId })
      .populate("studentId", "name email") // Populate student details (optional)
      .exec();

    if (!feedbacks.length) {
      return res.status(404).json({
        status: "error",
        message: "No feedback found for this teacher.",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Feedback retrieved successfully",
      data: { feedbacks },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
