import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {MainState} from '../../../state/main-state'
import LoadingPage from '../loading-page/loading-page'
import {useHistory, useParams} from 'react-router-dom'

const initialState = {

    book_id: '',
    title: '',
    author: '',
    price: 0,
    description: '',
    pages: 0,
    publisher: '',
    category: '',
    _id: ''
}

const CreateBook = () => {

    const state = useContext(MainState)

    const [book, setBook] = useState(initialState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const [onEdit, setOnEdit] = useState(false)

    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [categories] = state.categoryAPI.categories
    const [books] = state.bookAPI.books
    const [callback, setCallback] = state.bookAPI.callback

    const history = useHistory()
    const param = useParams()

    const uploadStyle = {
        display: images ? "block" : "none"
    }

    useEffect(() => {

        if(param.id) {

            setOnEdit(true)

            books.forEach(book => {

                if(book._id === param.id) {

                    setBook(book)
                    setImages(book.images)
                }
            })
        }

        else {

            setOnEdit(false)
            setBook(initialState)
            setImages(false)
        }

    }, [param.id, books])

    const uploadHandler = async (e) => {

        e.preventDefault()

        try {

            if(!isAdmin) 
                return alert("You're not an admin")

            const file = e.target.files[0]
            
            if(!file) 
                return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()

            formData.append('file', file)

            setLoading(true)

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            
            setLoading(false)
            setImages(res.data)

        } 
        catch (error) {

            alert(error.response.data.msg)
        }
    }

    const deleteHandler = async () => {

        try {

            if(!isAdmin) 
                return alert("You're not an admin")

            setLoading(true)

            await axios.post('/api/delete', {public_id: images.public_id}, {
                headers: {Authorization: token}
            })

            setLoading(false)
            setImages(false)
        } 
        catch (error) {

            alert(error.response.data.msg)
        }
    }

    const changeInputHandler = (e) => {

        const {name, value} = e.target

        setBook({...book, [name]:value})
    }

    const submitHandler = async (e) => {

        e.preventDefault()

        try {

            if(!isAdmin) 
                return alert("You're not an admin")

            if(!images) 
                return alert("No Image Upload")

            if(onEdit) {

                await axios.put(`/api/books/${book._id}`, {...book, images}, {
                    headers: {Authorization: token}
                })
            }
            else {

                await axios.post('/api/books', {...book, images}, {
                    headers: {Authorization: token}
                })
            }

            setCallback(!callback)

            history.push('/')
        } 
        catch (error) {

            alert(error.response.data.msg)
        }
    }

    return(

        <div className='create-book'>

            <div className='upload'>

                <input type="file" name="file" id="file-up" onChange={uploadHandler}/>

                {
                    loading ? <div id="file-img"><LoadingPage /></div> :
                    <div id="file-img" style={uploadStyle}>
                        <img src={images ? images.url : ""} alt=""/>

                        <span onClick={deleteHandler}>X</span>
                    </div>
                }
            </div>

            <form onSubmit={submitHandler}>

                <div className="row">
                    <label htmlFor="book_id">Book ID</label>
                    <input type="text" name="book_id" id="book_id" required 
                    value={book.book_id} onChange={changeInputHandler} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required 
                    value={book.title} onChange={changeInputHandler} />
                </div>

                <div className="row">
                    <label htmlFor="author">Author</label>
                    <input type="text" name="author" id="author" required 
                    value={book.author} onChange={changeInputHandler} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required 
                    value={book.price} onChange={changeInputHandler} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={book.description} onChange={changeInputHandler} rows="5"/>
                </div>

                <div className="row">
                    <label htmlFor="pages">Pages</label>
                    <input type="number" name="pages" id="pages" required 
                    value={book.pages} onChange={changeInputHandler} />
                </div>

                <div className="row">
                    <label htmlFor="publisher">Publisher</label>
                    <input type="text" name="publisher" id="publisher" required 
                    value={book.publisher} onChange={changeInputHandler} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>

                    <select name="category" value={book.category} onChange={changeInputHandler}>

                        <option value="">Please select a category</option>
                        
                        {
                            categories.map(category => (
                                <option value={category.name} key={category._id}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>

            </form>
        </div>
    )
}

export default CreateBook