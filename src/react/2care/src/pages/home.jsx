import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import NavBar from '../components/NavBar/NavBar';
import TopBar from '../components/TopBar/TopBar';
import CaregiverList from '../components/CaregiverList/CaregiverList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import { getCaregiverList } from '../services/caregiverService';
import { getUserPosition } from '../services/userService';
import { calcDistanceKm } from '../utils/utils';
import { isLoggedIn } from '../services/authService';
import './App.css';

function Home() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [caregiverList, setCaregiverList] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  useEffect(() => {
    document.title = 'Home';
    if (isLoggedIn()) {
      getCaregiverList().then((CaregiverList) => {
        if(CaregiverList){
          const user_pos = getUserPosition();
          let remove_list = [];
          CaregiverList.forEach((c) => {
            const dist = calcDistanceKm(user_pos.latitude, user_pos.longitude, c.latitude, c.longitude);
            c["distance"] = dist
            if (c.max_request_km < dist) {
                remove_list.push(c._id);
            }
        });
        const filteredList = CaregiverList.filter((c) => !remove_list.includes(c._id));
        setCaregiverList(filteredList);

        } else{
          setCaregiverList([])
        }       

      })
    }else{
      getCaregiverList().then((CaregiverList) => setCaregiverList(caregiverList ? CaregiverList : []))
    }
  }, []);

  return (
    <div className='App'>
      {loading && <LoadingSpinner />}

      <TopBar></TopBar>
      <NavBar caregiverList={caregiverList}></NavBar>

      <header className='App-header'>
        <h1>Veja alguns cuidadores cadastrados: </h1>
        <CaregiverList caregiverList={caregiverList}></CaregiverList>
      </header>

    </div>
  );
}

export default Home;
