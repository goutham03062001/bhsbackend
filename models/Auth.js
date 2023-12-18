const mongoose = require("mongoose");
const AuthSchema = mongoose.Schema({
    name : {type : String},
    mobileNumber:{type : String},
    password:{type : String},
    role:{type : String},
    AdmissionNumber : { type : String}
});

module.exports = AuthModel = mongoose.model("Authentication",AuthSchema);