import React, {useContext, useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import {MainState} from '../../../state/main-state'
import Book from '../books/book/book'

const BookDetails = () => {

    const params = useParams()

    const state = useContext(MainState)

    const [detailBook, setDetailBook] = useState([])

    const [books] = state.bookAPI.books
    const addCart = state.userAPI.addCart
    
    useEffect(() => {

        if(params.id) {

            books.forEach(book => {

                if(book._id === params.id) 
                    setDetailBook(book)
            })
        }

    },[params.id, books])

    if(detailBook.length === 0) 
        return null;

    return(
        <>
            <div className='detail'>
                <img src={detailBook.images.url} alt="" />

                <div className="detail-box">

                    <h2>{detailBook.title}</h2>
                    <h4 id='au'>{detailBook.author}</h4>
                    <h4 id='ca'>{detailBook.category}</h4><br/>
                    <span>${detailBook.price}</span>
                    <p>{detailBook.description}</p>

                    <Link to="/cart" className="cart-button" onClick={() => addCart(detailBook)}>Buy Now</Link>
                </div>
            </div>

            <div style={{marginLeft: '10px'}}>

                <h3 style={{textAlign: 'center'}}>Related books</h3>
                
                <div className='books'>
                    {
                        books.map(book => {
                            return book.category === detailBook.category && book._id !== detailBook._id
                                ? <Book key={book._id} book = {book} /> : null
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default BookDetails;