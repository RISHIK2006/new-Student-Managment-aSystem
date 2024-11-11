const subjectModel = require('../models/add-subject-model');
const classes = require('../models/create-class');

//Add Subject to database
const createSubject = async (req, res) => {
    try {
        const { subjects } = req.body;

        if (!subjects || !Array.isArray(subjects)) {
            return res.status(400).json({ message: "Invalid data format. Expected an array of subjects." });
        }
        const createdSubjects = [];
        for (const subjectData of subjects) {
            const { subject, code, session, selectedClassId } = subjectData;
            // Check if the code already exists
            const codeExist = await subjectModel.findOne({ code });
            if (codeExist) {
                return res.status(400).json({ message: `Code ${code} already used` });
            }
            // Check if the classId exists in the database
                const classExist = await classes.findById(selectedClassId);
                if (!classExist) {
                    return res.status(400).json({ message: `Class with ID ${selectedClassId} not found` });
                }
            // Create and save the new subject
            // const newSubject = await subjectModel.create({ subject, code, session,classes });
            // createdSubjects.push(newSubject);

            const newSubject = await subjectModel.create({
                subject,
                code,
                session,
                classes: selectedClassId // Associate the subject with the selected class
            });
            createdSubjects.push(newSubject);
        }

        return res.status(201).json({ message: "Subjects created successfully", data: createdSubjects });
    } catch (error) {
        console.error("Error creating subjects:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

//Get All the Subjects from the database
const getSubject = async (req, res) => {
    try {
        const response = await subjectModel.find().populate("classes", "classes");
        if (!response) {
            res.status(404).json({ msg: "No Subjects were found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Subject ${error}`);
    }
};

const getSubjectByClass = async (req, res) => {
    try {
        const { classId } = req.query;
        const classObj = await classes.find({ classes: classId });
        const subjects = await subjectModel.find({ classes: classObj[0]._id }).populate("classes", "classes");

        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ msg: "No subjects found for the specified class." });
        }

        res.status(200).json(subjects);
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteSubject = async (req, res) => {
    try {
        const id = req.params.id;
        await subjectModel.deleteOne({ _id: id });
        return res.status(200).json({ msg: "Subject Deleted" });
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { createSubject, getSubject, getSubjectByClass, deleteSubject };