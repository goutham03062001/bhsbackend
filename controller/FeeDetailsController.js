const StudentModel = require("../models/Students");

const FeeDetailsController = {

    uploadFeeDetails: async(req,res)=>{
        const { feeType,amount,paymentDate,AdmissionNumber} = req.body;
        const StudentProfile = await StudentModel.findOne({AdmissionNumber});
        if(StudentProfile){
            const feeItem = { feeType : feeType, amount : amount, paymentDate: paymentDate};
            StudentProfile.feeDetails.push({feeItem});
            await StudentProfile.save();
            return res.send(StudentProfile)
        }else{
            return res.send("No student details found with the current Admission Number");
        }
    },
    deleteFeeDetails : async(req,res)=>{
        try {
            const StudentProfile = await StudentModel.findOne({AdmissionNumber:req.params.AdmissionNumber});
            if(StudentProfile){

                StudentProfile.feeDetails.map((feeDetailItem)=>{
                    console.log(feeDetailItem._id);
                    if(feeDetailItem._id.toString() === req.params.feeItemId){
                        StudentProfile.feeDetails.splice(StudentProfile.feeDetails.indexOf(feeDetailItem),1)

                        // classFound.students.splice(classFound.students.indexOf(student),1);
                         StudentProfile.save(); 
                        return res.send(StudentProfile);
                    }
                });
                
            }else{
                return res.send("No Student Details found with the current Admission Number") 
            }
        } catch (error) {
            return res.send("Error Occurred!"+error.message)
        }
    }
};

module.exports = FeeDetailsController;