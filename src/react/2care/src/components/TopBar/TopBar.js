import React from 'react';
import { Link } from 'react-router-dom'
import './TopBar.css'

const TopBar = ({ isLogged, userName }) => {

    return (
        <div className='topBar'>
            <div className='logo'>
                <a href='/home'><img src='../../logo.png' alt="Logo" /></a>
            </div>
            <div className='search'>
                <input type="text" className='searchInput' placeholder='Buscar'></input>
            </div>
            <div className='rightMenu'>
                {isLogged ? (
                       <span>{userName}</span>                                 
                ) : (
                    <Link to="/">
                        <button>Login</button>
                    </Link>                 
                )}
            </div>

        </div>
    )
}

export default TopBar