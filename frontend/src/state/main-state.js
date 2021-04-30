import React, {createContext, useState, useEffect} from 'react'
import BookAPI from '../API/bookAPI'
import UserAPI from '../API/userAPI'
import CategoryAPI from '../API/categoryAPI'
import axios from 'axios'

export const MainState = createContext()

export const DataProvider = ({children}) => {

    const [token, setToken] = useState(false)

    useEffect(() => {

        const firstLogin = localStorage.getItem("firstLogin");

        if(firstLogin){

            const refreshToken = async () => {

                const res = await axios.get('/user/refresh_token')
        
                setToken(res.data.accesstoken)
        
                setTimeout(() => {

                    refreshToken()
                    
                }, 10 * 60 * 1000)
            } 
            
            refreshToken()
        }

    }, [])

    const state = {
        
        token: [token, setToken],
        bookAPI: BookAPI(),
        userAPI: UserAPI(token),
        categoryAPI: CategoryAPI()
    }

    return (
        <MainState.Provider value={state}>
            {children}
        </MainState.Provider>
    )
}