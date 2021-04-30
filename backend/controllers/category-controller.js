const Category = require('../models/category-model')
const Book = require('../models/book-model')

const categoryController = {

    getCategories: async (req, res) => {

        try {

            const categories = await Category.find()

            res.json(categories)
        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createCategory: async (req, res) => {

        try {

            const {name} = req.body;
            const category = await Category.findOne({name});

            if(category) 
                return res.status(400).json({msg: "Category already exists"})

            const newCategory = new Category({name});

            await newCategory.save()

            res.json({msg: "Created category"})

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }, 
    deleteCategory: async (req, res) => {
        try {

            const cat = await Category.findOne({_id: req.params.id});
            const books = await Book.findOne({category: cat.name});

            if(books) 
                return res.status(400).json({
                    msg: "All books with this category should be deleted"
                })

            await Category.findByIdAndDelete(req.params.id)

            res.json({msg: "Deleted a Category"})

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    updateCategory: async (req, res) => {

        try {
            
            const {name} = req.body;

            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated category"})

        } 
        catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}

module.exports = categoryController;