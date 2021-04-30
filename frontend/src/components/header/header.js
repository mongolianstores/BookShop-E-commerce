import React, {useContext, useState} from 'react'
import {MainState} from '../../state/main-state'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Logo from './logos/logo2.png'
import UserIcon from './logos/user-icon.png'
import CartIcon from './logos/cart-icon.png'

const Header = () => {

    const state = useContext(MainState)

    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin
    const [cart] = state.userAPI.cart

    const [menu, setMenu] = useState(false)

    const logoutUser = async () => {
        
        await axios.get('/user/logout')
        localStorage.removeItem("firstLogin")
        window.location.href = "/";
    }

    const adminPage = () => { // adminRouter

        return(
            <>
                <li><Link to="/create-book" onClick={() => setMenu(!menu)} >Create Book</Link></li>
                <li><Link to="/category" onClick={() => setMenu(!menu)} >Categories</Link></li>
            </>
        )
    }

    const userPage = () => { // loggedRouter

        return(
            <>
                <li><Link to="/history" onClick={() => setMenu(!menu)} >{isAdmin ? 'Orders' : 'Your Orders'}</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }

    const notLoggedPage = () => { // extra

        return(
            <>
                <li><Link to='/login' onClick={() => setMenu(!menu)} >Login</Link></li>
                <img src={UserIcon} id='user-icon' alt=''/>
                <li><Link to='/register' onClick={() => setMenu(!menu)} >Register</Link></li>
            </>
        )
    }

    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return(
        <header>

            <div className='menu'  onClick={() => setMenu(!menu)}>
                <img src={Menu} alt='Menu' width='30' />
            </div>

            <div className='logo'>
                <Link to='/' >{isAdmin ? 'Admin Panel' : <img id='logo' src={Logo} alt=""/>}</Link>
            </div>

            <ul style={styleMenu}>
                <li><Link to='/' style={{fontWeight: 'bold'}} onClick={() => setMenu(!menu)} >Books</Link></li>

                {isAdmin && adminPage()}

                {isLogged ? userPage() : notLoggedPage()}

                <li onClick={() => setMenu(!menu)}>
                    <img src={Close} alt='Close' width='30' className='menu' />
                </li>
            </ul>

            {
                isAdmin ? '' : 
                    <div className='cart-icon'>
                        <span>{cart.length}</span>
                        
                        <Link to='/cart'>
                            <img src={CartIcon} alt='Cart' width='30' />
                        </Link>
                    </div>
            }

        </header>
    )
}

export default Header;