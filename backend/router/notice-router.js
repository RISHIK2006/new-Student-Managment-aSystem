const express = require('express');
const router = express.Router();
const AddNotice = require("../controllers/notice-controller");
// const authMiddleware = require("../middlewares/auth-middleware");

router.route("/addnotice").post(AddNotice.addNotice);
router.route("/shownotice").get(AddNotice.getNotice);
router.route("/notice/delete/:id").delete(AddNotice.deleteNoticeById);
module.exports = router;