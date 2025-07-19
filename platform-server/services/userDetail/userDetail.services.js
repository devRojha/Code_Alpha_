
const { codeSubmitType } = require("../../utils/zod/problemType");
const { generateHashedPassword } = require("../../utils/hashing/password");
const { findAllUser, findUserById, updateUserById, UpdateUsersSubmisionById, findUser, deleteUserById } = require("../../repositories/user.repository");
const { findProblemById } = require("../../repositories/problem.repository");

const allUsers = async () => {
    const alluserFound = await findAllUser();
    let allUsers = [];

    if (alluserFound.length === 0) {
        const error = new Error("No users found");
        error.status = 404;
        throw error;
    }

    for (const user of alluserFound) {
        let lang = "cpp";
        const n = user.SubmitCode.length - 1;
        for (let k = n; k >= 0; k--) {
            if (user.SubmitCode[k]?.status === "success") {
                lang = user.SubmitCode[k].lang;
                break;
            }
        }
        allUsers.push({
            _id: user._id,
            Name: user.Name,
            Email: user.Email,
            ProblemSolved: user.ProblemSolved,
            lang,
        });
    }

    return { allUsers };
};

const deleteUser = async (userId) => {
    await deleteUserById(userId);
    return { msg: "User deleted" };
};

const profile = async (userId) => {
    const userFound = await findUserById(userId);
    if (!userFound) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    let solvedProblem = [];
    for (const id of userFound.ProblemSolved) {
        const problem = await findProblemById(id);
        if (problem) solvedProblem.push(problem);
    }

    return {
        _id: userFound._id,
        Name: userFound.Name,
        Email: userFound.Email,
        ProblemSolved: solvedProblem,
        ProblemCode: userFound.ProblemCode,
        SubmitCode: userFound.SubmitCode,
        Admin: true,
    };
};

const allProblem = async (userId) => {
    const userFind = await findUserById(userId);
    if (!userFind) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    return {
        ProblemSolved: userFind.ProblemSolved,
    };
};

const submitCodeProblem = async (userId, { code, lang, status, problemId }) => {
    const zodPass = codeSubmitType.safeParse({ code, lang, status, problemId });
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }

    const userData = await findUserById(userId);
    if (!userData) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const submission = {
        date: new Date(),
        problemId,
        code,
        lang,
        status,
    };

    if (status === "success") {
        const alreadySolved = userData.ProblemSolved.join(" ").includes(problemId);
        if (!alreadySolved) {
            // adding problemid into problem solved and data into submit code
            await UpdateUsersSubmisionById({userId, submission, problemId})
        }
        else {
            await UpdateUsersSubmisionById({userId, submission});
        }
    } 
    else {
        await UpdateUsersSubmisionById({userId, submission});
    }

    return { msg: "Code submission added successfully" };
};

const updateUser = async (userId, { Name, Email }) => {
    if (Email) {
        const uniqueParam = {Email : Email}
        const found = await findUser( uniqueParam );
        if (found.length > 0) {
            return { msg: "Email already exists" };
        }
    }

    const updateData = {};
    if (Name) updateData.Name = Name;
    if (Email) updateData.Email = Email;

    if (Object.keys(updateData).length === 0) {
        return { msg: "No fields provided for update" };
    }

    await updateUserById(userId, updateData);
    return { msg: "User updated" };
};

const updateProblemSolved = async (userId, problemId) => {
    await UpdateUsersSubmisionById({ userId, problemId });
    return { msg: "Problem ID stored in solved" };
};

const updateProblemCode = async (userId, { problemId, code, lang }) => {
    const user = await findUserById(userId);
    if (!user) {
        const error = new Error("User not found");
        error.status = 404;
        throw error;
    }

    const problemIndex = user.ProblemCode.findIndex(p => p.problemId === problemId);

    if (problemIndex !== -1) {
        user.ProblemCode[problemIndex].code = code;
        user.ProblemCode[problemIndex].lang = lang;
    } else {
        user.ProblemCode.push({ problemId, code, lang });
    }
    const updateData = {ProblemCode : user.ProblemCode};
    await updateUserById(userId, updateData);
    return { message: "Problem code updated successfully", code, lang };
};

const updateUserPassword = async ({ id, Password }) => {
    const hashedPassword = await generateHashedPassword(Password);
    const updateData = {Password : hashedPassword};
    const userId = id;
    await updateUserById(userId , updateData);
    return { msg: "Password updated" };
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
    updateUserPassword,
};
