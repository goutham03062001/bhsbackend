const express = require("express");
const router = express.Router();

const PushTokenModel = require("../models/PushTokensModel");

router.post("/uploadNewPushToken", async(req,res)=>{
    try {
        const {token,date} = req.body;
        const isTokenExisted = await PushTokenModel.findOne({token});
        if(isTokenExisted){
            return res.send("this token is already existed");
        }
        else{
            const newToken = await new PushTokenModel({token,date});
            await newToken.save();
            return res.send("new token added")
        }
    } catch (error) {
        return res.send("Error Occurred!"+error.message)
    }
})

module.exports = router;

    