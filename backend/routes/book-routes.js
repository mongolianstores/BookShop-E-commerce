const router = require('express').Router()
const bookController = require('../controllers/book-controller')

router.route('/books')
    .get(bookController.getBooks)
    .post(bookController.createBook)

router.route('/books/:id')
    .delete(bookController.deleteBook)
    .put(bookController.updateBook)

module.exports = router