const express = require("express");
const generateFile = require("./generateFile");
const executeCpp = require("./executeCpp");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post("/run", async (req , res)=>{
    const { code, lang="cpp" } = req.body;
    if(code === undefined || !(code.length > 0)){
        return res.status(400).json({success : "false" , message:"empty code"})
    }
    try{
        const filePath = generateFile(lang , code);
        const output = executeCpp(filePath);
        return res.status(200).json({filePath, output})
        // res.status(200).json({code, lang})
    }
    catch(e){
        return res.status(500).json({success : "false" , message:"Error" + e.message})
    }
})

app.listen(8000 , ()=>console.log("backend 2 online on 8000 "))