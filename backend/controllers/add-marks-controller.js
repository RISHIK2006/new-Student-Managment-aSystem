const Marks = require("../models/add-marks-model");

const add_marks = async (req, res) => {
    try {
        const { studentname, studentRollNumber, chooseSubject, stuMarks } = req.body;

        // Check if marks already exist for the same student and subject
        const existingMarks = await Marks.findOne({
            studentname,
            studentRollNumber,
            chooseSubject
        });

        if (existingMarks) {
            return res.status(400).json({
                message: "Marks for this student and subject have already been added."
            });
        }

        // Create a new marks document
        const newMarks = new Marks({
            studentname,
            studentRollNumber,
            chooseSubject,
            stuMarks
        });

        // Save the new marks to the database
        await newMarks.save();

        res.status(201).json({
            message: "Marks added successfully",
            data: newMarks
        });
    } catch (error) {
        console.error("Error adding marks:", error);
        res.status(500).json({
            message: "An error occurred while adding marks",
            error: error.message
        });
    }
};

const getAllMarks = async (req, res) => {
    try {
        const marks = await Marks.find();
        console.log("Marks", marks);
        res.status(200).json(marks);
    } catch (error) {
        console.error("Error fetching marks", error);
        res.status(500).json({ message: "Error fetching marks" });
    }
};

module.exports = { add_marks, getAllMarks };