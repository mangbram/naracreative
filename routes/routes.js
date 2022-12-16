const express = require("express");
const router = express.Router();
const {controller} = require("../controller");
const {validation} = require("../validators");
const Auth = require("../middleware/auth");

router.route("/register").post(validation.addUser, controller.registerUser);

router.route("/login").post(validation.login, controller.login);

router.route("/ukm").post(validation.daftarUkm, controller.daftarUkm);
// router.post('/login', userController.login)

// router.post('/logout', Auth.verifyToken, userController.logout)

// router.post('/verify', Auth.verifyToken, userController.verify)

module.exports = router;
