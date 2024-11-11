const express = require('express');
const router = express.Router();
const AddAttendance = require("../controllers/add-attendance-controller");

router.route("/addattendance").post(AddAttendance.add_attendance);
router.route("/getpresentcount").get(AddAttendance.getPresentCount);


module.exports = router;
