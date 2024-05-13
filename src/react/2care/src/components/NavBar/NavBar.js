
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';
import { isLoggedIn } from "../../services/authService";

const NavBar = () => {
    const location = useLocation();
    
    return (
        <div className='navBar'>
            {location.pathname !== "/home" ? (
                <span>
                    <a href="/home">Navegue pelo 2Care</a>
                </span>
            ) : (
                <span>
                    <span>    
                        <a>Filtros</a>
                        {isLoggedIn() && (
                            <a href="/requests">Proposta</a>
                        )}
                    </span>
                </span>
            )}
        </div>
    )
}

export default NavBar;