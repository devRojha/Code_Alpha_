
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {z} = require("zod");
const {User} = require("../../db");
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

const signinType = z.object({
    Email : z.string().email(),
    Password : z.string().min(6)
})

const UserSignin = async (req, res) => {
    const { Email, Password } = req.body;

    const zodPass = signinType.safeParse({ Email, Password });
    if(!zodPass.success){
        res.status(409).json({msg: "input Validation"})
        return
    }
    try {
        const userFind = await User.findOne({ Email });

        if (userFind) {
            // Compare the hashed password with the plaintext password
            const passwordMatch = await bcrypt.compare(Password, userFind.Password);

            if (passwordMatch) {
                const payload = { userId: userFind._id };
                const Token = jwt.sign(payload, secretKey);
                res.status(200).json({ Token });
            } else {
                res.status(401).json({ msg: "Invalid email or password" });
            }
        } else {
            res.status(401).json({ msg: "Invalid email or password" });
        }
    } catch (e) {
        console.error("Signin failed with error:", e);
        res.status(500).json({ msg: "Signin failed with error" });
    }
};

module.exports = UserSignin
