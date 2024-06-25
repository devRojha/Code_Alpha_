
const {z} = require("zod");
const { Problem } = require("../../db");


const ProblemType = z.object({
    Title : z.string().min(2),
    Description: z.string().min(6),
    Deficulty: z.string().min(2),
})

const setProblem = async (req, res) => {
    const { Title, Description, Deficulty, Constraint } = req.body;
    const zodPass = ProblemType.safeParse({ Title, Description, Deficulty });
    if(!zodPass.success){
        res.status(409).json({msg: "input Validation"})
        return
    }
    try { 
        //from middleware
        const userId = "2";
        const ProblemSet = await Problem.create({
            Title,
            Description,
            Deficulty,
            Constraint,
            AdminId : userId,
        })
        res.status(200).json({ ProblemSet });
    } catch (e) {
        console.error("Problem set failed with error:", e);
        res.status(500).json({ msg: "Problem set failed with error" });
    }
};

module.exports = setProblem
