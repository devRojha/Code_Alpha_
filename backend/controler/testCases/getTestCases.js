const { TestCases } = require("../../db");

const getTestCases = async (req, res) => {

    const { problemid } = req.headers;

    try {
        // Check if test cases already exist for the problemId
        let testCase = await TestCases.findOne({ ProblemId: problemid });

        if (!testCase) {
            // If no test cases exist, create a new document
            return res.status(404).json({success:"false", messege: "Test cases not found" });
        } else {
            // If test cases already exist, update the existing document

            return res.status(200).json({success:"true", testCase: testCase.Cases });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({success:"false", messsege: "Internal server error" });
    }
};

module.exports = getTestCases;
