const StudentModel = require("../models/Students");

const ProfileController = {
    UpdateProfile : async (req,res)=>{
        try {
            
        } catch (error) {
            return res.send("Error Occurred!"+error.message);
        }
    }
}

module.exports = ProfileController;