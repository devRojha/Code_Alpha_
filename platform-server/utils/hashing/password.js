const bcrypt = require("bcryptjs");


const generateHashedPassword = async (Password) => {
    return bcrypt.hash(Password, 10);
}

const matchHashedPassword = async (Password, hashedPassword) => {
    return bcrypt.compare(Password, hashedPassword);
}


module.exports  = {
    generateHashedPassword,
    matchHashedPassword
}