import React from 'react'
import {Link} from 'react-router-dom'

const Bottom = () => {

    return(
        
        <div className="bottom">
            <ul>
                <li><Link to='/about'>About us</Link></li>
                <li><Link to='/delivery'>Delivery</Link></li>
                <li><Link to='/faq'>FAQ</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>

            <h3>2021 Emin's Book Store</h3>
        </div>
    )
}

export default Bottom