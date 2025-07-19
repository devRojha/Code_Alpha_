const {z} = require("zod");


const emailType  = z.object({
    Email : z.string().email()
})



module.exports = {
    emailType,

}