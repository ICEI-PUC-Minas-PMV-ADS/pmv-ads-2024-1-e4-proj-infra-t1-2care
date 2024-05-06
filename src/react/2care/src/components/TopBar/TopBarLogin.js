import { useState } from 'react';
// import logo from '../../logo.png'
import './TopBar.css'

const TopBarLogin = () => {

    const [isLogged, setIsLogged] = useState(false)

    return (
        <div className='topBar'>
            <div className='logo'>
                <a href='/home'><img className="logoImg" src='../../logo.png' alt="Logo" /></a>
            </div>
            <div className='search'>
                <input type="text" className='searchInput' placeholder='Buscar'></input>
            </div>
            
        </div>

    )
}

export default TopBarLogin