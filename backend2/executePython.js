const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executePython = (filepath, inputPath) => {

  return new Promise((resolve, reject) => {
    const process = exec(
      `python ${filepath}  < ${inputPath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr });
        }
        if (stderr) {
          reject(stderr);
        }
        resolve(stdout);
      }
    );
    if (input) {
      process.stdin.write(input);
      process.stdin.end();
    }
  });
};

module.exports = executePython