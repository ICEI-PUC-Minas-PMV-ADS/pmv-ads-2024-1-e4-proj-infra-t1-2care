import Search from './Search';
import TopRightMenu from './TopRightMenu/TopRightMenu';
// import logo from '../../logo.png'
import './TopBar.css'

const TopBar = () => {
    return (
        <div className='topBar'>
            <a href='/home'><img src='../../logo.png' alt="Logo" className='logo' /></a>
            <Search></Search>
            <TopRightMenu isLogged={true}></TopRightMenu>
        </div>

    )
}

export default TopBar