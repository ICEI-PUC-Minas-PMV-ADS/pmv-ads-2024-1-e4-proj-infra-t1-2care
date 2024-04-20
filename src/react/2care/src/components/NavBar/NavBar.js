import './NavBar.css'
import { useState } from 'react'

const NavBar = ({ isLogged}) => {
    
      return (
        <div className='navBar'>
            <a href="">Filtros</a>
            <a href="/home">Home</a>
            {isLogged && <a href="/requests">Proposta</a>}
        </div>
    )
}

export default NavBar;