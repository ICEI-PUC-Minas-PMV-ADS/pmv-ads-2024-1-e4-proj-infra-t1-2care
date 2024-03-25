import React from 'react';
import { useTheme } from '@mui/material/styles';

function Home() {
  const theme = useTheme();

  return (
    <div style={{ backgroundColor: theme.palette.background.light  }}>
      <h1> 2Care</h1>
    </div>
  );
}

export default Home;
