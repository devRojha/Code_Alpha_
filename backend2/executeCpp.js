
const fs = require("fs");
const path = require("path");
const {v4:uuid} = require("uuid")

const outputPath = path.join(__dirname, "outputs") 
if(!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath, {recursive:true})
}
 
const executeCpp = (filePath)=>{
    // filePath =" /Users/devrajkumar/Desktop/Code/Online_Judge_/backend2/codes/b2d12f8e-b05a-45d6-978c-e78dfae347ea.cpp"
    const jobId = path.basename(filePath).split(".")[0]; // b2d12f8e-b05a-45d6-978c-e78dfae347ea
    const fileName = `${jobId}.out`;
    const outputFilePath = path.join(outputPath , fileName);
    // fs.writeFileSync(outputFilePath, "kfmkdlfdf");
    return outputFilePath
}

module.exports = executeCpp