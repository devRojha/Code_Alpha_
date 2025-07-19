

const generateOTP = () => {
    // generate 6 digit OTP
    const rn = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    const OTP = rn.toString();
    return OTP;
}



module.exports = generateOTP;