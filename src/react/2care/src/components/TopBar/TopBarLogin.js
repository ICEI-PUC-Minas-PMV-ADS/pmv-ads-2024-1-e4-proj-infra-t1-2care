import { useState } from 'react';
// import logo from '../../logo.png'
import './TopBar.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopBarLogin = () => {

    const [isLogged, setIsLogged] = useState(false)

    return (// não vou nem contestar o motivo de ter uma top bar só pra login................................................................
        <div className='topBar'>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
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