const { User } = require("../../db")


const deleteUser = async (req , res)=>{
    const userId = req.userId
    try{
        await User.deleteOne({_id:userId});
        res.status(200).json({msg:"user deleted"});
    }
    catch (e) {
        console.log("Error while deleting user: " + e);
        return res.status(500).json({ msg: "Error while deleting user" });
    }
}

module.exports = deleteUser