const router = require('express').Router()
const categoryController =  require('../controllers/category-controller');
const auth = require('../authentication/auth')
const authAdmin = require('../authentication/auth-admin')

router.route('/category')
    .get(categoryController.getCategories)
    .post(auth, authAdmin, categoryController.createCategory)

router.route('/category/:id')
    .delete(auth, authAdmin, categoryController.deleteCategory)
    .put(auth, authAdmin, categoryController.updateCategory)

module.exports = router