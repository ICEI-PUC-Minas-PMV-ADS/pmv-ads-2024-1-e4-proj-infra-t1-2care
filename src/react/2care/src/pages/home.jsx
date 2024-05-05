import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar/NavBar';
import TopBar from '../components/TopBar/TopBar';
import CaregiverList from '../components/CaregiverList/CaregiverList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import './App.css';

function Home() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    // <div style={{ backgroundColor: theme.palette.background.light  }}>
    //   <h1> 2Care</h1>
    // </div>
    <div className='App'>
      {loading && <LoadingSpinner />}

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
