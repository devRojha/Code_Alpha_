const { z } = require("zod");
const { User } = require("../../db");

const ProblemType = z.object({
    code: z.string(),
    lang: z.string(),
    status: z.string(),
    problemId: z.string(),
});

const submitCodeProblem = async (req, res) => {
    const { code, lang, status, problemId } = req.body;
    const zodPass = ProblemType.safeParse({ code, lang, status, problemId });

    if (!zodPass.success) {
        return res.status(409).json({ msg: "Input validation on code submission failed" });
    }

    const userId = req.userId;

    try {
        const date = new Date();
        const userData = await User.findById(userId);

        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        const submission = {
            date,
            problemId,
            code,
            lang,
            status,
        };

        if (status === "success") {
            const alreadySolved = userData.ProblemSolved.includes(problemId);

            await User.findByIdAndUpdate(
                userId,
                {
                    $push: { SubmitCode: submission },
                    ...(alreadySolved ? {} : { $push: { ProblemSolved: problemId } })
                }
            );
        } else {
            await User.findByIdAndUpdate(
                userId,
                {
                    $push: { SubmitCode: submission }
                }
            );
        }

        res.status(200).json({ msg: "Code submission added successfully" });
    } catch (e) {
        console.error("Code submission failed with error:", e);
        res.status(500).json({ msg: "Code submission failed due to server error" });
    }
};

module.exports = submitCodeProblem;
