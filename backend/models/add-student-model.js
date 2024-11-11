const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

// Student Model
const studentSchema = new mongoose.Schema({
    stdname: {
        type: String,
        required: true,
    },
    stdrollnumber: {
        type: Number,
        required: true,
        unique: true,
    },
    stdpassword: {
        type: String,
        required: true,
    },
    studentclass: {
        type: String,
        required: true,
    },
});

//Secure the password with bcrypt
studentSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("stdpassword")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.stdpassword, saltRound);
        user.stdpassword = hash_password;
    } catch (error) {
        next(error);
    }
});

//compare password
studentSchema.methods.comparePassword = async function (stdpassword) {
    return await bcrypt.compare(stdpassword, this.stdpassword);
};
//JWT
studentSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                stdrollnumber: this.stdrollnumber,
            },
            "JANMEJAYPANDYA",
            {
                expiresIn: "20d",
            }
        );
    } catch (error) {
        console.error(error);
    }
}

module.exports =mongoose.model("Student", studentSchema,"Student Data");
