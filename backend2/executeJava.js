const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const cleanup = (files) => {
  files.forEach((file) => fs.existsSync(file) && fs.unlinkSync(file));
};

const executeJava = (filepath, inputPath) => {
  const dirPath = path.dirname(filepath);
  const tempFilePath = path.join(dirPath, "Main.java");

  return new Promise((resolve, reject) => {
    // Set a timeout to handle long-running processes
    const timeoutId = setTimeout(() => {
      cleanup([filepath, inputPath, tempFilePath]);
      reject("Time Limit Exceeded");
    }, 4000);

    // Rename the file to Main.java
    fs.rename(filepath, tempFilePath, (renameErr) => {
      if (renameErr) {
        clearTimeout(timeoutId);
        return reject({ error: renameErr });
      }

      // Compile the Java file
      exec(`javac ${tempFilePath}`, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
          cleanup([inputPath, tempFilePath]);
          clearTimeout(timeoutId);
          return reject({ error: compileError, stderr: compileStderr });
        }

        // Construct the command to run the compiled Java class
        let command = `java -cp ${dirPath} Main`;
        if (inputPath) {
          command += ` < ${inputPath}`;
        }

        // Execute the Java class
        exec(command, (runError, stdout, stderr) => {
          clearTimeout(timeoutId);
          if (runError) {
            cleanup([inputPath, tempFilePath]);
            fs.rename(tempFilePath, filepath, (cleanupErr) => {
              if (cleanupErr) {
                return reject({ error: cleanupErr });
              }
              return reject({ error: runError, stderr });
            });
          } else if (stderr) {
            cleanup([inputPath, tempFilePath]);
            fs.rename(tempFilePath, filepath, (cleanupErr) => {
              if (cleanupErr) {
                return reject({ error: cleanupErr });
              }
              return reject(stderr);
            });
          } else {
            // Clean up: Rename the file back to its original name
            fs.rename(tempFilePath, filepath, (cleanupErr) => {
              if (cleanupErr) {
                return reject({ error: cleanupErr });
              }
              cleanup([filepath, inputPath]);
              resolve(stdout);
            });
          }
        });
      });
    });
  });
};

module.exports = executeJava;
