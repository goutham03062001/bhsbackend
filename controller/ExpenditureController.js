const ExpenditureModel = require("../models/ExpenditureModel");

const ExpenditureController = {

    uploadNewExpenditure : async(req,res)=>{
        try {
            const {expenditureType, expenditureAmount, expenditureDate} = req.body;
            const newExpenditure = new ExpenditureModel({expenditureType, expenditureDate, expenditureAmount});
            await newExpenditure.save();
            return res.send("Expenditure Uploaded!")
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
        }
    },
    getDailyExpensesAnalytics : async(req,res)=>{
        try {
            const { expenditureDate } = req.params;
            const expenditureList = await ExpenditureModel.findOne({expenditureDate});
            return res.send(expenditureList);
        } catch (error) {
            return res.send("Error Occurred !"+error.message);
            
        }
    }
};

module.exports = ExpenditureController