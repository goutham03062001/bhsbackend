const express = require("express");
const router = express.Router();
const multer = require("multer");
const excelJs = require("exceljs");
const StudentController = require("../controller/StudentProfileController")
const ComplaintsController = require("../controller/ComplaintsController")
const AttendanceController = require("../controller/AttendanceController");
const AchievementsController = require("../controller/AchievementsController");
const ResultController = require("../controller/ResultController");
const FeeDetailsController = require("../controller/FeeDetailsController");
const ExcelSheetController = require("../controller/ExcelSheetController")
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/addStudent",StudentController.AddStudentDetails);
router.post("/addAchievements",AchievementsController.addAchievements);
router.post("/addMonthlyAttendance",AttendanceController.addMonthlyAttendance);
router.post("/AddComplaints",ComplaintsController.addComplaints);
router.post("/AddExamMarks",ResultController.AddExamMarks);
router.post("/UploadFeeDetails",FeeDetailsController.uploadFeeDetails);
router.post("/uploadDailyAttendance",AttendanceController.uploadDailyAttendance);
router.post("/uploadExcelSheet",upload.single('file'),ExcelSheetController.uploadDetails);

router.get("/getStudentDetails/:AdmissionNumber",StudentController.getStudentDetails);
router.get('/getStudentDetails/class/:className',StudentController.getAllStudentsDataBySectionName)

router.put("/updateStudentDetails",StudentController.updateStudentPersonalDetails);

router.delete("/deleteStudentProfile/:AdmissionNumber",StudentController.deleteStudentDetailsByAdmissionNumber);
router.delete("/deleteStudentFeeDetails/admissionNumber/:AdmissionNumber/id/:feeItemId",FeeDetailsController.deleteFeeDetails);
router.delete("/deleteStudentAchievement/admissionNumber/:AdmissionNumber/id/:achievementId",AchievementsController.deleteAchievement);
router.delete("/deleteAttendance/admissionNumber/:AdmissionNumber/:id/:monthId",AttendanceController.deleteMonthlyAttendance)
module.exports = router;