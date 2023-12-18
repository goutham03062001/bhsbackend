const mongoose = require("mongoose");

const PushTokenSchema = mongoose.Schema({
    token:{
        type : String
    },
    date : { type : String}
});

module.exports = PushToken = mongoose.model("PushToken",PushTokenSchema)