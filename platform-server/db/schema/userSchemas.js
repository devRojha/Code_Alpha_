const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true
    },
    ProblemCode:{
        type: [{
            problemId:{
                type: String
            },
            lang:{
                type: String
            },
            code:{
                type: String
            }
        }],
        default:[]
    },
    SubmitCode:{
        type: [{
            problemId:{
                type: String,
                required:true
            },
            lang:{
                type: String,
                required:true
            },
            code:{
                type: String,
                required:true
            },
            status:{
                type: String,
                default: "fail"
            },
            date:{
                type : String,
                required:true
            }
        }],
        default:[]
    },
    ProblemSolved: {
        type: [String], // Assuming the problems are stored as an array of strings
        default: []
    },
    ContestSolved: {
        type: [String], // Assuming the problems are stored as an array of strings
        default: []
    },
    ContestAttempt: {
        type: [String], // Assuming the problems are stored as an array of strings
        default: []
    },
    Admin:{
        type : Boolean,
        default : false
    }
});

module.exports = UserSchema
