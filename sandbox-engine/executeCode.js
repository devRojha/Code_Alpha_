const fs = require("fs");
const executeCpp = require("./executeCpp");
const executeJava = require("./executeJava");
const executePython = require("./executePython");
const { performance } = require("perf_hooks");

const executeCode = async (filePath, lang, inputPath) => {
    const start = performance.now();
    try {
        let output;
        if (lang === "cpp") {
            output = await executeCpp(filePath, inputPath);
        } else if (lang === "java") {
            output = await executeJava(filePath, inputPath);
        } else {
            output = await executePython(filePath, inputPath);
        }
        const end = performance.now();
        const executionTimeSec = ((end - start) / 1000).toFixed(2);
        return { output, executionTimeSec };
    } catch (error) {
        const end = performance.now();
        const executionTimeSec = ((end - start) / 1000).toFixed(2);
        console.log(`Execution time: ${executionTimeSec} seconds`);
        if(lang === "cpp"){
            throw new Error(`Error executing ${lang} code: ${error}`);
        }else{
            throw new Error(`Error executing ${lang} code: ${error.error}`);
        }
    }
};

module.exports = executeCode;
