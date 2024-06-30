const { TestCases } = require("../../db");

const addtestcases = async (req, res) => {
    const userId = req.userId;
    const { problemId, Cases } = req.body;

    try {
        // Check if test cases already exist for the problemId
        let testCase = await TestCases.findOne({ ProblemId: problemId });

        if (!testCase) {
            // If no test cases exist, create a new document
            await TestCases.create({
                ProblemId: problemId,
                AdminId: userId,
                Cases: Cases
            });

            return res.status(200).json({ msg: "Test cases created" });
        } else {
            // If test cases already exist, update the existing document
            await TestCases.updateOne(
                { ProblemId: problemId },
                {
                    AdminId: userId,
                    Cases: [...testCase.Cases, ...Cases] // Merge existing and new cases
                }
            );

            return res.status(200).json({ msg: "Test cases updated" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports = addtestcases;
