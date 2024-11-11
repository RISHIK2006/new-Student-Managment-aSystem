const jwt = require("jsonwebtoken");
const studentData = require("../models/add-student-model");

const studentMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ msg: "unauthorized Page" });
    }
    const jwtToken = token.replace("Bearer", "").trim();
    // console.log("token from student middleware", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, "JANMEJAYPANDYA");
        console.log(isVerified);
        const userData = await studentData.findOne({ stdrollnumber: isVerified.stdrollnumber });
        console.log(userData);
        req.user = userData;
        next();
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = studentMiddleware;

