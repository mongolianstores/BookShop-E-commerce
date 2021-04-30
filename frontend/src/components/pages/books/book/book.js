import React from 'react'
import Buttons from './buttons/buttons'

const Book = ({book, isAdmin, checkHandler, deleteBook}) => {

    return(

        <div className='book'>

            {
                isAdmin && <input type="checkbox" checked={book.checked}
                onChange={() => checkHandler(book._id)} />
            }

            <img src={book.images.url} alt='' /><br/>

            <div className='book-box'>

                <h3 title={book.title}>{book.title}</h3>
                <h4 title={book.author}>{book.author}</h4><br/>
                <h5>{book.category}</h5><br/>

                <div style={{textAlign: 'center'}}><span>${book.price}</span></div>
            </div>

            <Buttons book = {book} deleteBook={deleteBook}/>
            
        </div>
    )
}

export default Book;