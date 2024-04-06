import './TopRightMenu.css'

const TopRightMenu = (props) => {
    return (
        props.isLogged 
        ? 
        <select>
            <option></option>
            <option>Logout</option>
        </select>
        :
         <button>Login</button>

    )
}

export default TopRightMenu;