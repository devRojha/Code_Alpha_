const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const executeJava = (filepath, inputPath) => {
  const dirPath = path.dirname(filepath);
  const tempFilePath = path.join(dirPath, "Main.java");

  return new Promise((resolve, reject) => {
    // Rename the file to Main.java
    fs.rename(filepath, tempFilePath, (renameErr) => {
      if (renameErr) {
        return reject({ error: renameErr });
      }

      // Compile the Java file
      exec(
        `javac ${tempFilePath}`,
        (compileError, compileStdout, compileStderr) => {
          if (compileError) {
            return reject({ error: compileError, stderr: compileStderr });
          }

          // Construct the command to run the compiled Java class
          let command = `java -cp ${dirPath} Main`;
          if (inputPath) {
            command += ` < ${inputPath}`;
          }

          // Execute the Java class
          exec(command, (runError, stdout, stderr) => {
            if (runError) {
              reject({ error: runError, stderr });
            }
            else if (stderr) {
              reject(stderr);
            }
            else{
              // Clean up: Rename the file back to its original name
              fs.rename(tempFilePath, filepath, (cleanupErr) => {
                if (cleanupErr) {
                  reject({ error: cleanupErr });
                }
                resolve(stdout);
              });
            }
          });
        }
      );
    });
  });
};

module.exports = executeJava