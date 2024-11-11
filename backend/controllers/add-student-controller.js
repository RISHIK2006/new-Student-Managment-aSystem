const Student   = require("../models/add-student-model");

//Add student logic
const addStudent = async (req, res) => {
    try {
        const { stdname, stdrollnumber, stdpassword, studentclass } = req.body;

        // Check if roll number already exists
        const studentExists = await Student.findOne({ stdrollnumber });
        if (studentExists) {
            return res.status(400).json({ message: "Student with this roll number already exists" });
        }

        // Create new student
        const newStudent = await Student.create({
            stdname,
            stdrollnumber,
            stdpassword,
            studentclass,
        });
        await newStudent.save();
        return res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        console.error("Error adding student:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Fetch classes from the database
const getClasses = async (req, res) => {
     try {
        console.log("Fetching classes from DB");
        const classes = await Class.find();
        console.log("Classes fetched:", classes);
        res.status(200).json(classes);
    } catch (error) {
        console.error("Error fetching classes:", error);
        res.status(500).json({ message: "Error fetching classes" });
    }
};

// student login logic
const student_login = async (req, res) => {
    try {
        const { stdrollnumber, stdpassword } = req.body;
        // Check if the student exists and validate password
        if (!stdrollnumber || !stdpassword) {
            return res.status(400).json({ message: "Roll Number and password are required" });
        }
        const userExist = await Student.findOne({ stdrollnumber });
        console.log("User Exist:", userExist); // Check if user exists and methods are available
        console.log("Has comparePassword method:", typeof userExist.comparePassword === "function");
        
        if (!userExist) {
            return res.status(400).json({ msg: "Invalid Credentials " });
        }
        const isValidPassword = await userExist.comparePassword(stdpassword);
        console.log("password ",isValidPassword);
        
        if (isValidPassword) {
            const token = await userExist.generateToken();
            return res.status(201).json({
                message: "Student Login Successfull",
                token: token,
                userId: userExist._id.toString(),
            });
        }else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Error During Login",error);
        return res.status(500).json({ msg: "Internal server error ", error: error.message });
    }
};

//Display all the student
const getStudent = async (req, res) => {
    try {
        const response = await Student.find();
        if (!response) {
            res.status(404).json({ msg: "No student found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Student ${error}`);
    }
};

//loggedIn student data
const logged_in_user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({ msg: userData });
        
    } catch (error) {
        console.log(`error from student route ${error}`);
        
    }
}

const countStudent = async (req, res) => {
    try {
        // Count all student documents in the collection
        const countStd = await Student.countDocuments();
        console.log("Total students count:", countStd);
        res.status(200).json({ count: countStd });
    } catch (error) {
        console.log("Error counting students:", error);
        res.status(500).json({ message: "Error counting students" });
    }
};


module.exports = { addStudent, getClasses, student_login, getStudent, logged_in_user, countStudent };