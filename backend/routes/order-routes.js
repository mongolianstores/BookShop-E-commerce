const router = require('express').Router()
const auth = require('../authentication/auth')
const authAdmin = require('../authentication/auth-admin')
const orderController = require('../controllers/order-controller')

router.route('/order')
    .get(auth, authAdmin, orderController.getOrders)
    .post(auth, orderController.createOrder)

module.exports = router