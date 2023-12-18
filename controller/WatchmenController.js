const WatchmenModel = require("../models/WatchmenModel")
const WatchmenController = { 
    UploadNewEntry: async(req,res)=>{
        try {
            const {name,address,mobileNumber,date,timeStamp,reason} = req.body;
            const isDayExisted = await WatchmenModel.findOne({date});
            if(isDayExisted){
                const personObj = {name, address,mobileNumber,timeStamp,reason};
                isDayExisted.day.push({personObj});
                await isDayExisted.save();
                return res.send(isDayExisted); 
            }else{
                const day = [];
                const personObj = {name, address,mobileNumber,timeStamp,reason};
                day.push({personObj})
                const newEntryOnThisDay = new WatchmenModel({day,date});
                await newEntryOnThisDay.save();
                return res.send(newEntryOnThisDay);
            }
        } catch (error) {
            console.log("Error Occurred !"+error.message)
            return res.send("Error Occurred!"+error.message);
        }
    },
    getTodaysEntries: async(req,res)=>{
        try {
            const date = new Date().toLocaleDateString();
            const entries = await WatchmenModel.find({date});
            return res.send(entries);
        } catch (error) {
            console.log("Error Occurred !"+error.message)
            return res.send("Error Occurred!"+error.message);
        }
    },
    getSelectedDateEntries : async (req,res)=>{
        const {month,date,year} = req.params;
        const userSelectedData = month+"/"+date+"/"+year;
        
        try {
            const entries = await WatchmenModel.findOne({date : userSelectedData});

                return res.send(entries)
            
            
        } catch (error) {
            console.log("Error Occurred !"+error.message)
            return res.send("Error Occurred!"+error.message);
        }
    },
    // sendWhatsAppMessage : async(req,res)=>{
        
    //     try {
    //         const recipientNumber = '7660943343';

    //         // Create a WhatsApp message link
    //         const whatsappLink = `https://wa.me/${recipientNumber}`;
        
    //         // Redirect the user to the WhatsApp link
    //         res.redirect(whatsappLink);
    //     } catch (error) {
    //         console.log("Error Occurred !"+error.message)
    //         return res.send("Error Occurred!"+error.message);
    //     }
    // }
}

module.exports = WatchmenController;