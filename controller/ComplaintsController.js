const StudentModel = require("../models/Students");


const ComplaintsController = {
    addComplaints : async (req,res)=>{
        try {
            const { reason,complaint, AdmissionNumber,date,sendTo} = req.body;
            const StudentProfile = await StudentModel.findOne({AdmissionNumber});
            if(StudentProfile){
                const issueObj = { 
                    reason,complaint,date,sendTo
                }
                StudentProfile.complaints.push({issue : issueObj});
                await StudentProfile.save();
                return res.send(StudentProfile)
            }
            else{return res.send("No Student Details Found with current admission number")}

        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    }
}

module.exports = ComplaintsController