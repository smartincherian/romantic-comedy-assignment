import React, { useState } from 'react';
import Navbar from '../assets/nav_bar.png'
import Back from '../assets/Back.png'
import Search from '../assets/search.png'
import { useSelector, useDispatch } from 'react-redux';

export function Header(props) {

    const [showSearchBar, setshowSearchBar] = useState(false);

    const searchButtonHandler = () => {
        setshowSearchBar(!showSearchBar)
    }

    const searchBarInputHandler=(e)=>{
        const searchInput = e.target.value
        props.onSearch(searchInput);
    }

    return (
        <nav className="relative">
            <div className=" fixed top-0 left-0 right-0 items-center flex-shrink-0 text-white w-full h-48  bg-repeat-x bg-cover" style={{ backgroundImage: `url(${Navbar})`, }}>
                <img className='float-left  ml-[30px] absolute top-1/4' src={Back} alt="Back"></img>
                {/* <img className='w-full h-48' src={Navbar} alt="NavBar"></img> */}
                <p className='float-left ml-24 absolute top-1/4 text-4xl'>{props.title}</p>

                <button onClick={searchButtonHandler}>
                    <img className=' mr-[30px] top-1/4 absolute right-0' src={Search} alt="Search"></img>
                </button>
                {showSearchBar && <form>
                    <label className="block">
                        <input onChange={searchBarInputHandler} type="text" placeholder="Search" className="text-black mt-1 block  top-1/4 absolute 
                        right-0 mr-24 px-1 py-1 text-3xl  border border-slate-300 rounded-md 
                         shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 
                         focus:ring-1 focus:ring-sky-500"/>
                    </label>
                </form>}
            </div>

        </nav>
    )
}
