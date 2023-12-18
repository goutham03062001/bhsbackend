const express = require("express");
const router = express.Router();
const client = require("../app.js");
router.get("/",async(req,res)=>{
    try {
        client.on('ready',()=>{
            console.log("WhatsApp client is ready from Event Notifications");
        })
        // return res.send("Hello From Event Notifications");

    } catch (error) {
        return res.send("Error Occurred!"+error.message)
    }
})

module.exports = router;