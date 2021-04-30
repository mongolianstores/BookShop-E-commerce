const Book = require('../models/book-model')
var BookAPI = require('../API/bookAPI')

const bookController = {

    getBooks: async(req, res) => {

        try {

            const bookAPI = new BookAPI(Book.find(), req.query).filter().sort().page();
            const books = await bookAPI.query;

            res.json({
                status: 'success',
                result: books.length,
                books: books
            })

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createBook: async(req, res) => {
        try {
            
            const {book_id, title, author, price, description, pages, publisher, images, category} = req.body;

            if(!images) 
                return res.status(400).json({msg: "No image uploaded"})

            const book = await Book.findOne({book_id});

            if(book)
                return res.status(400).json({msg: "Book already exists"})

            const newBook = new Book({
                book_id, 
                title: title.toLowerCase(), 
                author: author.toLowerCase(), 
                price, 
                description, 
                pages, 
                publisher: publisher.toLowerCase(), 
                images, 
                category
            });

            await newBook.save()

            res.json({msg: "Created a book"})
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    deleteBook: async(req, res) => {
        try {
            
            await Book.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted a Book"})
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateBook: async(req, res) => {
        try {
            
            const {title, author, price, description, pages, publisher, images, category} = req.body;

            if(!images) 
                return res.status(400).json({msg: "No image uploaded"})

            await Book.findOneAndUpdate({_id: req.params.id}, {
                title: title.toLowerCase(), 
                author: author.toLowerCase(), 
                price, 
                description, 
                pages, 
                publisher: publisher.toLowerCase(), 
                images, 
                category
            })

            res.json({msg: "Updated a Book"})

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = bookController