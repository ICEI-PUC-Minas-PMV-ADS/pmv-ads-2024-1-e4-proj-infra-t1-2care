import './NavBar.css'
import { useState } from 'react'

const NavBar = () => {
    
    const [isLogged, setIsLogged] = useState(true)

    return (
        <div className='navBar'>
            <a href="">Filtros</a>
            <a href="/home">Home</a>
            {isLogged ? <a href="">Proposta</a> : <></>}
        </div>
    )
}

export default NavBar;