const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const userSchema = new mongoose.Schema({
    adminname: {
        type: String,
        require:true
    },
    schoolname: {
        type: String,
        require: true,
        unique:true
    },
    adminemail: {
        type: String,
        require: true,
        unique:true
    },
    adminpassword: {
        type: String,
        require:true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

//secure password with bcrypt
userSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("adminpassword")) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.adminpassword, saltRound);
        user.adminpassword = hash_password;
    } catch (error) {
        next(error);
    }
});

//compare password
userSchema.methods.comparePassword = async function (adminpassword) {
    return bcrypt.compare(adminpassword, this.adminpassword);
}

//JWT
userSchema.methods.generateToken = async function () {
    try {
        console.log(process.env)
        return jwt.sign(
            {
                userId: this._id.toString(),
                adminemail: this.adminemail,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "20d",
            }
        );
    } catch (error) {
        console.error(error);
        
    }
}

const user = new mongoose.model("user", userSchema,"Admin Register");
module.exports = user;