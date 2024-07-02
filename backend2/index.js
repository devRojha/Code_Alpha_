const express = require("express");
const cors = require("cors");
const executeCode = require("./executeCode");
const generateInputFile = require("./generateInputFile");
const generateCodeFile = require("./generateCodeFile");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/run", async (req , res)=>{
    const { code, lang="cpp", input } = req.body;
    if(code === undefined || !(code.length > 0)){
        return res.json({success : "false" , message:"empty code"})
    }
    try{
        const filePath = generateCodeFile(lang , code);
        const inputPath = generateInputFile(input);
        const output = await executeCode(filePath,lang, inputPath);
        return res.status(200).json({success:"true", output})
        // res.status(200).json({code, lang})
    }
    catch(e){
        return res.status(500).json({success : "false" , message: e})
    }
})

app.post("/submit" , async (req , res)=>{
    const {code , lang="cpp" , testCases} = req.body;
    if(code === undefined || !(code.length > 0)){
        return res.status(200).json({success : "false" , message:"empty code"})
    }
    console.log(testCases)
    const filePath = generateCodeFile(lang , code);
    var result = [];
    let i = 0;
    for(i =0 ;i < testCases.length ; i++){
        try{
            const inputPath = generateInputFile(testCases[i]);
            const output = await executeCode(filePath , lang , inputPath);
            result.push(output);
        }
        catch(e){
            result.push(e);
            const testCase = (i+1)
            return res.status(500).json({success : "false" , testCase , output: result})
        }
    }
    if(i == testCases.length){
        return res.status(200).json({success:"true", output: result});
    }
})

app.listen(8000 , ()=>console.log("backend 2 online on 8000 "))