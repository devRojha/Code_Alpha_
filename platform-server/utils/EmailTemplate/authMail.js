


const generateForgotPasswordEmailTempate = (Link) => {
    const message = 
    `
Hey There
    
    You have requested for Password change.
    Please follow to below Link to update your Password
            
    Link : ${Link}
    
    Note : Please do not share this Link to anyone and this is an auto generated Mail so please do not reply to this mail. 
    
    `;
    
    return message;
};

const generateOTPEmailTempate = (OTP) => {
    const message = 
    `
    Hey There

    You have requested for Registration.
    Please find the OTP below. This OTP will be active for the next 5 minutes.
        
    OTP : ${OTP}

    Note : This is an auto generated Mail so please do not reply to this mail.
        
    `;
    return message
}


module.exports = {
    generateForgotPasswordEmailTempate,
    generateOTPEmailTempate
}