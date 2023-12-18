const express = require("express");
const router = express.Router();
const AuthController = require("../controller/Auth")
router.post("/Signup",AuthController.StudentSignup)
router.post("/Login",AuthController.StudentLogin);
router.post("/TeacherSignup",AuthController.TeacherSignup);
router.post("/TeacherLogin",AuthController.TeacherLogin);
router.put("/updatePassword",AuthController.updatePassword);
router.get("/TeacherDetails/:mobileNumber",AuthController.getTeacherDetails)
module.exports = router;