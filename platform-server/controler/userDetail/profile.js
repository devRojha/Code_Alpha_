const { User, Problem } = require("../../db")


const profile = async (req , res)=>{
    const userId = req.userId
    try{
        const userFound = await User.findOne({_id:userId});
        var solvedProblem = [];
        for(var i = 0 ; i < userFound.ProblemSolved.length ; i++){
            const problem = await Problem.findOne({_id: userFound.ProblemSolved[i]});
            if(problem){
                solvedProblem.push(problem);
            }
        }
        if(userFound){
            res.status(200).json({
                _id: userFound._id,
                Name: userFound.Name,
                Email: userFound.Email,
                ProblemSolved: solvedProblem,
                ProblemCode : userFound.ProblemCode,
                ContestSolved: [],
                SubmitCode : userFound.SubmitCode,
                Admin: true,
            });
        }
    }
    catch (e) {
        console.log("Error while getting user details: " + e);
        return res.status(500).json({ msg: "Error while getting user details" });
    }
}

module.exports = profile