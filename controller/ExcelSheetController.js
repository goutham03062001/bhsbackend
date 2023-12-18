const multer = require("multer");
const excelJs = require("exceljs");
const storage = multer.memoryStorage();
const upload = multer({   dest: 'uploads/',storage });
const StudentModel = require("../models/Students")
const ExcelSheetController = {
    uploadDetails : async(req,res)=>{
      try {
        const fileBuffer = req.file.buffer;
        console.log(fileBuffer)
        const workbook = new excelJs.Workbook();
        const worksheet = await workbook.xlsx.load(fileBuffer);
    
        const rows = worksheet.getWorksheet(1).getSheetValues();
        const studentData = [];
        console.log("rows length "+rows.length);
        // Assuming the first row in the Excel sheet contains headers
        const headers = rows[1];
        // console.log(rows);
        for (let i = 1; i < rows.length; i++) {
          const student = {};
          for (let j = 0; j < headers.length; j++) {
            student[headers[j]] = rows[i][j];
          }
          studentData.push(student);
        }
    
        // Insert student data into the MongoDB collection
        // await Student.insertMany(studentData);
        console.log("studentData"+studentData); 
        
       studentData.splice(1,studentData.length).map((everyStudent)=>{
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
            mobileNumber1,
            mobileNumber2,
          } = everyStudent;
          uploadStudentDetailsFunction(everyStudent)
            
       });
       return res.send("Data Uploaded Successfully")
       function uploadStudentDetailsFunction(studentInfo){
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
            mobileNumber1,
            mobileNumber2,
          } = studentInfo;
        // uploadStudentDetailsFunction
        const inputDate = new Date("Tue Mar 06 2001 05:30:00 GMT+0530 (India Standard Time)");

const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
const formattedDate = new Intl.DateTimeFormat('en-US', options).format(inputDate);
        const personalDetails = {
              studentName: studentName,
              AdmissionNumber: AdmissionNumber,
              className: className,
              sectionName: sectionName,
              address: address,
              aadharNumber: aadharNumber,
              dob: formattedDate,
              admissionDate: admissionDate,
              transportation: transportation,
              mobileNumber1: mobileNumber1,
              mobileNumber2: mobileNumber2,
            };
            const newStudentDetails = new StudentModel({
              studentName,
              AdmissionNumber,
              className,
              sectionName,
              personalDetails,
            });
             newStudentDetails.save();
            // return res.send("Uploaded Successfully")
       }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while uploading data' });
      }
},




    

}

module.exports = ExcelSheetController