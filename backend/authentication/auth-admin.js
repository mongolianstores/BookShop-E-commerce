const User = require('../models/user-model')

const authAdmin = async (req, res, next) => {

    try {

        const user = await User.findOne({
            _id: req.user.id
        });

        if(user.pos === 0)
            return res.status(400).json({msg: "Access denied"})

        next()
    } 
    catch (error) {
        return res.status(500).json({msg: error.message})
    }
}

module.exports = authAdmin