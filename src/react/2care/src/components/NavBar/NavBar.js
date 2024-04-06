import './NavBar.css'
import { useState } from 'react'

const NavBar = () => {
    
    const [isLogged, setIsLogged] = useState(true)

    return (
        <div className='navBar'>
            <a href="https://www.w3schools.com">Filtros</a>
            <a href="https://www.w3schools.com">Home</a>
            {isLogged ? <a href="https://www.w3schools.com">Proposta</a> : <></>}
        </div>
    )
}

export default NavBar;