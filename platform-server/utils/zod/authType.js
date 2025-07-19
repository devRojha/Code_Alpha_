
const {z} = require("zod");


const adminSignupType = z.object({
    Name: z.string().min(3),
    Email : z.string().email(),
    Password : z.string().min(6),
    AdminSecret : z.string().min(10),
    OTP : z.string().length(6)
})


const signinType = z.object({
    Email : z.string().email(),
    Password : z.string().min(6)
})


const userSignupType = z.object({
    Name: z.string().min(3),
    Email : z.string().email(),
    Password : z.string().min(6),
    OTP : z.string().length(6)
})


module.exports = {
    adminSignupType,
    userSignupType,
    signinType
}