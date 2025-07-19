const { User } = require('../models/index')


const findUser = async (uniqueParam) => {
    const userFind  = await User.findOne( uniqueParam );
    return userFind;
}

const findUserById = async (userId) => {
    const userFind  = await User.findOne({ _id : userId });
    return userFind;
}

const findAllUser = async () => {
    const alluserFound = await User.find({}).select(" -Password ");
    return alluserFound;
}

const createUser = async (Name, Email, Password, Admin) => {
    console.log({Name, Email, Password, Admin})
    const newUser = await User.create({
        Name,
        Email,
        Password,
        Admin,
    });
    return newUser;
}

const UpdateUsersSubmisionById = async ( user ) => {
    if (user.problemId && user.submission) {
        await User.findByIdAndUpdate(
            user.userId,
            { $push: { 
                SubmitCode: user.submission,
                ProblemSolved: user.problemId 
            } }
        );
    }
    else if (user.problemId) {
        await User.findByIdAndUpdate(
            user.userId,
            { $push: { 
                ProblemSolved: user.problemId 
            } }
        );
    }
    else if (user.submission) {
        await User.findByIdAndUpdate(
            user.userId,
            { $push: { 
                SubmitCode: user.submission,
            } }
        );
    }
    return null;
}

const updateUserById = async (userId, updateData) => {
    await User.findByIdAndUpdate(userId, updateData);
    return null;
}

const deleteUserById = async (userId) => {
    await User.deleteOne({ _id: userId });
    return null;
}







module.exports = {
    findUser,
    findUserById,
    findAllUser,
    createUser,
    UpdateUsersSubmisionById,
    updateUserById,
    deleteUserById
}