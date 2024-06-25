const { User } = require("../../db");





const allProblem = async (req, res) => {
    try { 
        //from middleware
        const userId = "667965788ae0099cc273cbb8";
        const userFind = await User.findOne({_id : userId});
        res.status(200).json({
            "ProblemSolved": userFind.ProblemSolved,
            "ProblemAttempt" : userFind.ProblemAttempt
        });
    } catch (e) {
        console.error("finding user failed with error:", e);
        res.status(500).json({ msg: "finding user failed with error" });
    }
};

module.exports = allProblem
