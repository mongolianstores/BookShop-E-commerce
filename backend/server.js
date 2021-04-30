require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/user', require('./routes/user-routes'))
app.use('/api', require('./routes/category-routes'))
app.use('/api', require('./routes/image-routes'))
app.use('/api', require('./routes/book-routes'))
app.use('/api', require('./routes/order-routes'))

const URI = process.env.URL
const PORT = process.env.PORT || 5000

mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
    }, err => {
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})
