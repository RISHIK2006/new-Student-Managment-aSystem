const express = require('express');
const router = express.Router();

const AddMarks = require("../controllers/add-marks-controller");

router.route("/storemarks").post(AddMarks.add_marks);
router.route("/dispmarks").get(AddMarks.getAllMarks);

module.exports = router;