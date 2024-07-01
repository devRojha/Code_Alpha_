const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { stdout, stdin, stderr } = require("process");

const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = (filePath, inputPath) => {
    const jobId = path.basename(filePath).split(".")[0];
    const fileName = `${jobId}.out`;
    const outputFilePath = path.join(outputPath, fileName);

    return new Promise((resolve, reject) => {
        exec(
            `g++ -std=c++11  ${filePath} -o ${outputFilePath} && cd ${outputPath} && ./${fileName} < ${inputPath}`
            ,(error, stdout, stderr) => {
                if (error) {
                    console.error('Compilation error:', error);
                    reject(`Compilation ${error}`);
                } else if (stderr) {
                    console.error('Runtime Error:', stderr);
                    reject(`Runtime Error ${stderr}`);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}

module.exports = executeCpp;
