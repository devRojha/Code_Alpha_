const testCasesService = require("../../services/testCases/testCases.service");

const addTestCases = async (req, res) => {
    try {
        const result = await testCasesService.addTestCases(req.userId, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const compareResult = async (req, res) => {
    try {
        const result = await testCasesService.compareResult(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const deleteTestCases = async (req, res) => {
    try {
        const result = await testCasesService.deleteTestCases(req.headers.problemid);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

const getTestCases = async (req, res) => {
    try {
        const result = await testCasesService.getTestCases(req.headers.problemid);
        res.status(200).json(result);
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message });
    }
};

module.exports = {
    addTestCases,
    compareResult,
    deleteTestCases,
    getTestCases,
};
