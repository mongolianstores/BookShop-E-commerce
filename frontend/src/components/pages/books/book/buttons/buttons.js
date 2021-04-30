import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {MainState} from '../../../../../state/main-state'

const Buttons = ({book, deleteBook}) => {

    const state = useContext(MainState)

    const [isAdmin] = state.userAPI.isAdmin
    const addCart = state.userAPI.addCart

    return(

        <div className='buttons'>

            {
                isAdmin ? 
                    <>
                        <Link id='button-buy' to='#!' 
                            onClick={() => deleteBook(book._id, book.images.public_id)}>Del</Link>

                        <Link id='button-view' to={`/edit-book/${book._id}`} >Edit</Link>
                    </>
                : 
                    <>
                        <Link id='button-buy' to='#!'  onClick={() => addCart(book)}>Buy</Link>

                        <Link id='button-view' to={`/detail/${book._id}`} >View</Link>
                    </>
            }
            
        </div>
    )
}

export default Buttons;