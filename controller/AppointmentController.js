const AppointmentModel = require("../models/AppointmentModel")
const nodemailer = require("nodemailer")
const AppointmentController = {
    CreateAppointment : async (req,res)=>{
        try {
            const {name,reason,peopleCount} = req.body;
            const newAppointment = new AppointmentModel({name,reason,peopleCount});
            await newAppointment.save();
            //send mail to principal 
            try {
                // const {problem,description,latitude,longitude} = req.body;
                // const newContactForm = new ContactForm({problem,description,timeStamp,latitude,longitude});
                // await newContactForm.save();
                //send the mail to admin
                let transponder =nodemailer.createTransport({
                    service:"gmail",
                    auth:{
                        user  : 'gouthamkumarpolapally@gmail.com',
                        pass : 'aadqhvadmheogdfx'
                    }
                });
        
                let mailOptions = {
                    from :"gouthamkumarpolapally@gmail.com",
                    to:"gouthamp0306@gmail.com",
                    subject:"APPOINTMENT E-MAIL",
                    text:`Appointment for ${name}`,
                    html:`
                    <html>
                    <head>
                <meta charset="utf-8">
                <style amp4email-boilerplate>body{visibility:hidden}</style>
                <script async src="https://cdn.ampproject.org/v0.js"></script>
                <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
              </head>
        
              <body>
                    <div className="container">
                    <h2 style={{color:"blue"}}>ISSUE RAISED FROM OUR PLATFORM</h2>
                    <p>
                    Person Name : ${name}
                    </p>
                    <p>Reason : ${reason}</p>
                    <p>Count - ${peopleCount}</p>
                    
                    </div>

                   <a  href=${"/allowUser"}> <button>Allow</button></a>
                   <a href=${"/doNotAllowUser"}>
                   <button >Do not allow</button>
                   
                   </a>
              </body>
                    
                    </html>`
                }
                
                transponder.sendMail(mailOptions,(err,info)=>{
                    if(err){console.log(err)}
                    else{console.log("E-mail Sent Successfully",info.response)}
                })
        
                
                // function allowFunctionHandler(){
                //     console.log("Clicked On Allow")
                // }
                // function doNotAllowFunctionHandler(){
                //     console.log("Clicked On Do not Allow")

                // }
        
                // return res.status(200).send('Submitted Successfully');
                return res.send(newAppointment);
            } catch (error) {
                return res.status(500).send('Error Occurred : '+error.message)
            }
        } catch (error) {
            return res.send("Error Occurred!"+error.message)
        }
    }
}

module.exports = AppointmentController;