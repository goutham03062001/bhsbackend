const express = require("express");
const StudentModel = require("../models/Students")
const FacultyController = {
    getStudentDetailsByClassName : async(req,res)=>{
        try {
            const {className} = req.params;
            const classOfStudents = await StudentModel.find({className});
            if(classOfStudents.length>0){return res.send(classOfStudents)}
            else{return res.send("No Student Found with provided Class")}
        } catch (error) {
         return res.send("Error Occurred!"+error.message)   
        }
    },
    getStudentResultBySectionName : async(req,res)=>{
        try {
            const {className,sectionName} = req.params;
            const classOfStudents = await StudentModel.find({className,sectionName});
            let resultsArr = []
            if(classOfStudents.length>0){
                classOfStudents.map((everyStudent)=>{
                    everyStudent.results.map((examItem)=>{
                        if(examItem.exam.examName===req.params.examName){
                            resultsArr.push({examItem,studentName : everyStudent.studentName,AdmissionNumber:everyStudent.AdmissionNumber})
                        }
                    })
                })
                // return res.send(classOfStudents)
                return res.send(resultsArr);
            }else{
                return res.send("No student with provided class and section name")
            }
        } catch (error) {
         return res.send("Error Occurred!"+error.message)   
            
        }
    },
    getStudentAnalytics: async(req,res)=>{
        try {
            const {className,sectionName} = req.params;
            const classOfStudents = await StudentModel.find({className,sectionName});
            let resultsArr = []
            let monthlyAttendance = []
            if(classOfStudents.length>0){
                classOfStudents.map((everyStudent)=>{
                    everyStudent.results.map((examItem)=>{
                      resultsArr.push({examItem,AdmissionNumber : everyStudent.AdmissionNumber,studentName : everyStudent.studentName})
                    })

                    everyStudent.attendance.map((everyMonthAttendance)=>{
                        monthlyAttendance.push({everyMonthAttendance,AdmissionNumber : everyStudent.AdmissionNumber,studentName : everyStudent.studentName})
                    });
                })
                // return res.send(classOfStudents)
                return res.send({resultsArr,monthlyAttendance});
            }else{
                return res.send("No student with provided class and section name")
            }
        } catch (error) {
         return res.send("Error Occurred!"+error.message)   
            
        }
    }
}
module.exports = FacultyController