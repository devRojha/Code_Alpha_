const { Problem } = require('../models/index')


const findProblemById = async (id) => {
    const problem = await Problem.findById(id);
    return problem;
}

const findAllProblem = async () => {
    const problems = await Problem.find({});
    return problems;
}

const createProblem = async (Title, Description, Deficulty, Constraint, Example, Company, Topic, AdminId) => {
    const problemSet = await Problem.create({
        Title,
        Description,
        Deficulty,
        Constraint,
        Example,
        Company,
        Topic,
        AdminId,
    });
    return problemSet;
}

const deleteProblemById = async (id) => {
    await Problem.deleteOne({ _id: id });
}

const updateProblemSubmit = async (problemId, date, userId, userName, code, lang, status) => {
    const problemSet = await Problem.updateOne(
        { _id: problemId },
        {
            $push: {
                TotalSubmit: {
                    date,
                    userId,
                    userName,
                    code,
                    lang,
                    status,
                },
            },
        }
    );
    return problemSet;
};

const updateProblemById = async (id, Title, Description, Deficulty, Constraint, Example, Company, Topic) => {
    const problemSet = await Problem.updateOne(
        { _id: id },
        {
            Title,
            Description,
            Deficulty,
            Constraint,
            Example,
            Company,
            Topic,
        }
    );
    return problemSet;
}

module.exports = {
    findProblemById,
    findAllProblem,
    createProblem,
    deleteProblemById,
    updateProblemSubmit,
    updateProblemById,
}