const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    classes: {
        type: String,
        required: true,
        unique:true
    }
});

const userClass = new mongoose.model("userClass", userSchema,"Class");
module.exports = userClass;