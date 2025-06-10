const {z} = require("zod");

const emailVerified  = z.object({
    Email : z.string().email()
})

require('dotenv').config();
const SMTP_URL = process.env.SMTP_URL

const emailForgotPassword = async(req , res) => {
    try{
        const Email = req.Email;
        const zodPass = emailVerified.safeParse({Email});
        if(!zodPass.success){
            return res.status(409).json({'msg' : "Email is not valid"});
        }
        let recivers = [];
        recivers.push(Email);
        const Api = process.env.CLIENT_URL + '/forgotPassword' ;
        const userId = req.userId;
        const message= 
        `
Hey There
    
    You have requested for Password change.
    Please follow to below Link to update your Password
            
    Link : ${Api}/${userId}
    
    Note : Please do not share this Link to anyone and this is an auto generated Mail so please do not reply to this mail. 
            ` ;

        const authorEmail = process.env.EMAIL;
        const authorTxt = process.env.APP_PASSWORD;

        const response = await fetch(SMTP_URL , {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify({authorEmail, authorTxt, recivers, message}),
        })
        if(response.ok){
            res.status(200).json({"msg" : "OTP Sent"});
        }
        else{
            console.log("Link sent failed with error from else");
            res.status(500);
            return res.json({"msg": "Link sent failed with error"});
        }
    }
    catch(error){
        res.status(500).json({"msg" : "Internal server down"});
    }
}


module.exports = emailForgotPassword