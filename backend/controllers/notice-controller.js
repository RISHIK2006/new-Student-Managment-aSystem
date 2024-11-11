const { Notice } = require('../models/notice-model');

const addNotice = async (req,res) => {
    try {
        const { title, details, date } = req.body;
        const createNotice = await Notice.create({ title, details, date });
        await createNotice.save();
        return res.status(201).json({ message: "Notice added successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getNotice = async (req, res) => {
    try {
        const response = await Notice.find();
         if (!response) {
                res.status(404).json({ msg: "No services were found " });
            }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Notice ${error}`);
    }
};

//delete notice
const deleteNoticeById = async (req, res) => {
    try {
        const id = req.params.id;
        await Notice.deleteOne({ _id: id }); 
        return res.status(200).json({ msg: "Notice Deleted" });
        // next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = { addNotice, getNotice, deleteNoticeById };