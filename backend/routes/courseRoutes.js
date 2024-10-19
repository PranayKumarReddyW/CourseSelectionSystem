const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/createCourse", courseController.createCourse);
router.get("/getAllCourses", courseController.getAllCourses);
router.post("/addSelectedCourses", courseController.addSelectedCourses);
module.exports = router;
