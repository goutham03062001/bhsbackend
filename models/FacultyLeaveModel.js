const mongoose = require("mongoose");
const FacultyLeaveSchema = mongoose.Schema({
    name : { type : String},
    subject : { type : String},
    mobileNumber : { type : String},
    noOfDaysLeave : { type : String},
    date:{ type : String}
});

module.exports = FacultyLeaveModel = mongoose.model("FacultyLeaves",FacultyLeaveSchema);