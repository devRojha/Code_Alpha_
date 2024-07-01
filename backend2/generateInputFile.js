
const fs = require("fs");
const path = require("path");
const {v4:uuid} = require("uuid")

const dirFile = path.join(__dirname, "inputs")  // backend2 --> appends --> inputs
if(!fs.existsSync(dirFile)){
    fs.mkdirSync(dirFile, {recursive:true})
}

const generateInputFile = (input)=>{
    const jobId = uuid() ;
    // console.log(jobId);
    const fileName = `${jobId}.txt`; //a408599a-cc38-4931-b783-245ae3371e28.cpp
    const filePath = path.join(dirFile , fileName);
    fs.writeFileSync(filePath, input);
    return filePath
}


module.exports = generateInputFile