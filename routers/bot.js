const { Client, LocalAuth ,MessageMedia} = require("whatsapp-web.js");
const client = new Client({ authStrategy: new LocalAuth() });
// const Image = require('./photo.png');
const qrcode = require("qrcode-terminal");
const express = require("express");
const router = express.Router();


router.post("/ok",async(req,res)=>{
  
    try {
      const recipientNumbers = ["919177928489"]; // Replace with the actual phone number
    const message = "What are you doing?";
  
    // Send the message
    recipientNumbers.forEach(everyUser=>{
    sendWhatsAppMessage(everyUser);
    // sendPhoto(everyUser)
    console.log("user mobile - "+everyUser);
    });
    async function sendWhatsAppMessage(recipientNumber){
      const chat = await client.getChatById(`${recipientNumber}@c.us`);
      chat.sendMessage(message);
    
      console.log(`Message sent to ${recipientNumber}`);
    }

  } catch (error) {
    return res.send("Error Occurred!"+error.message)
  }
});
module.exports = router;