import Search from './Search';
// import logo from '../../logo.png'
import './TopBar.css'

const TopBar = () => {

    return (
        <div className='topBar'>
            <a href='/home'><img src='../../logo.png' alt="Logo" className='logo' /></a>
            <Search></Search>
            
        </div>

    )
}

export default TopBar