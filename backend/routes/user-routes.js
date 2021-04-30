const router = require('express').Router()
const userController = require('../controllers/user-controller')
const auth = require('../authentication/auth')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/refresh_token', userController.refreshToken)
router.get('/info', auth, userController.getUser)
router.get('/history', auth, userController.history)
router.patch('/addtocart', auth, userController.addCart)

module.exports = router