const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    session: {
        type: Number,
        required: true
    },
    classes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userClass',
        required: true,
    }
});

module.exports = mongoose.model("subject", subjectSchema, "Subject");