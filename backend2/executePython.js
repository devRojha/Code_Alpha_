
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const { stdout, stdin, stderr } = require("process");

const outputPath = path.join(__dirname, "outputs") 
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive:true});
}
 
const executePython = (filePath)=>{
    // filePath =" /Users/devrajkumar/Desktop/Code/Online_Judge_/backend2/codes/b2d12f8e-b05a-45d6-978c-e78dfae347ea.cpp"
    const jobId = path.basename(filePath).split(".")[0]; // b2d12f8e-b05a-45d6-978c-e78dfae347ea
    const fileName = `${jobId}.out`;
    const outputFilePath = path.join(outputPath , fileName);
    // fs.writeFileSync(outputFilePath, "kfmkdlfdf");

    return new Promise((resolve , reject)=>{
        exec(
            `g++ ${filePath} -o ${outputFilePath} && cd ${outputPath} && ./${fileName}`
            , (error, stdout , stderr)=>{
            if(error){
                reject(error);
            }
            else if(stderr){
                reject(stderr);
            }
            else{
                resolve(stdout)
            }
        });
    });
    
}

module.exports = executePython