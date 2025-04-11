import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(() => navigate('/home'), 1000); // Out transition after fade
    }, 4000); // For extending 4 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Fade in={show} timeout={800}>
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          color: 'white',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', letterSpacing: 1 }}>
          Welcome To Funnelist - Where Data Meets Destiny 
          
        </Typography>
        <CircularProgress color="inherit" size={50} thickness={5} />
        <Typography sx={{ mt: 2, fontStyle: 'italic', fontSize: '1rem' }}>
          Funnelist Activated Lead The Future...
        </Typography>
      </Box>
    </Fade>
  );
};

export default Splash;
