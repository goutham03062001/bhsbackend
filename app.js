const express = require("express")
const app = express();
const connection = require("./connection/conn");
// const bot = require("./routers/bot")
const { Client, LocalAuth ,MessageMedia} = require("whatsapp-web.js");
const client = new Client({ authStrategy: new LocalAuth() });
const AuthRouter = require("./routers/Auth");
const StudentRouter = require("./routers/Students");
const FacultyRouter = require("./routers/Faculty");
const PushTokenRouter = require("./routers/PushToken");
const EventNotification = require("./routers/EventNotification");
const bot = require("./routers/bot");
const qrcode = require("qrcode-terminal");
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const DEV_URL = "http://localhost:3000";
const PROD_URL = "https://bhsmanagement.netlify.app/";
var CURR_URL;
if(process.env.NODE_ENV ==="production"){
  CURR_URL= PROD_URL;
}if(process.env.NODE_ENV==="development"){
  CURR_URL=DEV_URL
}

const io = socketIO(server, { path: '/socket.io', cors: { origin:CURR_URL } });


const cors = require("cors"); 
const port = 7000;

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', CURR_URL);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use("/api/Auth",AuthRouter);
app.use("/api/Student",StudentRouter);
// app.use("/api/bot/sendAbsentMessage",bot);
app.use("/api/Faculty",FacultyRouter);
app.use("/api/PushToken",PushTokenRouter);
app.use("/api/bot/EventNotifications",EventNotification);
app.post("/api/bot/sendAbsentMessage/ok",async(req,res)=>{
  
    try {
      
      const details = req.body.details;
      let studentDetails = [];
      console.log("details - ",details);
      details.map((student)=>{
        // parentsMobile.push(studentDetails.mobileNumber);
        studentDetails.push({mobileNumber:student.mobileNumber,studentName : student.studentName})
      })
    // Send the message
    console.log("student details - "+studentDetails)
      studentDetails.forEach(student=>{
        sendWhatsAppMessage(student.mobileNumber,student.studentName);
      })
   

    async function sendWhatsAppMessage(mobile,studentName){
      console.log("Entered sendWhatsAppMessage function");
      // console.log(client.initialize);
      console.log("client state - ",client.getState());
      let mobileNumber = "91"+mobile;
      console.log("mobile Number - ",mobileNumber)
      try {
        // Connect to the WhatsApp Web if not already connected

        
    
      const chatId = await client.getChatById(`${mobileNumber}@c.us`);
      try {
        let currentDate = new Date().toLocaleDateString();
    const message = "Hello This is An Important Message From Bhavitha High School, Kamareddy. This is to inform you that your child "+studentName+" is absent on today "+currentDate+" .";

        const chat = await chatId.sendMessage(message);
        console.log("Message Successfully!");
         res.send("Message Sent Successfully");
      } catch (error) {
       console.log("Error While getting chat Id"+error.message) ;
        res.send("Error While Getting WhatsApp Number");
      }
      } catch (error) {
        console.error('Error sending message:', error);
         res.status(500).send('Error sending message: ' + error);
      }
   
    }

  } catch (error) {
     res.send("Error Occurred!"+error.message)
  }

});


client.on("qr", (qr,qrCodeUrl) => {
    console.log("QR RECEIVED", qr);
    console.log("Qr url - ",qrCodeUrl)
    qrcode.generate(qr, { small: true });
    io.emit("qrCode",{qr});
  });

client.on('qr', (qrCode) => {
    console.log('QR code received. Scan it with your phone.');
  });
  
  // Listen for ready event
  client.on('ready', () => {
    console.log('WhatsApp client is ready');
    io.emit("wbReady",{message:"whatsApp web is ready to send messages!"})
  });
  
  client.initialize();
 
  
  server.listen(port,()=>{console.log("Server running is on : "+port)});
 