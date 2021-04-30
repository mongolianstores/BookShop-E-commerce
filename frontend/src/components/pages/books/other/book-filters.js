import React, {useContext, useState} from 'react'
import {MainState} from '../../../../state/main-state'

const BookFilters = () => {

    const state = useContext(MainState)

    const [searchWord, setSearchWord] = useState('')

    const [categories] = state.categoryAPI.categories
    const [category, setCategory] = state.bookAPI.category
    const [sort, setSort] = state.bookAPI.sort
    const [search, setSearch] = state.bookAPI.search

    const categoryHandler = (e) => {

        setCategory(e.target.value)
        setSearch('')
    }

    const searchHandler = () => {

        setSearch(searchWord);
        console.log(search);
    }

    return(
        <div className='filter-menu'>

            <div className='row'>

                <span>Books by Categories: </span>

                <select name="category" value={category} onChange={categoryHandler}>

                    <option value=''>All Books</option>
                    {
                        categories.map(category => (

                            <option value={"category=" + category.name} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={searchWord} placeholder="Search book"
            onChange={e => setSearchWord(e.target.value.toLowerCase())} />

            <button onClick={searchHandler}>Search</button>

            <div className="row sort">

                <span>Sort: </span>

                <select value={sort} onChange={e => setSort(e.target.value)} >
                    
                    <option value=''>Newest</option>
                    <option value='sort=oldest'>Oldest</option>
                    <option value='sort=-sold'>Bestsellers</option>
                    <option value='sort=-price'>Price: High to Low</option>
                    <option value='sort=price'>Price: Low to High</option>
                </select>
            </div>
        </div>
    )
}

export default BookFilters