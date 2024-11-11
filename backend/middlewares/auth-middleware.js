const jwt = require("jsonwebtoken");
const adminRegister = require("../models/admin_register");
// const studentData = require("../models/add-student-model");


const authMiddleWare = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "unauthorized Page" });
    }
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from authmiddleware", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, "JANMEJAYPANDYA");
        console.log(isVerified);
        const userData = await adminRegister.findOne({ adminemail: isVerified.adminemail });
        console.log(userData);
        req.user = userData;
        next();
    } catch (error) {
        console.log(error);
        
    }
    
};

module.exports = authMiddleWare;
