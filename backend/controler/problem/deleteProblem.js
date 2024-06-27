

const { Problem } = require("../../db");

const deleteProblem = async (req, res) => {
    const id = req.headers.id;
    try { 
        await Problem.deleteOne({_id : id});
        res.status(200).json({ msg: "problem deleted" });
    } catch (e) {
        console.error("Problem delete failed with error:", e);
        res.status(500).json({ msg: "Problem delete failed with error" });
    }
};

module.exports = deleteProblem
