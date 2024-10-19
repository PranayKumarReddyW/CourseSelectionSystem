const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

router.post("/createTeacher", teacherController.createTeacher);
router.get("/getAllTeachers", teacherController.getAllTeachers);

module.exports = router;
