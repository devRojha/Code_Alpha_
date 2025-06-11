const { User } = require("../../db");

require('dotenv').config();
const SMTP_URL = process.env.SMTP_URL

const emailNotification = async (req , res) => {
    const problemName = req.Problem;
    const problemId = req.ProblemId;
    const userId = req.userId;
    try{
        const getEamil = User.find({}).select('Email');
        const recivers = [];
        for(let i = 0 ;i < getEamil.length ; i++){
            recivers.push(getEamil[i].Email);
        }
        const getUser = User.findById({_id : userId}).select('Name');
        const link = process.env.CLIENT_URL + '/problemset/problem/' + problemId;

        const message = 
        `
    Hey There
    
        ${getUser.Name} is recently added a Problem "${problemName}"
        
        To solve this Tap the below Link
        Problem : ${link}
    
        Note : This is an auto generated Mail so please do not reply to this mail.
            ` ;
        const authorEmail = process.env.EMAIL;
        const authorTxt = process.env.APP_PASSWORD;
        const response = await fetch(SMTP_URL , {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({authorEmail, authorTxt, recivers, message}),
        })
        if(response.ok){
            return res.status(200).json({"msg" : "Notification sent to all users"});
        }
        else{
            return res.json({"msg" : "SMTP Server Down"});
        }
    }
    catch (error){
        return res.status(500).json({"msg" : "Internal Server Down"});
    }
}

module.exports = emailNotification;