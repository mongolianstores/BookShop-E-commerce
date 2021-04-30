const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user-model')
const Order = require('../models/order-model')

const userController = {

    register: async (req, res) => {

        try {

            const {name, surname, email, password} = req.body;
            const user = await User.findOne({email});

            if(user) 
                return res.status(400).json({msg: "Email already exists"})

            if(password.length < 6)
                return res.status(400).json({msg: "Password is at least 6 characters"})

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = new User({name, surname, email, password: passwordHash})

            await newUser.save();

            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000
            })

            res.json({accesstoken})

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async (req, res) => {

        try {

            const {email, password} = req.body;
            const user = await User.findOne({email});

            if(!user) 
                return res.status(400).json({msg: "User doesn't exist"});

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch) 
                return res.status(400).json({msg: "Incorrect password"});

            const accesstoken = createAccessToken({id: user._id});
            const refreshtoken = createRefreshToken({id: user._id});

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7d
            })

            res.json({accesstoken})

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    logout: async (req, res) => {

        try {
            
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})

            return res.json({msg: "Logged out"})
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    getUser: async (req, res) => {

        try {

            const user = await User.findById(req.user.id).select('-password');

            if(!user) 
                return res.status(400).json({msg: "User does not exist."})

            res.json(user)

        } 
        catch (error) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) => {

        try {

            const refreshToken = req.cookies.refreshtoken;

            if(!refreshToken) 
                return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (error, user) => {

                if(error) 
                    return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id});

                res.json({accesstoken})
            })

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    addCart: async (req, res) => {

        try {

            const user = await User.findById(req.user.id);

            if(!user) 
                return res.status(400).json({msg: "User does not exist"})

            await User.findOneAndUpdate({_id: req.user.id}, {
                cart: req.body.cart
            })

            return res.json({msg: "Added to cart"})
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    history: async (req, res) => {

        try {

            const history = await Order.find({user_id: req.user.id});

            res.json(history)
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN, {expiresIn: '11m'})
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN, {expiresIn: '7d'})
}

module.exports = userController;