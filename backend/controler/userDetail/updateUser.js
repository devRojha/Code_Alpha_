const { User } = require("../../db")
// const {z} = require("zod");

// const updateType = z.object({
//     Name: z.optional(z.string().min(3)),
//     Email: z.optional(z.string().email()),

// })

const updateUser = async (req, res) => {
    const userId = req.userId
    const { Name, Email } = req.body;
    // const inputval = updateType.safeParse({Name , Email});
    // if(!inputval.success){
    //     return res.status(409).json({msg:"give correct credential"});
    // }
    try {
        if(Email){
            const found = await User.find({Email : Email});
            if(found.length > 0){
                return res.json({msg:"Email is allready exist"});
            }
        }
        if (Name && Email) {
            await User.findByIdAndUpdate(
                { _id: userId },
                {
                    Name,
                    Email
                }
            )
        } else if (Name) {
            await User.findByIdAndUpdate(
                { _id: userId },
                {
                    Name
                }
            )
        } else if (Email) {
            await User.findByIdAndUpdate(
                { _id: userId },
                {
                    Email
                }
            )
        } else {
            res.json({ msg: "No fields provided for update" });
            return;
        }
        res.status(200).json({ msg: "user updated" });
    } catch (e) {
        console.log("Error while updating user: " + e);
        return res.status(500).json({ msg: "Error while updating user" });
    }
}

const updateProblemSolved = async (req , res)=>{
    const userId = req.userId
    const {problemId} = req.body;
    try{
        await User.findByIdAndUpdate(
            {_id : userId},
            { $push: { ProblemSolved: problemId }}
        )
        res.status(200).json({msg:"problemId store in solved"})
    }
    catch(e){
        console.log("Error" + e);
        res.status(500).json({msg:"enternal server down"})
    }

}

module.exports = {updateUser , updateProblemSolved};
