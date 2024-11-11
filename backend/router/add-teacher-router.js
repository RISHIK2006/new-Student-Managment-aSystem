const express = require('express');
const router = express.Router();
const AddTeacher = require("../controllers/add-teacher-controller");
const teacherMiddleware = require("../middlewares/teacher-middleware");

router.route("/addteacher").post(AddTeacher.add_teacher);
router.route("/LoginTeacher").post(AddTeacher.teacher_login);
router.route("/dispteacher").get(AddTeacher.getTeacher);
router.route("/authteacher").get(teacherMiddleware, AddTeacher.logged_in_user);
router.route("/prof/delete/:id").delete(AddTeacher.deleteTeacher);

module.exports = router;