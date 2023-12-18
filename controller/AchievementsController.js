const StudentModel = require("../models/Students");
const mongoose = require("mongoose")
const AchievementsController = {
    addAchievements: async(req,res)=>{
        try {
            const { achievementDate,achievementName,AdmissionNumber} = req.body;
           
                const StudentProfile = await StudentModel.findOne({AdmissionNumber});
                if(StudentProfile){
                
                    const achievementDetails = { 
                         achievementDate: achievementDate, 
                         achievementName: achievementName
                     };
                    
                    StudentProfile.achievements.push({ achievementDetails: achievementDetails})
                    await StudentProfile.save();
                    return res.send(StudentProfile);
                }
                else{
                    return res.send("No Student Details Found with current admission number");
                }
            
            
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    },
    deleteAchievement : async(req,res)=>{
        try {
            const {AdmissionNumber,achievementId} = req.params;
            const StudentProfile = await StudentModel.findOne({AdmissionNumber});
            if (StudentProfile) {
                StudentProfile.achievements.map((achievement)=>{
                   
                    if(achievement._id.toString() === achievementId){
                        StudentProfile.achievements.splice(StudentProfile.achievements.indexOf(achievement),1);
                         StudentProfile.save();
                    }
                });
                return res.send(StudentProfile);
            }
            else{
                return res.send("No Student Details Found with current admission number");

            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message)
            
        }
    }
}

module.exports = AchievementsController;