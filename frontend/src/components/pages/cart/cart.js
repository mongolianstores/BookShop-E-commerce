import React, {useContext, useState, useEffect} from 'react'
import {MainState} from '../../../state/main-state'
import axios from 'axios'
import Payment from './payment'
import EmptyCart from './empty-cart'

const Cart = () => {

    const state = useContext(MainState)

    const [total, setTotal] = useState(0)

    const [cart, setCart] = state.userAPI.cart
    const [token] = state.token

    useEffect(() => {

        const getTotal = () => {

            const total = cart.reduce((prev, item) => {

                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    const addToCart = async (cart) => {

        await axios.patch('/user/addtocart', {cart}, {
            headers: {Authorization: token}
        })
    }

    const increment = (id) => { 

        cart.forEach(item => {

            if(item._id === id)
                item.quantity += 1
        })

        setCart([...cart])
        addToCart(cart)
    }

    const decrement = (id) => {

        cart.forEach(item => {
            
            if(item._id === id)
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
        })

        setCart([...cart])
        addToCart(cart)
    }

    const removeItem = (id) => {

        if(window.confirm("Do you want to delete this book?")){

            cart.forEach((item, index) => {

                if(item._id === id)
                    cart.splice(index, 1)
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const success = async(payment) => {

        const {paymentID, address} = payment;

        await axios.post('/api/order', {cart, paymentID, address}, {
            headers: {Authorization: token}
        })

        setCart([])
        addToCart([])

        alert("You have successfully placed an order.")
    }

    if(cart.length === 0) 
        return <EmptyCart />

    return(
        <div className='general-cart'>
            
            <div>
                {
                    cart.map(book => (

                        <div className='cart' key={book._id}>
                            
                            <img src={book.images.url} alt=""/>

                            <div className="cart-box">

                                <h2>{book.title}</h2>
                                <h4 id='au'>{book.author}</h4>
                                <h4 id='ca'>{book.category}</h4><br/>
                                <h4>${book.price * book.quantity}</h4>

                                <div className='amount'>
                                    <button onClick={() => decrement(book._id)}> - </button>
                                    <span>{book.quantity}</span>
                                    <button onClick={() => increment(book._id)}> + </button>
                                </div>

                                <div className='delete' onClick={() => removeItem(book._id)}> X </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='total'>
                <h3>Total: ${total}</h3>

                <Payment total={total} success={success}/>
            </div>
        </div>
    )
}

export default Cart;