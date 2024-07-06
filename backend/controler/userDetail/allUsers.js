const { User, Problem } = require("../../db")


const allUsers = async (req , res)=>{
    // const userId = req.userId
    try{
        const alluserFound = await User.find({});
        var allUsers = [];
        if(alluserFound){
            for(var i = 0 ; i < alluserFound.length ; i++){
                let lang = "cpp";
                const n = (alluserFound[i].SubmitCode.length - 1);
                for(var k = n ; k >= 0 ; k--){
                    if(alluserFound[i].SubmitCode[k] === "success"){
                        lang = alluserFound[i].SubmitCode[k].lang;
                        break;
                    }
                }
                allUsers.push({
                    _id: alluserFound[i]._id,
                    Name:alluserFound[i].Name, 
                    Email: alluserFound[i].Email,
                    ProblemSolved: alluserFound[i].ProblemSolved, 
                    lang,
                })
            }
            res.status(200).json({
                allUsers
            });
        }
        else{
            res.status(404).json({msg: "No any users"})
        }
    }
    catch (e) {
        console.log("Error while getting user details: " + e);
        return res.status(500).json({ msg: "Error while getting user details" });
    }
}

module.exports = allUsers