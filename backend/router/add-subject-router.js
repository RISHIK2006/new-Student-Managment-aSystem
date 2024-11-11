const express = require('express');
const router = express.Router();
const Subject = require("../controllers/add-subject-controller");
// const { getAllSubjects, updateSubject, deleteSubject } = require("../controllers/add-subject-controller");

router.route("/subjectform").post(Subject.createSubject);

router.route("/showsubject").get(Subject.getSubject);

router.route("/getsubjectbyclass").get(Subject.getSubjectByClass);
router.route("/sub/delete/:id").delete(Subject.deleteSubject);

// Route to get all subjects

// router.get('/subject', getAllSubjects);

// Route to update a subject by ID

// router.put('/subject/:id', updateSubject);

// Route to delete a subject by ID

// router.delete('/subject/:id', deleteSubject);
module.exports = router;