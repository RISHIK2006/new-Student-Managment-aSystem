const adminRegister = require('../models/admin_register');

//admin register logic
const admin_register = async (req, res) => {
    try {
        const { adminname, schoolname, adminemail, adminpassword } = req.body;
        const userExists = await adminRegister.findOne({ adminemail });
        if (userExists) {
            // alert("Email Already exists");
            return res.status(400).json({ message: "Email alredy Registered" });
        }
        const userCreated = await adminRegister.create({ adminname, schoolname, adminemail, adminpassword });
        res.status(201).json({ msg: "Registration Successfull" });
        
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
};

//admin login logic
const admin_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const adminemail = email;
        const userExist = await adminRegister.findOne({ adminemail });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const user = await userExist.comparePassword(password);
        if (user) {
            const token = await userExist.generateToken();
            const response = {
                msg: "Login Successfull",
                token: token,
                userId: userExist._id.toString()
            }
            console.log(response)
            res.status(201).json(response);
        }
        else {
            res.status(401).json("Internal Server Error");
        }
    } catch (error) {
        res.status(500).json("Internal server error from catch statement" + error);
    }
};

//to get the information of the user logged in
const logged_in_user = async (req, res) => {
    try {
        const userData = req.user;
        console.log("The logged in user data is ",userData);
        return res.status(200).json({ msg: userData });
    } catch (error) {
        console.log(`Error from logged_in_user route ${error} `);
        
    }
    
}
module.exports = { admin_register, admin_login, logged_in_user };