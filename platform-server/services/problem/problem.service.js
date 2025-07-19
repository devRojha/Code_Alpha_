
const { findAllProblem, deleteProblemById, updateProblemById, updateProblemSubmit, findProblemById, createProblem } = require("../../repositories/problem.repository");
const { findUserById } = require("../../repositories/user.repository");
const { ProblemUpdateType, ProblemType, codeSubmitType } = require("../../utils/zod/problemType");

const allProblem = async () => {
    const problems = await findAllProblem();
    return { problems };
};

const codeSubmitProblem = async (userId, { code, lang, status, problemId }) => {
    const zodPass = codeSubmitType.safeParse({ code, lang, status, problemId });
    if (!zodPass.success) {
        const error = new Error("Input validation failed for code submission");
        error.status = 409;
        throw error;
    }

    const userData = await findUserById( userId );
    const date = new Date();
    const problemSet = updateProblemSubmit(problemId, date, userId, userData.Name, code, lang, status);
    return { problemSet };
};

const deleteProblem = async (id) => {
    await deleteProblemById(id);
    return { msg: "Problem deleted" };
};

const editProblem = async ({ id, Title, Description, Deficulty, Constraint, Example, Company, Topic }) => {
    const zodPass = ProblemUpdateType.safeParse({ Title, Description, Deficulty, Constraint, Example, Company, Topic });
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }

    const topic = Topic.split(",").map((t) => t.trim()) || [];
    const company = Company.split(",").map((t) => t.trim()) || [];

    const problemSet = await updateProblemById(id, Title, Description, Deficulty, Constraint, Example, company, topic);
    
    return { problemSet };
};

const problemById = async (id, userId) => {
    const problemFound = await findProblemById(id);
    if (!problemFound) {
        const error = new Error("Problem not found");
        error.status = 404;
        throw error;
    }

    let Edit = false;
    if (problemFound.AdminId === userId.toString()) {
        Edit = true;
    }

    const Author = await findUserById(problemFound.AdminId);

    return {
        problem: problemFound,
        Edit,
        Author: Author?.Name || "Unknown",
    };
};

const setProblem = async (userId, userIsAdmin, { Title, Description, Deficulty, Constraint, Example, Company, Topic }) => {
    if (userIsAdmin === false) {
        const error = new Error("User is not an Admin");
        error.status = 409;
        throw error;
    }
    const zodPass = ProblemType.safeParse({ Title, Description, Deficulty, Constraint, Example, Company, Topic });
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }

    const topic = Topic.split(",").map((t) => t.trim()) || [];
    const company = Company.split(",").map((t) => t.trim()) || [];

    const problemSet = await createProblem(Title, Description, Deficulty, Constraint, Example, company, topic, userId);

    return { msg: "Problem added", _id: problemSet._id };
};

module.exports = {
    allProblem,
    codeSubmitProblem,
    deleteProblem,
    editProblem,
    problemById,
    setProblem,
};
