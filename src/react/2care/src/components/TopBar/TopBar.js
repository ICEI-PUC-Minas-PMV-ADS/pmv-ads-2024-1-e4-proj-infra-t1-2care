import { useState } from 'react';
// import logo from '../../logo.png'
import './TopBar.css'

const TopBar = () => {

    const [isLogged, setIsLogged] = useState(false)

    return (
        <div className='topBar'>
            <div className='logo'>
                <a href='/home'><img src='../../logo.png' alt="Logo" /></a>
            </div>
            <div className='search'>
                <input type="text" className='searchInput' placeholder='Buscar'></input>
            </div>
            <div className='rightMenu'>
                {isLogged ? <a href="/profile"><img src="https://img.freepik.com/fotos-gratis/enfermeira-negra-em-seu-espaco-de-trabalho_52683-100571.jpg" alt="Perfil"></img></a> : <a href='/'><button>Login</button></a>}
            </div>
        </div>

    )
}

export default TopBar