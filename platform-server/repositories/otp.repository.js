const { Otp } = require('../models/index')


const findOTP = async (Email) => {
    const getOTP = await Otp.findOne({ Email });
    return getOTP;
}

const createOTP = async (Email, OTP)  => {
    await Otp.create({ Email, OTP });
    return null;
}

const deleteOTP = async (Email) => {
    await Otp.deleteMany({ Email });
    return null;
}


module.exports = {
    findOTP,
    deleteOTP,
    createOTP
}