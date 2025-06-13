const { User } = require("../../db");

require('dotenv').config();
const SMTP_URL = process.env.SMTP_URL

const emailNotification = async (req , res) => {
    const problemName = req.body.ProblemName;
    const problemId = req.body.ProblemId;
    const userId = req.userId;
    try{
        const getEmail = await User.find({}).select('_id, Email');
        const recivers = [];
        for(let i = 0 ;i < getEmail.length ; i++){
            if(getEmail[i]._id === userId){
                continue;
            }
            recivers.push(getEmail[i].Email);
        }
        console.log(recivers);
        const getUser = await User.findOne({_id : userId}).select('Name');
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
            // console.log(response);
            return res.status(500).json({"msg" : "SMTP Server Down"});
        }
    }
    catch (error){
        return res.status(500).json({"msg" : "Internal Server Down"});
    }
}

module.exports = emailNotification;