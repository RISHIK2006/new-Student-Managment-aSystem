const Attendance = require("../models/add-attendance");

const add_attendance = async (req, res) => {
 const { studentname, rollnumber, classname, stusubject, attendenceStatus, date } = req.body;
    try {
        // Check if an attendance record already exists for the same rollnumber and date
        const existingAttendance = await Attendance.findOne({ rollnumber, date });

        if (existingAttendance) {
            return res.status(400).json({
                success: false,
                message: `Attendance for roll number ${rollnumber} has already been recorded for ${date}.`
            });
        }

        // If no existing attendance is found, create a new record
        const newAttendance = new Attendance({
            studentname,
            rollnumber,
            classname,
            stusubject,
            attendenceStatus,
            date
        });

        // Save the attendance record
        await newAttendance.save();

        res.status(201).json({
            success: true,
            message: "Attendance added successfully.",
            data: newAttendance
        });
    } catch (error) {
        console.error("Error adding attendance:", error);
        res.status(500).json({
            success: false,
            message: "Failed to add attendance. Please try again later."
        });
    }
};

const getPresentCount = async (req, res) => {
     const { rollnumber, subject } = req.query;

    try {
        const presentCount = await Attendance.countDocuments({
            rollnumber,
            stusubject: subject,
            attendenceStatus: "Present"
        });

        res.status(200).json({ presentCount });
    } catch (error) {
        console.error("Error fetching present count:", error);
        res.status(500).json({ success: false, message: "Failed to retrieve present count." });
    }
};

module.exports = { add_attendance, getPresentCount };

