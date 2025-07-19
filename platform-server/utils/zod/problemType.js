const {z} = require("zod");

const ProblemType = z.object({
    Title : z.string().min(2),
    Description: z.string().min(10),
    Deficulty: z.string().min(2),
    Example: z.string().min(6),
    Company: z.optional(z.string()),
    Constraint: z.optional(z.string()),
    Topic: z.optional(z.string())
})

const ProblemUpdateType = z.object({
    Title : z.optional(z.string().min(2)),
    Description: z.optional(z.string().min(6)),
    Deficulty: z.optional(z.string().min(2)),
    Example: z.optional(z.string(6)),
    Company: z.optional(z.string()),
    Constraint: z.optional(z.string()),
    Topic: z.optional(z.string())
})

const codeSubmitType = z.object({
    code : z.string(),
    lang:  z.string(),
    status:  z.string(),
    problemId : z.string(),
})

module.exports = {
    ProblemType,
    ProblemUpdateType,
    codeSubmitType
}