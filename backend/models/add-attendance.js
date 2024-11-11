const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentname: {
        type: String,
        required:true
    },
    rollnumber: {
        type: String,
        required:true
    },
    classname: {
        type: String,
        required:true
    },
    stusubject: {
        type: String,
        required:true
    },
    attendenceStatus: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("attendance", attendanceSchema, "Attendance Data");