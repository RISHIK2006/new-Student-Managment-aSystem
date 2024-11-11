const express = require('express');
const router = express.Router();
const createStudent = require("../controllers/add-student-controller");
const studentMiddleware = require("../middlewares/student-middleware");

// Route to add a new student
router.post("/addstudent", createStudent.addStudent);

// Router for student login
router.post("/LoginStudent", createStudent.student_login);

// Route to get all classes
router.get("/getClasses", createStudent.getClasses);

// Route to get all students
router.get("/dispstudent", createStudent.getStudent);

// Route to get the logged-in student details
// router.get("/authstudent",studentMiddleware, createStudent.logged_in_user);
router.route("/authstudent").get(studentMiddleware, createStudent.logged_in_user);
router.route("/countstudent").get(createStudent.countStudent);

module.exports = router;
