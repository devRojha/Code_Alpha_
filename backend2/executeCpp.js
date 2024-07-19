const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const cleanup = (files) => {
    files.forEach((file) => fs.existsSync(file) && fs.unlinkSync(file));
};

const executeCpp = (filePath, inputPath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const fileName = `${jobId}.out`;
    const outputFilePath = path.join(outputPath, fileName);

    return new Promise((resolve, reject) => {

        // const timeoutId = setTimeout(() => {
        //     cleanup([filePath, outputFilePath, inputPath]);
        //     reject("Time Limit Exceeded");
        // }, 4000);

        exec(
            `g++ -std=c++11 ${filePath} -o ${outputFilePath} && cd ${outputPath} && ./${fileName} < ${inputPath}`,
            (error, stdout, stderr) => {
                cleanup([filePath, outputFilePath, inputPath]);
                // clearTimeout(timeoutId);
                if (error) {
                    console.error('Compilation error:', error);
                    reject(`Error: ${error.message}`);
                } else if (stderr) {
                    console.error('Runtime Error:', stderr);
                    reject(`Runtime Error: ${stderr}`);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}

module.exports = executeCpp;
