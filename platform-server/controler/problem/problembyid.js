const { Problem, User } = require("../../db")



const problembyid =async (req , res)=>{
    const id = req.headers.id;
    const userId = req.userId.toString();
    
    try{
        const problemFound = await Problem.findById(id);
        if(!problemFound){
            return res.status(404).json({msg : "problem not found"});
        }
        var Edit = "false"
        if(problemFound.AdminId === userId){
            Edit = "true";
        }
        const Author = await User.findOne({_id : problemFound.AdminId}).select("Name");
        return res.status(200).json({problem : problemFound, Edit, "Author" : Author.Name});
    }
    catch(e){
        console.log("failed find single problem" + e);
        res.status(404).json({msg:"failed find single problem"})
    }
}




module.exports = problembyid