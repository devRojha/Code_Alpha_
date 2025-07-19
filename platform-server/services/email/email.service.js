
const { deleteOTP, createOTP } = require("../../repositories/otp.repository");
const { findUser, findAllUser, findUserById } = require("../../repositories/user.repository");
const {
    generateForgotPasswordEmailTempate,
    generateOTPEmailTempate,
} = require("../../utils/EmailTemplate/authMail");
const generateProblemAddEmailTemplate = require("../../utils/EmailTemplate/problemMail");
const sendEmail = require("../../utils/externalFetch/smtpClient");
const generateOTP = require("../../utils/MathCalculation/otpLogic");
const { emailType } = require("../../utils/zod/email");

const CLIENT_URL = process.env.CLIENT_URL;

const emailForgotPassword = async (Email) => {
    const zodPass = emailType.safeParse({ Email });
    if (!zodPass.success) {
        const error = new Error("Email is not valid");
        error.status = 409;
        throw error;
    }

    const uniqueParam = {Email : Email}
    const userFound = await findUser( uniqueParam );
    if (!userFound) {
        const error = new Error("User Not Found");
        error.status = 404;
        throw error;
    }

    const userId = userFound._id;
    const Link = `${CLIENT_URL}/changePassword/${userId}`;
    const message = generateForgotPasswordEmailTempate(Link);
    const recivers = [Email];

    const response = await sendEmail(recivers, message);
    if (!response.ok) {
        const error = new Error("Link sent failed with error");
        error.status = 500;
        throw error;
    }

    return { msg: "Password Reset Link Sent" };
};

const emailNotification = async (userId, problemName, problemId) => {
    const getEmail = await findAllUser();
    const recivers = [];

    for (let user of getEmail) {
        if (user._id.toString() !== userId.toString()) {
            recivers.push(user.Email);
        }
    }

    const getUser = await findUserById(userId);
    const link = `${CLIENT_URL}/problemset/problem/${problemId}`;

    const message = generateProblemAddEmailTemplate(getUser.Name, problemName, link);
    const response = await sendEmail(recivers, message);

    if (!response.ok) {
        const error = new Error("SMTP Server Down");
        error.status = 500;
        throw error;
    }

    return { msg: "Notification sent to all users" };
};

const emailOTP = async (Email) => {
    const zodPass = emailType.safeParse({ Email });
    if (!zodPass.success) {
        const error = new Error("Email is not valid");
        error.status = 409;
        throw error;
    }

    const OTP = generateOTP();

    await deleteOTP( Email );
    await createOTP( Email, OTP );

    // delete OTP in 5 minutes
    setTimeout(async () => {
        await deleteOTP( Email );
    }, 300000); 

    const recivers = [Email];
    const message = generateOTPEmailTempate(OTP);
    const response = await sendEmail(recivers, message);

    if (!response.ok) {
        const error = new Error("Link sent failed with error");
        error.status = 500;
        throw error;
    }

    return { msg: "OTP Sent" };
};

module.exports = {
    emailForgotPassword,
    emailNotification,
    emailOTP,
};
