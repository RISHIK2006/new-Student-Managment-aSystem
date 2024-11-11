const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const teacherSchema = new mongoose.Schema({
    teachername: {
        type: String,
        required: true
    },
    teacheremail: {
        type: String,
        required: true,
        unique: true
    },
    teacherpassword: {
        type: String,
        required: true
    },
    teacherclass: {
        type: String,
        required:true
    },
    teachersubject: {
        type: String,
        required:true
    }
});

// Secure password with bcrypt
teacherSchema.pre('save', async function (next) {
    if (this.isModified('teacherpassword')) {
        const salt = await bcrypt.genSalt(10);
        this.teacherpassword = await bcrypt.hash(this.teacherpassword, salt);
    }
    next();
});

// Compare password
teacherSchema.methods.comparePassword = async function (teacherpassword) {
    return await bcrypt.compare(teacherpassword, this.teacherpassword);
};

// JWT
teacherSchema.methods.generateToken = function () {
    try {
        return jwt.sign(
            {
                _id: this._id,
                teacheremail: this.teacheremail,
            },
            "JANMEJAYPANDYA",
            {
                expiresIn: "20d",
            }
        );
    } catch (error) {
        console.error(error);
        
    }
};

module.exports = mongoose.model("teacher", teacherSchema, "Teacher Data");
