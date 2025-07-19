
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;


const generateToken = (payload) => {
    return jwt.sign(payload, secretKey);
}

const matchToken = () => {

}

module.exports = {
    generateToken,
    matchToken
}