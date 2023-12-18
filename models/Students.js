const mongoose = require("mongoose");
const StudentSchema = mongoose.Schema({
  studentName: { type: String },
  AdmissionNumber: { type: Number },
  className: { type: String },
  sectionName : { type : String},
  personalDetails: {
    studentName: { type: String },
    fatherName:{type:String},
    AdmissionNumber: { type: String },
    address: { type: String },
    mobileNumber1: { type: String },
    mobileNumber2: { type: String },
    aadharNumber: { type: String },
    dob: { type: String },
    admissionDate: { type: String },
    transportation: { type: String },
  },
  feeDetails: [
    {
      feeItem: {
        feeType: { type: String },
        paymentDate: { type: String },
        amount: { type: String },
      },
    },
  ],
  results: [
    {
      exam: 
        {
          examName: { type: String },
          marks: 
            {
              telugu: { type: String },
              hindi: { type: String },
              english: { type: String },
              maths: { type: String },
              physics: { type: String },
              biology: { type: String },
              social: { type: String },
            },
        },
    },
  ],
  achievements: [
    {
      achievementDetails : {
        achievementName : { type : String},
        achievementDate : { type : String}
      }
    },
  ],
  complaints: [
    {
      issue:{
        reason:{type : String},
        complaint:{type : String},
        date:{type : String},
        sendTo:{type : String}
      }
    },
  ],
  attendance: [
    {
      month:{ 
          monthName: { type: String },
          presentDays: { type: String },
          workingDays: { type: String },  
    },
    },
  ],
  dailyAttendance:[
    {
      currentDay:{
          date:{type : String},
          status : {type : String}
      }
    }
  ]
});


module.exports = StudentModel = mongoose.model("StudentsDetails",StudentSchema)