const mongoose = require("mongoose")

const ProblemSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Topic:{
        type: [{type: String}],
        default:[]
    },
    Company:{
        type: [{type: String}],
        default:[]
    },
    Description: {
        type: String,
        required: true
    },
    Example:{
        type: String,
    },
    Deficulty: {
        type: String, 
        required: true
    },
    Constraint: {
        type: String, 
        required: false
    },
    TotalSubmit: {
        type: [{
            date:{
                type: String,
                required: true
            },
            userId:{
                type: String,
                required: true
            },
            userName:{
                type: String,
                required: true
            },
            lang:{
                type: String,
                required: true
            },
            status:{
                type: String,
                default: "fail"
            },
            code:{
                type: String,
                required: true
            }
        }],
        default:[]
    },
    AcceptSubmit:{
        type: Number,
        default: 0
    },
    AdminId:{
        type : String,
        required : false
    }
});

module.exports = ProblemSchema
