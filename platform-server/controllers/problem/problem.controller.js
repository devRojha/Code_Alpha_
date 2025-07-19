
const problemService = require("../../services/problem/problem.service");

const allProblem = async (req, res) => {
    try {
        const result = await problemService.allProblem();
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const problemById = async (req, res) => {
    try {
        const result = await problemService.problemById(req.headers.id, req.userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const setProblem = async (req, res) => {
    try {
        const result = await problemService.setProblem(req.userId, req.isAdmin, req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const codeSubmitProblem = async (req, res) => {
    try {
        const result = await problemService.codeSubmitProblem(req.userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const editProblem = async (req, res) => {
    try {
        const result = await problemService.editProblem(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const deleteProblem = async (req, res) => {
    try {
        const result = await problemService.deleteProblem(req.headers.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};


module.exports = {
    allProblem,
    problemById,
    setProblem,
    codeSubmitProblem,
    editProblem,
    deleteProblem,
};
