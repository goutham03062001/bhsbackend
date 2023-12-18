const StudentModel = require("../models/Students");
const multer = require('multer');
const exceljs = require('exceljs');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const StudentController = {
  AddStudentDetails: async (req, res) => {
    try {
      const {
        studentName,
        AdmissionNumber,
        className,
        sectionName,
        address,
        aadharNumber,
        dob,
        admissionDate,
        transportation,
        mobileNumber,
      } = req.body;
      const isExisted = await StudentModel.findOne({ AdmissionNumber });
      if (isExisted) {
        return res.send("This admission number is already existed!");
      } else {
        const personalDetails = {
          studentName: studentName,
          AdmissionNumber: AdmissionNumber,
          className: className,
          sectionName: sectionName,
          address: address,
          aadharNumber: aadharNumber,
          dob: dob,
          admissionDate: admissionDate,
          transportation: transportation,
          mobileNumber: mobileNumber,
        };
        const newStudentDetails = new StudentModel({
          studentName,
          AdmissionNumber,
          className,
          sectionName,
          personalDetails,
        });
        await newStudentDetails.save();
        return res.send(newStudentDetails);
      }
    } catch (error) {
      return res.send("Error Occurred !" + error.message);
    }
  },

  getStudentDetails: async (req, res) => {
    try {
      const { AdmissionNumber } = req.params;
      console.log("Admission Number" + AdmissionNumber);
      const StudentProfile = await StudentModel.findOne({ AdmissionNumber });
      if (StudentProfile) {
        return res.send(StudentProfile);
      } else {
        return res.send(
          "No Student Details Found with provided Admission Number"
        );
      }
    } catch (error) {
      return res.send("Error Occurred !" + error.message);
    }
  },

  updateStudentPersonalDetails: async (req, res) => {
    try {
      const {
        studentName,
        AdmissionNumber,
        className,
        sectionName,
        address,
        aadharNumber,
        dob,
        admissionDate,
        transportation,
        mobileNumber,
      } = req.body;
      const StudentProfile = await StudentModel.findOne({ AdmissionNumber });
      console.log("Before Updating - "+StudentProfile)
      if (StudentProfile) {
        if (studentName !== "") {
          StudentProfile.studentName = studentName;
          StudentProfile.personalDetails.studentName = studentName;
        }
        if (sectionName !== "") {
          StudentProfile.sectionName = sectionName;
        }
        if (address !== "") {
          StudentProfile.personalDetails.address = address;
        }
        if (aadharNumber !== "") {
          StudentProfile.personalDetails.aadharNumber = aadharNumber;
        }
        if (dob !== "") {
          StudentProfile.personalDetails.dob = dob;
        }
        if (admissionDate !== "") {
          StudentProfile.personalDetails.admissionDate = admissionDate;
        }
        if (transportation !== "") {
          StudentProfile.personalDetails.transportation = transportation;
        }
        if (mobileNumber !== "") {
          StudentProfile.personalDetails.mobileNumber = mobileNumber;
        }

      await StudentProfile.save();
      console.log("After Updating - "+StudentProfile)

        return res.send(StudentProfile);
      } else {
        return res.send(
          "No Student Details Found with provided Admission Number"
        );
      }
    } catch (error) {
      return res.send("Error Occurred !" + error.message);
    }
  },
  getAllStudentsDataBySectionName: async (req, res) => {
    try {
      const { className } = req.params;
      const studentsData = await StudentModel.find({ className });
      if (studentsData) {
        return res.send(studentsData);
      }
    } catch (error) {
      return res.send("Error Occurred !" + error.message);
    }
  },
  deleteStudentDetailsByAdmissionNumber: async (req, res) => {
    try {
      const { AdmissionNumber } = req.params;
      const StudentProfile = await StudentModel.findOneAndDelete({
        AdmissionNumber,
      }); //Removed student details
      console.log("Removed Student Profile", StudentProfile);
      const allStudentsData = await StudentModel.find();
      return res.send(allStudentsData);
    } catch (error) {
      return res.send("Error Occurred !" + error.message);
    }
  },
  uploadExcelSheet: async (req,res)=>{
    try {
        const fileBuffer = req.file.buffer;
        const workbook = new exceljs.Workbook();
        const worksheet = await workbook.xlsx.load(fileBuffer);
    
        const rows = worksheet.getWorksheet(1).getSheetValues();
        const studentData = [];
    
        // Assuming the first row in the Excel sheet contains headers
        const headers = rows[0];
    
        for (let i = 1; i < rows.length; i++) {
          const student = {};
          for (let j = 0; j < headers.length; j++) {
            student[headers[j]] = rows[i][j];
          }
          studentData.push(student);
        }
    
        // Insert student data into the MongoDB collection
        // await Student.insertMany(studentData);
        console.log(studentData);
        res.status(200).json({ message: 'Data uploaded successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while uploading data' });
      }
  }
};

module.exports = StudentController;
