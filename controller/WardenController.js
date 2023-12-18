const express = require("express");
const WardenModel = require("../models/WardenModel")
const WardenController = {
    UploadDetails: async(req,res)=>{
        try {
            const {name, AdmissionNumber,currentClass,currentSection,passType,reason} = req.body;
            let date = new Date().toLocaleDateString();
            let timeStamp = new Date().toLocaleTimeString();
            const isDayExisted = await WardenModel.findOne({date});
            const personObj = {name, AdmissionNumber,timeStamp,currentClass,currentSection,passType,reason};

            if(isDayExisted){
                isDayExisted.day.unshift({personObj});
                await isDayExisted.save();
                return res.send(isDayExisted);
            }
            else{
                const day = [];
                day.push({personObj});
                const newEntryOfTheDay = new WardenModel({day,date});
                await newEntryOfTheDay.save();
                return res.send(newEntryOfTheDay);
            }
        } catch (error) {
            return res.send("Error Occurred!"+error.message);
        }
    },
    getTodayEntries : async(req,res)=>{
        try {
            const date = new Date().toLocaleDateString();
            const entriesArr = await WardenModel.find({date});
            return res.send(entriesArr);
        } catch (error) {
            return res.send("Error Occurred!"+error.message);
            
        }
    }
}

module.exports = WardenController;