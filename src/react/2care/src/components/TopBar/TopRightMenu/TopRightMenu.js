import './TopRightMenu.css'
const TopRightMenu = (props) => {
    
    return (
        props.isLogged 
        ? 
        <select>
            <option value='' disabled></option>
            <option value='/profile'>Profile</option>
            <option value='/logout'>Logout</option>
        </select>
        :
         <button>Login</button>

    )
}

export default TopRightMenu;