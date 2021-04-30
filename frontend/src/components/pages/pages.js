import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Books from './books/books'
import BookDetails from './book-details/book-details'
import Login from './login-register/login'
import Register from './login-register/register'
import Cart from './cart/cart'
import NotFound from './not-found/not-found'
import History from './history/history'
import OrderDetails from './history/order-details'
import Categories from './categories/categories'
import CreateBook from './create-book/create-book'
import {MainState} from '../../state/main-state'
import About from './about/about'
import Contact from './contact/contact'
import FAQ from './faq/faq'
import Delivery from './delivery/delivery'

const Pages = () => {

    const state = useContext(MainState)

    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return(

        <Switch>

            <Route path="/" exact component={Books} />

            <Route path="/detail/:id" exact component={BookDetails} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />

            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />

            <Route path="/history" exact component={isLogged ? History : NotFound} />

            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/create-book" exact component={isAdmin ? CreateBook : NotFound} />

            <Route path="/edit-book/:id" exact component={isAdmin ? CreateBook : NotFound} />

            <Route path="/cart" exact component={Cart} />

            <Route path="/about" exact component={About} />

            <Route path="/contact" exact component={Contact} />

            <Route path="/faq" exact component={FAQ} />

            <Route path="/delivery" exact component={Delivery} />

            <Route path="*" exact component={NotFound} />
            
        </Switch>
    )
}

export default Pages;