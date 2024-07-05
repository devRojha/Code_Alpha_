
const {z} = require("zod");
const { Problem } = require("../../db");


const ProblemType = z.object({
    Title : z.string().min(2),
    Description: z.string().min(6),
    Deficulty: z.string().min(2),
    Example: z.optional(z.string(6)),
    Company: z.optional(z.string()),
    Constraint: z.optional(z.string()),
    Topic: z.optional(z.string())
})

const setProblem = async (req, res) => {
    const { Title, Description, Deficulty, Constraint, Example, Company, Topic } = req.body;
    const zodPass = ProblemType.safeParse({ Title, Description, Deficulty, Constraint, Example, Company, Topic });
    if(!zodPass.success){
        res.status(409).json({msg: "input Validation"})
        return
    }
    try { 
        //from middleware
        const topic = Topic.split(",").map(t => t.trim()) || [];
        const compnay = Company.split(",").map(t => t.trim()) || [];
        const userId = req.userId
        const ProblemSet = await Problem.create({
            Title,
            Description,
            Deficulty,
            Constraint,
            Example, 
            Company: compnay, 
            Topic:topic,
            AdminId : userId,
        })
        res.status(200).json({ ProblemSet });
    } catch (e) {
        console.error("Problem set failed with error:", e);
        res.status(500).json({ msg: "Problem set failed with error" });
    }
};

module.exports = setProblem
