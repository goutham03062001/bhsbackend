const express = require("express");
const router = express.Router();
const FacultyController = require('../controller/FacultyController')
router.get("/StudentDetails/:className",FacultyController.getStudentDetailsByClassName)
router.get("/StudentResults/class/:className/section/:sectionName/exam/:examName",FacultyController.getStudentResultBySectionName);
router.get("/StudentAnalytics/class/:className/section/:sectionName",FacultyController.getStudentAnalytics)
module.exports = router;