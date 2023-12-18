const StudentModel = require("../models/Students");

const ResultController = {
    AddExamMarks : async(req,res)=>{
        try {
            const { examName,telugu,hindi,english,maths,physics,biology,social,AdmissionNumber} = req.body;
            const StudentProfile = await StudentModel.findOne({AdmissionNumber});
            if(StudentProfile){
                const marksObj = { telugu: telugu, hindi: hindi, english: english, maths: maths, physics:physics, biology: biology, social: social};
                const examObj = { examName : examName, marks : marksObj};
                StudentProfile.results.push({exam : examObj});
                await StudentProfile.save();
                return res.send(StudentProfile);
            }else{
                return res.send("No Student Details Found with This Admission Number")
            }
        } catch (error) {
            return res.send("Error Occurred!"+error.message)
        }
    }
}

module.exports = ResultController