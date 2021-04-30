import React, {useContext, useState} from 'react'
import {MainState} from '../../../state/main-state'
import Book from './book/book'
import LoadingPage from '../loading-page/loading-page'
import axios from 'axios'
import BookFilters from './other/book-filters'
import MoreBooks from './other/more-books'

const Books = () => {

    const state = useContext(MainState)

    const [books, setBooks] = state.bookAPI.books
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [callback, setCallback] = state.bookAPI.callback

    const [loading, setLoading] = useState(false)
    const [isCheck, setIsCheck] = useState(false)

    const checkHandler = (id) => {

        books.forEach(book => {

            if(book._id === id) 
                book.checked = !book.checked
        })

        setBooks([...books])
    }

    const deleteBook = async (id, public_id) => {

        try {

            setLoading(true)

            const deleteImage = axios.post("/api/delete", {public_id: public_id}, {
                headers: {Authorization: token}
            })

            const deleteBook = axios.delete(`/api/books/${id}`, {
                headers: {Authorization: token}
            })

            await deleteImage
            await deleteBook

            setLoading(false)
            setCallback(!callback)

        } 
        catch (error) {

            alert(error.response.data.msg)
        }
    }

    const checkAll = () => {

        books.forEach(book => {

            book.checked = !isCheck
        })

        setBooks([...books])
        setIsCheck(!isCheck)
    }

    const deleteAll = () => {

        books.forEach(book => {

            if(book.checked) 
                deleteBook(book._id, book.images.public_id)
        })
    }

    if(loading) 
        return <div><LoadingPage/></div>
    
    return(
        <>
            <BookFilters />
            {
                isAdmin && 
                <div className="delete-all">

                    <span>Select all</span>
                    <input type="checkbox" checked={isCheck} onChange={checkAll} />
                    <button onClick={deleteAll}>DELETE SELECTED</button>
                </div>
            }
            <div className='books'>
                {
                    books.map(book => {
                        
                        return <Book key={book._id} book={book} isAdmin={isAdmin} 
                        checkHandler={checkHandler} deleteBook={deleteBook}/>
                    })
                }
            </div>

            <MoreBooks />
            
            {books.length === 0 && <LoadingPage />}
        </>
    )
}

export default Books;