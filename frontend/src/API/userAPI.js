import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect(() => {

        if(token) {

            const getUser = async () => {

                try {
                    
                    const res = await axios.get('/user/info', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)

                    res.data.pos === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    setCart(res.data.cart)

                } 
                catch (error) {

                    alert(error.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    const addCart = async (book) => {

        if(!isLogged) 
            return alert("Please login to continue")

        const check = cart.every(item => {

            return item._id !== book._id
        })

        if(check) {

            setCart([...cart, {...book, quantity: 1}])

            await axios.patch('/user/addtocart', {cart: [...cart, {...book, quantity: 1}]}, {
                headers: {Authorization: token}
            })

        }
        else {

            alert("This book already added to cart")
        }
    }

    return {
        
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        history: [history, setHistory],
    }
}

export default UserAPI;