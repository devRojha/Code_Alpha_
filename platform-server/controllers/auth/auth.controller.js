const authService = require("../../services/auth/auth.service");


const adminSignin = async (req, res) => {
    try {
        const result = await authService.adminSignin(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const adminSignup = async (req, res) => {
    try {
        const result = await authService.adminSignup(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const userSignin = async (req, res) => {
    try {
        const result = await authService.userSignin(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const userSignup = async (req, res) => {
    try {
        const result = await authService.userSignup(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

module.exports = {
    adminSignin,
    adminSignup,
    userSignin,
    userSignup,
};
