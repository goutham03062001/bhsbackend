const StudentModel = require("../models/Students");

const AttendanceController = { 
    addMonthlyAttendance: async(req,res)=>{
        try {
            const {monthName, workingDays, presentDays, AdmissionNumber} = req.body;
            const StudentProfile = await StudentModel.findOne({AdmissionNumber});
            if(StudentProfile){
                const monthObj = {
                     monthName : monthName,
                     workingDays: workingDays,
                     presentDays: presentDays};
                StudentProfile.attendance.push({ month: monthObj});
                await StudentProfile.save();
                return res.send(StudentProfile);
            }
            else{return res.send("No Student Details Found with current admission number")}
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    },
    deleteMonthlyAttendance : async(req,res)=>{
        try {
            const {AdmissionNumber,monthId} = req.params;
            const StudentProfile = await StudentModel.findOne({AdmissionNumber});
            if(StudentProfile){
                StudentProfile.attendance.map((month)=>{
                    if(month._id.toString() === monthId){
                        StudentProfile.attendance.splice(StudentProfile.attendance.indexOf(month),1);
                        StudentProfile.save();
                    }
                });
                return res.send(StudentProfile);
            }
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    },
    uploadDailyAttendance : async(req,res)=>{
        try {
            const {AdmissionNumber,status, date} = req.body;
            const StudentProfile = await StudentModel.findOne({AdmissionNumber});
            const currentDay = {date,status}
            if(StudentProfile){
                StudentProfile.dailyAttendance.push({currentDay});
                await StudentProfile.save();
                return res.send(StudentProfile); 
            }
            else{return res.send("No Student Details Found with current admission number")}

        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    }
}

module.exports = AttendanceController;