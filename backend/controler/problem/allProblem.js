
const { Problem } = require("../../db");


const allProblem = async (req, res) => {
    try { 
        //from middleware
        const Problems = await Problem.find({})
        res.status(200).json({ Problems });
    } catch (e) {
        console.error("finding problems failed with error:", e);
        res.status(500).json({ msg: "finding problems failed with error" });
    }
};

module.exports = allProblem
