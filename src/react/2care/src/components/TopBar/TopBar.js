
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isLoggedIn } from "../../services/authService";
import { getUserPicture, getUserType } from "../../services/userService";
import "./TopBar.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TopBar = () => {
  const [searchText, setSearchText] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userPicture, setUserPicture] = useState("");
  const [userType, setUserType] = useState("");

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  useEffect(() => {
    if(isLoggedIn()){
      setIsLogged(true)
      setUserPicture(getUserPicture())
      setUserType(getUserType())
      
    }
  }, []);

  return (
    <div className="topBar">
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
      <div className="logo">
        <a href="/home">
          <img className="logoImg" src="../../logo.png" alt="Logo" />
        </a>
      </div>
      <div className="search">
        <input type="text" className="searchInput" placeholder="Buscar" value={searchText} onChange={handleSearchChange}></input>
      
         {/* Aqui você pode adicionar lógica para enviar a consulta de pesquisa */}
        
      </div>
      <div className="rightMenu">
         {isLogged ? (
          <Link to={userType == "Caregiver" ? '/profile/Caregiver' : '/profile/Carereceiver'}>
            <img 
              alt="User picture"
              style={{
                  borderRadius: "50%",
                  width: "3.5em",
                  height: "3.5em",
                  objectFit: "cover"
              }}
              src={userPicture && userPicture != "null" ? userPicture : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfwfJ-sfBI_mfosIiy1R3wpv6vVQp25hGPIPsjYP93Og&s"}
            />
       </Link>
        ) : (
          <Link to="/">
            <button>Login</button>
          </Link>
        )} 
      </div>
    </div>
  );
};

export default TopBar;
