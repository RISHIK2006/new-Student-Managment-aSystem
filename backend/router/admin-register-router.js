const express = require('express');
const router = express.Router();
const adminRegister = require("../controllers/admin-register-controller");
const authMiddleWare = require("../middlewares/auth-middleware");


router.route("/AdminRegister").post(adminRegister.admin_register);
router.route("/LoginPageAdmin").post(adminRegister.admin_login);
router.route("/logindata").get(authMiddleWare, adminRegister.logged_in_user);

module.exports = router;
