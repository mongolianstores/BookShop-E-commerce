const Order = require('../models/order-model')
const User = require('../models/user-model')
const Book = require('../models/book-model')

const orderController = {

    getOrders: async(req, res) => {

        try {

            const orders = await Order.find();

            res.json(orders)
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createOrder: async(req, res) => {

        try {

            const user = await User.findById(req.user.id).select('name email');

            if(!user) 
                return res.status(400).json({msg: "User does not exist"})

            const {cart, paymentID, address} = req.body;
            const {_id, name, email} = user;

            const newOrder = new Order({
                user_id: _id, name, email, paymentID, address, cart
            });

            cart.filter(item => {
                return sold(item._id, item.quantity, item.sale)
            })

            await newOrder.save()

            res.json({msg: "Order successfully made!"})
            
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

const sold = async (id, quantity, prevSale) => {
    
    await Book.findOneAndUpdate({_id: id}, {
        sale: quantity + prevSale
    })
}

module.exports = orderController