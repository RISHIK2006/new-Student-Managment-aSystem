const express = require('express');
const router = express.Router();
const createClass = require('../controllers/create-class-controller');

router.route("/createclass").post(createClass.create_class);
router.route("/showclass").get(createClass.getClass);
router.route("/class/delete/:id").delete(createClass.deleteClass);

module.exports = router;