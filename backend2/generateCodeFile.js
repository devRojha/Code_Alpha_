
const fs = require("fs");
const path = require("path");
const {v4:uuid} = require("uuid")

const dirCodes = path.join(__dirname, "codes")  // backend2 --> appends --> codes
if(!fs.existsSync(dirCodes)){
    fs.mkdirSync(dirCodes, {recursive:true})
}

const generateCodeFile = (lang , code)=>{
    const jobId = uuid() ;
    // console.log(jobId);
    const fileName = `${jobId}.${lang }`; //a408599a-cc38-4931-b783-245ae3371e28.cpp
    const filePath = path.join(dirCodes , fileName);
    fs.writeFileSync(filePath, code);
    return filePath
}


module.exports = generateCodeFile