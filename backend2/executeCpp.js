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
            `g++ ${filePath} -o ${outputFilePath} && cd ${outputPath} && ./${fileName} < ${inputPath}`
            , (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                } else if (stderr) {
                    reject(stderr);
                } else {
                    resolve(stdout);
                }
            }
        );
    });
}

module.exports = executeCpp;
