
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";

const TopBar = ({ isLogged, userName }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    setSearchText(searchText);
  };

  return (
    <div className="topBar">
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
          <span>{userName}</span>
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
