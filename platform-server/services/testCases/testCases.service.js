
const { findTestcasesByUniqueParm, createTestCases, updateTestCasesByUniqueParm } = require("../../repositories/testcases.repository");


const addTestCases = async (userId, { problemId, Cases, Result }) => {
    const uniqueParam = { ProblemId: problemId };
    let testCase = await findTestcasesByUniqueParm(uniqueParam);
    if (!testCase) {

        await createTestCases(userId, problemId, Cases, Result);

        return { msg: "Test cases created" };
    } 
    else {

        const uniqueParam = { ProblemId: problemId };
        await updateTestCasesByUniqueParm(uniqueParam, userId, testCase, Cases, Result);

        return { msg: "Test cases updated" };
    }
};

const compareResult = async ({ codeOutput, problemid }) => {
    const uniqueParam = {ProblemId: problemid};
    const testCase = await findTestcasesByUniqueParm(uniqueParam);

    if (!testCase) {
        const error = new Error("Test cases not found");
        error.status = 404;
        throw error;
    }

    const n = testCase.Result.length;
    const result = Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        const str = codeOutput[i]?.trim() ?? "";
        if (testCase.Result[i] === str) {
            result[i] = true;
        }
    }

    return { success: true, result };
};

const deleteTestCases = async (problemId) => {
    const uniqueParam = { ProblemId: problemId };
    await deleteTestCases(uniqueParam);
    return { msg: "Test cases deleted" };
};

const getTestCases = async (problemId) => {
    const uniqueParam = { ProblemId: problemId };
    const testCase = await findTestcasesByUniqueParm(uniqueParam);

    if (!testCase) {
        const error = new Error("Test cases not found");
        error.status = 404;
        throw error;
    }

    return { success: true, testCases: testCase.Cases };
};

module.exports = {
    addTestCases,
    compareResult,
    deleteTestCases,
    getTestCases,
};
