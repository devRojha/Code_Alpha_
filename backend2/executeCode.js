
const fs = require("fs");
const executeCpp = require("./executeCpp");
const executeJava = require("./executeJava");
const executePython = require("./executePython");

const executeCode = (filePath, lang , inputPath)=>{
    try{
        let output;
        if(lang === "cpp"){
            output = executeCpp(filePath , inputPath);
        }
        else if(lang == "java"){
            output = executeJava(filePath , inputPath);
        }
        else{
            output = executePython(filePath , inputPath);
        }
        return output;
    }
    catch (error) {
        throw new Error(`Error executing ${language} code: ${error.message}`);
    }
}

module.exports = executeCode