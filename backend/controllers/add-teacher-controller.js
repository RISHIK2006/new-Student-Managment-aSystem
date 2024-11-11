const Teacher = require('../models/add-teacher-model'); // Import the updated teacher model
const UserClass = require('../models/create-class'); // Import the userClass model

// Add a new teacher and associate a class
const add_teacher = async (req, res) => {
    try {
        const { teachername, teacheremail, teacherpassword, teacherclass, teachersubject } = req.body;

        // Check if the teacher email is already registered
        const userExist = await Teacher.findOne({ teacheremail });
        if (userExist) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Check if the class is already assigned to another teacher
        const classAssigned = await Teacher.findOne({ teacherclass });
        if (classAssigned) {
            return res.status(400).json({ message: "Class is already assigned to another teacher" });
        }

        // Create the new teacher with an associated unique class
        const userCreated = await Teacher.create({
            teachername,
            teacheremail,
            teacherpassword,
            teacherclass,
            teachersubject
        });

        res.status(201).json({ message: "Teacher added successfully", teacher: userCreated });
    } catch (error) {
        res.status(500).json({ message: "Internal server error by catch", error: error.message });
    }
};

// Login Teacher logic
const teacher_login = async (req, res) => {
    try {
        const { teacheremail, teacherpassword } = req.body;

        if (!teacheremail || !teacherpassword) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the teacher by email
        const userExist = await Teacher.findOne({ teacheremail });
        
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if the password is correct
        const isValidPassword = await userExist.comparePassword(teacherpassword);
        if (isValidPassword) {
            // Generate JWT token
            const token = await userExist.generateToken();
            return res.status(201).json({
                message: "Login successful",
                token: token,
                userId: userExist._id.toString(),
                class: userExist.class  // Return associated class details if needed
            });
        } else {
            return res.status(401).json({ message: "Invalid password" });
        }
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getTeacher = async (req, res) => {
    try {
        const response = await Teacher.find();
        if (!response) {
            res.status(404).json({ msg: "No teacher found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Teacher ${error}`);
    }
};

// logged in teacher data
const logged_in_user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({ msg: userData });
    } catch (error) {
        console.log(`error from teacher route ${error}`);
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const id = req.params.id;
        await Teacher.deleteOne({ _id: id });
        return res.status(200).json({ msg: "Teacher Deleted" });
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = { add_teacher, teacher_login, getTeacher, logged_in_user, deleteTeacher };
