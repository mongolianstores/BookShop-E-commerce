import React, {useContext, useEffect} from 'react'
import {MainState} from '../../../state/main-state'
import {Link} from 'react-router-dom'
import axios from 'axios'

const History = () => {

    const state = useContext(MainState)

    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    useEffect(() => {

        if(token) {

            const getHistory = async () => {

                if(isAdmin) {

                    const res = await axios.get('/api/order', {
                        headers: {Authorization: token}
                    })
    
                    setHistory(res.data)
                }
                else {

                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
    
                    setHistory(res.data)
                }
            }

            getHistory()
        }

    }, [token, isAdmin, setHistory])

    return(

        <div className='orders-page'>

            <h2 id='hh'>Order History</h2>

            {
                history.length !== 0 ? 

                <table>
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Date of purchase</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            history.map(item => (

                                <tr key={item._id}>
                                    <td>{item.paymentID}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                    <td>{item.status}</td>
                                    <td><Link to={`/history/${item._id}`}>Details</Link></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table> :

                <h3 id='hh'>No order</h3>
            }
            
        </div>
    )
}

export default History