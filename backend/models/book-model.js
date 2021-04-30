const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    book_id:{
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    title:{
        type: String,
        trim: true,
        required: true
    },
    author:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        trim: true,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    pages:{
        type: Number,
        trim: true,
        required: true
    },
    publisher:{
        type: String,
        trim: true,
        required: true
    },
    images:{
        type: Object,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    checked:{
        type: Boolean,
        default: false
    },
    sale:{ 
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Book", bookSchema)