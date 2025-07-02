

const { TestCases } = require("../../db");

const deletetestcases = async (req, res) => {
    const {problemid} = req.headers;
    try { 
        await TestCases.deleteOne({ ProblemId : problemid});
        res.status(200).json({ msg: "test case deleted" });
    } catch (e) {
        console.error("test case delete failed with error:", e);
        res.status(500).json({ msg: "test case  delete failed with error" });
    }
};

module.exports = deletetestcases
