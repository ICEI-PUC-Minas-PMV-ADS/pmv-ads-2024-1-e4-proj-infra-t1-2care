
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = ({ isLogged, userName }) => {
    
      return (
        <div className='navBar'>
            <span>
                <a href="/home">Navegue pelo 2Care</a>
            </span>
            
            {isLogged && (
                <span>    
                    <a href="/requests">Filtros</a>
                    <a href="/requests">Proposta</a>
                </span>
            )};
        </div>
    )
}

export default NavBar;