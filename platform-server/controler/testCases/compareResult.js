const { TestCases } = require("../../db");

const compareResult = async (req, res) => {
    const { codeOutput, problemid } = req.body;

    try {
        // Check if test cases already exist for the problemId
        let testCase = await TestCases.findOne({ ProblemId: problemid });

        if (!testCase) {
            return res.status(404).json({ success: false, message: "Test cases not found" });
        } else {
            const n = testCase.Result.length;
            const result = Array(n).fill(false);

            for (let i = 0; i < n; i++) {
                let str = codeOutput[i].trim(); // Trim extra spaces from codeOutput

                // Compare trimmed codeOutput with testCase.Result
                if (testCase.Result[i] === str) {
                    result[i] = true;
                }
            }

            return res.status(200).json({ success: true, result: result });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = compareResult;
