
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../db");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const signupType = z.object({
    Name: z.string().min(3),
    Email : z.string().email(),
    Password : z.string().min(6)
})


const UserSignup = async (req, res) => {
    const { Name, Email, Password } = req.body;
    
    const zodPass = signupType.safeParse({ Name, Email, Password });
    if(!zodPass.success){
        res.status(409).json({msg: "input Validation"})
        return
    }
    try {
        // Check if the user already exists
        const userFind = await User.findOne({ Email });

        if (!userFind) {
            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(Password, 10); // 10 is the salt rounds

            const newUser = await User.create({
                Name,
                Email,
                Password: hashedPassword
            });

            const payload = { userId: newUser._id };
            const Token = jwt.sign(payload, secretKey);
            res.status(200).json({ Token });
        } else {
            res.status(409).json({ msg: "User already exists" });
        }
    } catch (e) {
        console.error("Signup failed with error:", e);
        res.status(500).json({ msg: "Signup failed with error" });
    }
};

module.exports = UserSignup 