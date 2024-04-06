import Search from '../Search/Search';
import TopRightMenu from '../TopRightMenu/TopRightMenu';
// import logo from '../../logo.png'
import './TopBar.css'

const TopBar = () => {
    return (
        <div className='topBar'>
            <img src='../../logo.png' alt="Logo" className='logo' />
            <Search></Search>
            <TopRightMenu isLogged={true}></TopRightMenu>
        </div>

    )
}

export default TopBar