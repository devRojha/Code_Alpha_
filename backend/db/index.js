const mongoose = require("mongoose")
const userSchema = require("./schema/userSchemas");
const problemSchema = require("./schema/ProblemSchema");

require('dotenv').config();

const dbURL = process.env.DB_URL;

// Connect to MongoDB
mongoose.connect(dbURL)
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error', err);
});


// Create the User model
const User = mongoose.model('User', userSchema);
const Problem = mongoose.model('Problem', problemSchema);


module.exports =  { User, Problem };
