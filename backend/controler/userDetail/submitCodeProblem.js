


const {z} = require("zod");
const { User } = require("../../db");


const ProblemType = z.object({
    code : z.string(),
    lang:  z.string(),
    status:  z.string(),
    problemId : z.string(),
})

const submitCodeProblem = async (req, res) => {
    const { code, lang, status, problemId } = req.body;
    const zodPass = ProblemType.safeParse({ code, lang, status, problemId });
    if(!zodPass.success){
        res.status(409).json({msg: "input Validation on code submission on problem side"})
        return
    }
    const userId = req.userId;
    try { 
        const date = new Date();
        const userData = await User.findByIdAndUpdate(
            {_id : userId},
            {$push:{SubmitCode: {
                date,
                problemId,
                code,
                lang, 
                status, 
            }}}
        )
        res.status(200).json({ userData });
    } catch (e) {
        console.error("submit code set failed with error:", e);
        res.status(500).json({ msg: "submit code set failed with error by user side" });
    }
};

module.exports = submitCodeProblem
