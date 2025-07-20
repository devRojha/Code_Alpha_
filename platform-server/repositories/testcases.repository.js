const { TestCases } = require('../models/index')


const findTestcasesByUniqueParm = async (uniqueParam) => {
    let testCase = await TestCases.findOne(uniqueParam);
    return testCase;
}

const createTestCases = async (AdminId, ProblemId, Cases, Result) => {
    await TestCases.create({
        ProblemId,
        AdminId,
        Cases,
        Result,
    });
    return null;
}

const deleteTestCasesByParm = async (uniqueParam) => {
    await TestCases.deleteOne(uniqueParam);
    return null;
}

const updateTestCasesByUniqueParm = async (uniqueParam, AdminId, testCase, Cases, Result) => {
    await TestCases.updateOne(
        uniqueParam,
        {
            AdminId,
            Cases: [...testCase.Cases, ...Cases],
            Result: [...testCase.Result, ...Result],
        }
    );
    return null;
}

module.exports = {
    findTestcasesByUniqueParm,
    createTestCases,
    deleteTestCasesByParm,
    updateTestCasesByUniqueParm
}