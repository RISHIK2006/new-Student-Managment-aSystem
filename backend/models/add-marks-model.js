const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
    studentname: {
        type: String,
        required:true
    },
    studentRollNumber: {
        type: String,
        required:true
    },
    chooseSubject: {
        type: String,
        required:true
    },
    stuMarks: {
        type: String,
        required:true
    }
});

module.exports = mongoose.model("marks", marksSchema, "Marks Data");
