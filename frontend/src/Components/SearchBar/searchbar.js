import React from 'react';
import "./searchbar.css";
import { AiOutlineSearch } from "react-icons/ai";

function SearchBar({data})
{
    return(
        <div className='search'>
            <div className='searchInputs'></div>
                <input type='text' className='searchbar-styling' placeholder='Search anything'/>
                <div className='searchIcon'><AiOutlineSearch /></div>
            {/* <div className='dataResult'>
                {data.map((value,key)=>{
                    return <div>{}</div>
                })}
            </div> */}
        </div>
    )
}

export default SearchBar