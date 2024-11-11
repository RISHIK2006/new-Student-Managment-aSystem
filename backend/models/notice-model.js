const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    details: {
        type: String,
        required:true
    },
    date: {
        type: String,
        required:true
    },
});
const Notice = mongoose.model("Notice", noticeSchema, "Notice");

module.exports = { Notice };