const express = require("express");
const cors = require("cors");
const executeCode = require("./executeCode");
const generateInputFile = require("./generateInputFile");
const generateCodeFile = require("./generateCodeFile");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/run", async (req, res) => {
    const { code, lang = "cpp", input } = req.body;
    if (code === undefined || !(code.length > 0)) {
        return res.status(400).json({ success: "false", message: "empty code" });
    }
    try {
        const filePath = await generateCodeFile(lang, code);
        const inputPath = await generateInputFile(input);
        const data = await executeCode(filePath, lang, inputPath);
        return res.status(200).json({ success: "true", output: data.output, time: data.executionTimeSec });
    } catch (e) {
        // console.log(e)
        return res.status(500).json({ success: "false", message: e.message});
    }
});

app.post("/submit" , async (req , res)=>{
    const {code , lang="cpp" , testCases} = req.body;
    if(code === undefined || !(code.length > 0)){
        return res.status(404).json({success : "false" , message:"empty code"})
    }
    // console.log(testCases)
    // const filePath = generateCodeFile(lang , code);
    var result = [];
    let i = 0;
    var time = 0.0;
    for(i =0 ;i < testCases.length ; i++){
        try{
            const filePath = await generateCodeFile(lang , code);
            const inputPath = await generateInputFile(testCases[i]);
            const data = await executeCode(filePath , lang , inputPath);
            result.push(data.output);
            time += parseFloat(data.executionTimeSec);
        }
        catch(e){
            result.push(e.message);
            const testCase = (i+1);
            return res.status(500).json({success : "false" , testCase , output: result})
        }
    }
    if(i == testCases.length){
        return res.status(200).json({success:"true", output: result, time: time});
    }
})

app.listen(8000 , ()=>console.log("backend 2 online on 8000 "))