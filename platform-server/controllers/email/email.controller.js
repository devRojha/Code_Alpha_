const emailService = require("../../services/email/email.service");

const emailForgotPassword = async (req, res) => {
    try {
        const result = await emailService.emailForgotPassword(req.body.Email);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const emailNotification = async (req, res) => {
    try {
        const result = await emailService.emailNotification(req.userId, req.body.ProblemName, req.body.ProblemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const emailOTP = async (req, res) => {
    try {
        const result = await emailService.emailOTP(req.body.Email);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

module.exports = {
    emailForgotPassword,
    emailNotification,
    emailOTP,
};
