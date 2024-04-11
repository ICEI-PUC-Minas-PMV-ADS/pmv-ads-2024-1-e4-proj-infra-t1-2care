import React, { useEffect } from 'react';
import './App.css'
import { useTheme } from '@mui/material/styles';

import NavBar from '../components/NavBar/NavBar'
import TopBar from '../components/TopBar/TopBar'
import CaregiverList from '../components/CaregiverList/CaregiverList'

function Home() {
  const theme = useTheme();
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    // <div style={{ backgroundColor: theme.palette.background.light  }}>
    //   <h1> 2Care</h1>
    // </div>
    <div className='App'>
      <TopBar></TopBar>
      <NavBar></NavBar>

      <header className='App-header'>
        <h1>Veja alguns cuidadores cadastrados: </h1>
        <CaregiverList></CaregiverList>
      </header>
    </div>
  );
}

export default Home;
