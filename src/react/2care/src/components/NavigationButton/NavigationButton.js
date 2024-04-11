import React from 'react';
import { Link } from 'react-router-dom';
// import './NavigationButton.css'; // Importe o arquivo de estilo CSS

const NavigationButton = ({ to, text }) => {
  return (
    <Link to={to}>
      <button className={`nav-button`}>
        {text}
      </button>
    </Link>
  );
}

export default NavigationButton;
