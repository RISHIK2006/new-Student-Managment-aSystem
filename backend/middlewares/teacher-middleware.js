const jwt = require("jsonwebtoken");
// const teacherData = require("../models/add-teacher-model");

const teacherMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    // console.log("teacher token is ", token);
    if (!token) {
        return res.status(401).json({ msg: "unauthorized Page" });
    }
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from teacher middleware", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, "JANMEJAYPANDYA");
        console.log(isVerified);
        next();
    } catch (error) {
        return res.status(401).json({ msg: `unauthorized Page error from catch ${error}`  });
    }
};
module.exports = teacherMiddleware;
