import React, {useContext} from 'react'
import {MainState} from '../../../../state/main-state'

const MoreBooks = () => {

    const state = useContext(MainState)
    
    const [page, setPage] = state.bookAPI.page
    const [result] = state.bookAPI.result

    return (
        <div className="more-books">
            {
                result < page * 14 ? ""
                : <button onClick={() => setPage(page+1)}>Show more</button>
            }
        </div>
    )
}

export default MoreBooks