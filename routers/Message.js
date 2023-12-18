const express = require("express");
const router = express.Router();
const { Client, LocalAuth ,MessageMedia} = require("whatsapp-web.js");
const client = new Client({ authStrategy: new LocalAuth() });
// const Image = require('./photo.png');
const qrcode = require("qrcode-terminal");
const recipientNumbers = ["919177928489"]; // Replace with the actual phone number




async function sendMessage() {
    console.log("sendMessage Function called");
    client.initialize();
    
    client.on("qr", (qr) => {
        console.log("QR RECEIVED", qr);
        qrcode.generate(qr, { small: true });
      });
      
      
    client.on("ready", () => {
        console.log("Client is ready!");
        sendWAMessage();
      //   sendPhoto();
      });
      
      client.on("message", (message) => {
        console.log(message.body);
        // client.sendMessage()
      });


      function sendWAMessage(){
        recipientNumbers.forEach(everyUser=>{
            sendWhatsAppMessage(everyUser);
            // sendPhoto(everyUser)
          console.log("user mobile - "+everyUser)
            });
        
      }
      
    try {
    const message = "Your son/daughter is absent today?";
  
    // Send the message



    async function sendWhatsAppMessage(recipientNumber){
      const chat = await client.getChatById(`${recipientNumber}@c.us`);
      chat.sendMessage(message);
    
      console.log(`Message sent to ${recipientNumber}`);
    }
    } catch (error) {
      console.log("Error Occurred while sending message!",error.message);
    }
  }
  

  
//send to single member
router.post("/sendMessage/:mobileNumber",async(req,res)=>{
    console.log("sending whatsApp Message");
    try {
        console.log("initializing")
    console.log("initialized")

    sendMessage();
    
    } catch (error) {
        return res.send("Error Occurred"+error.message)
    }

})

module.exports = router;