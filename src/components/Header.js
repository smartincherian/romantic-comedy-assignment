import React, { useState } from 'react';
import Navbar from '../assets/nav_bar.png'
import Back from '../assets/Back.png'
import Search from '../assets/search.png'

export function Header(props) {

    //searchBar
    const [showSearchBar, setshowSearchBar] = useState(false);
    const searchButtonHandler = () => {
        setshowSearchBar(!showSearchBar)
    }
    const searchBarInputHandler = (e) => {
        const searchInput = e.target.value
        props.onSearch(searchInput);
    }

    return (
        <nav className="relative">
            <div className=" fixed top-0 left-0 right-0 items-center flex-shrink-0 text-white w-full h-48  bg-repeat-x bg-cover" style={{ backgroundImage: `url(${Navbar})`, }}>
                <img className='float-left  ml-[30px] absolute top-8 h-8' src={Back} alt="Back"></img>
                <p className='float-left ml-20 sm:ml-24 absolute top-8 text-2xl sm:text-3xl'>{props.title}</p>
                <button onClick={searchButtonHandler}>
                    <img className=' mr-[30px] top-8 absolute right-0 h-8' src={Search} alt="Search"></img>
                </button>
                {showSearchBar && <div>
                    <form>
                        <input onChange={searchBarInputHandler} type="text" placeholder="Search"
                            className="text-black block w-52 sm:w-80 top-20  absolute 
                        right-0 mr-[30px] px-1 py-1   border border-slate-300 rounded-md 
                         shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 
                         focus:ring-1 focus:ring-sky-500"/>
                    </form>
                </div>}
            </div>
        </nav>
    )
}
