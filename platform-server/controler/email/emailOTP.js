const {z} = require("zod");
const { Otp } = require("../../db");

const emailVerified  = z.object({
    Email : z.string().email()
})

require('dotenv').config();
const SMTP_URL = process.env.SMTP_URL

const emailOTP = async(req , res) => {
    try{
        const Email = req.body.Email;
        const zodPass = emailVerified.safeParse({Email});
        if(!zodPass.success){
            return res.status(409).json({'msg' : "Email is not valid"});
        }
        const rn = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000 ; // 6 digi otp
        const OTP = rn.toString();
        let recivers = [];
        recivers.push(Email);
        const message= 
        `
Hey There

    You have requested for Registration.
    Please find the OTP below. This OTP will be active for the next 5 minutes.
        
    OTP : ${OTP}

    Note : This is an auto generated Mail so please do not reply to this mail.
        ` ;
        // delete the previous OTP
        const checkOTP = Otp.find({Email});
        if(checkOTP){
            await Otp.deleteMany({Email : Email})
        }
        // create the new otp
        await Otp.create({
            Email : Email,
            OTP : OTP
        })
        // delete the otp after 5 Min
        setTimeout(async ()=>{
            await Otp.deleteMany({Email : Email})
        }, 300000);
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


module.exports = emailOTP