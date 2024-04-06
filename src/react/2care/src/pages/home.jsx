import React from 'react';
import { useTheme } from '@mui/material/styles';

import './App.css';
import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import CaregiverList from '../components/CaregiverList/CaregiverList'

function Home() {
  const theme = useTheme();

  return (
    // <div style={{ backgroundColor: theme.palette.background.light  }}>
    //   <h1> 2Care</h1>
    // </div>
    <div className="App">
      <TopBar></TopBar>
      <NavBar></NavBar>

      <header className="App-header">    
        <CaregiverList></CaregiverList>    
      </header>
    </div>
  );
}

export default Home;
