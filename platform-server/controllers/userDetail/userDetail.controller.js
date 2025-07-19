const userDetailService = require("../../services/userDetail/userDetail.services");

const allUsers = async (req, res) => {
    try {
        const result = await userDetailService.allUsers();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await userDetailService.deleteUser(req.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const profile = async (req, res) => {
    try {
        const result = await userDetailService.profile(req.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const allProblem = async (req, res) => {
    try {
        const result = await userDetailService.allProblem(req.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const submitCodeProblem = async (req, res) => {
    try {
        const result = await userDetailService.submitCodeProblem(req.userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const result = await userDetailService.updateUser(req.userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const updateProblemSolved = async (req, res) => {
    try {
        const result = await userDetailService.updateProblemSolved(req.userId, req.body.problemId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const updateProblemCode = async (req, res) => {
    try {
        const result = await userDetailService.updateProblemCode(req.userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const updateUserPassword = async (req, res) => {
    try {
        const result = await userDetailService.updateUserPassword(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

module.exports = {
    allUsers,
    deleteUser,
    profile,
    allProblem,
    submitCodeProblem,
    updateUser,
    updateProblemSolved,
    updateProblemCode,
    updateUserPassword
};
