const express = require("express");
const AuthModel = require("../models/Auth")
const bcrypt = require("bcryptjs");
const FacultyDetails = require("../utils/AuthFacultyInfo");

const AuthController = {
    StudentSignup: async(req,res)=>{
        try {
            const {role, mobileNumber, password,AdmissionNumber} = req.body;
            const isExisted = await AuthModel.findOne({AdmissionNumber});
            if(isExisted){return res.send("This Admission Number is already registered")}
            else{
                const bcryptPassword = bcrypt.hashSync(password,10);
                const newAccess = new AuthModel({role, mobileNumber, password: bcryptPassword,AdmissionNumber});
                await newAccess.save();
                return res.send(newAccess);                
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    },
    StudentLogin:async (req,res)=>{
        try {
            const {role,password,AdmissionNumber} = req.body;
            // console.log("Role : "+role);
            const isExisted = await AuthModel.findOne({AdmissionNumber});
            if(isExisted){
                bcrypt.compare(password,isExisted.password,(err,success)=>{
                    if(err){return res.send(err)}
                    if(success){return res.send(isExisted)}
                    else{return res.send('Either your password or Admission number is wrong')}
                })
            }else{
                return res.send("We don't find any account with this Admission Number")
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
        }
    },
    updatePassword : async (req,res)=>{
        try {
            const {mobileNumber,password,role} = req.body;
            const isExisted = await AuthModel.findOne({mobileNumber,role});
            if(isExisted){
                const bcryptPassword = await bcrypt.hashSync(password,10);
                isExisted.password = bcryptPassword;
                await isExisted.save();
                return res.send("Your Password Updated!")
            }
            else{return res.send("Oops! We don't find any account with this mobile number")}
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    },
    TeacherSignup: async(req,res)=>{
        try {
            const {mobileNumber,password} = req.body;
            const isExisted = await AuthModel.findOne({mobileNumber});
            if(isExisted){return res.send("This mobile is already in use")}
            else{
                const isFacultyExisted = FacultyDetails.filter((eachFaculty)=> {return eachFaculty.facultyObj.mobileNumber === mobileNumber })
            if(isFacultyExisted.length>0){
                // return res.send("Faculty Details Existed with this credentials")
                const bcryptPassword = bcrypt.hashSync(password,10);
                const newAccess = new AuthModel({mobileNumber,password:bcryptPassword});
                await newAccess.save();
                return res.send(isFacultyExisted)
            }else{
                return res.send("You do not have any access")
            }
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    },
    TeacherLogin: async(req,res)=>{
        try {
            const {mobileNumber,password} = req.body;
            const isExisted = await AuthModel.findOne({mobileNumber});
            if(isExisted){
                const isFacultyExisted = FacultyDetails.filter((eachFaculty)=> {return eachFaculty.facultyObj.mobileNumber === mobileNumber })
                bcrypt.compare(password,isExisted.password,(err,success)=>{
                    if(err){return res.send(err)}
                    if(success){return res.send(isFacultyExisted)}
                    else{return res.send('Either your password or Admission number is wrong')}
                })
            }
            else{return res.send("Oops! We can't find your account")}
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    },
    getTeacherDetails: async(req,res)=>{
        try {
            const {mobileNumber} = req.params;
            const isFacultyExisted = FacultyDetails.filter((eachFaculty)=> {return eachFaculty.facultyObj.mobileNumber === mobileNumber })
            if(isFacultyExisted){return res.send(isFacultyExisted)}
            else{return res.send("Not found any faculty details with provided mobile number")}
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    }
}
module.exports = AuthController