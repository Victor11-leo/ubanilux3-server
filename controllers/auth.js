const userLogin = async (req,res) => {
    try {
        res.json({message:"hi"})
    } catch (error) {
        res.json({error:"hi"})
        
    }
}

module.exports = {
    userLogin
}