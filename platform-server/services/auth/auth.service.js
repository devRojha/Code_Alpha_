
const { findOTP } = require("../../repositories/otp.repository");
const { findUser, createUser } = require("../../repositories/user.repository");

const { matchHashedPassword, generateHashedPassword } = require("../../utils/hashing/password");
const { generateToken } = require("../../utils/Token/jwt");
const { signinType, adminSignupType, userSignupType } = require("../../utils/zod/authType");

const adminSignin = async ({ Email, Password }) => {
    const zodPass = signinType.safeParse({ Email, Password });
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }
    const uniqueParam = {Email : Email}
    const userFind = await findUser( uniqueParam );
    if (!userFind || !userFind.Admin) {
        const error = new Error("Invalid email");
        error.status = 401;
        throw error;
    }
    const passwordMatch = await matchHashedPassword(Password, userFind.Password);

    if (!passwordMatch) {
        const error = new Error("Invalid password");
        error.status = 401;
        throw error;
    }

    const payload = { userId: userFind._id };
    const Token = generateToken(payload);
    return { Token };
};

const adminSignup = async ({ Name, Email, Password, AdminSecret, OTP}) => {
    const zodPass = adminSignupType.safeParse({ Name, Email, Password, AdminSecret, OTP});
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }

    const uniqueParam = {Email : Email}
    const userFind = await findUser( uniqueParam );
    if (userFind || AdminSecret !== process.env.ADMIN_SECRET) {
        const error = new Error("Admin already exists or invalid secret");
        error.status = 409;
        throw error;
    }
    const getOTP = await findOTP( Email );

    if (!getOTP || getOTP.OTP !== OTP) {
        const error = new Error("OTP not found or invalid");
        error.status = 404;
        throw error;
    }

    const hashedPassword = await generateHashedPassword(Password);
    
    // create user
    const Admin = true;
    const newUser = await createUser(Name, Email, hashedPassword, Admin);

    const payload = { userId: newUser._id };
    const Token = generateToken(payload);
    return { Token };
};

const userSignin = async ({ Email, Password }) => {
    const zodPass = signinType.safeParse({ Email, Password });
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }

    const uniqueParam = {Email : Email}
    const userFind = await findUser( uniqueParam );
    if (!userFind) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    const passwordMatch = await matchHashedPassword(Password, userFind.Password);
    if (!passwordMatch) {
        const error = new Error("Invalid email or password");
        error.status = 401;
        throw error;
    }

    const payload = { userId: userFind._id };
    const Token = generateToken(payload);
    return { Token };
};

const userSignup = async ({ Name, Email, Password, OTP }) => {
    const zodPass = userSignupType.safeParse({ Name, Email, Password, OTP });
    if (!zodPass.success) {
        const error = new Error("Input validation failed");
        error.status = 409;
        throw error;
    }
    const uniqueParam = {Email : Email}
    const userFind = await findUser( uniqueParam );
    if (userFind) {
        const error = new Error("User already exists");
        error.status = 409;
        throw error;
    }

    const getOTP = await findOTP(Email);
    if (!getOTP || getOTP.OTP !== OTP) {
        const error = new Error("OTP not found or invalid");
        error.status = 404;
        throw error;
    }

    const hashedPassword = await generateHashedPassword(Password);

    const admin = false;
    // create user
    const newUser = await createUser(Name, Email, hashedPassword, admin)

    const payload = { userId: newUser._id };
    const Token = generateToken(payload);
    return { Token };
};

module.exports = {
    adminSignin,
    adminSignup,
    userSignin,
    userSignup,
};
