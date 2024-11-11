const createClass = require('../models/create-class');

//create class logic
const create_class = async (req, res) => {
    try {
        const { classes } = req.body;
        const classExist = await createClass.findOne({ classes });
        if (classExist) {
            return res.status(400).json({ message: "Class already Exits" });
        }
        const classCreated = await createClass.create({ classes });
        res.status(201).json({ msg: "Class Created Successfully", classCreated });
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
};

//To reterive all the class 
const getClass = async (req, res) => {
    try {
        const response = await createClass.find();
        if (!response) {
            res.status(404).json({ msg: "No Classes were found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Class ${error}`);
    }
};

const deleteClass = async (req, res) => {
    try {
         const id = req.params.id;
        await createClass.deleteOne({ _id: id });
        return res.status(200).json({ msg: "Class Deleted" });
    } catch (error) {
        console.log(error);
        
    }
};
module.exports = { create_class, getClass,deleteClass };