import { useEffect } from 'react';
import { Box } from '@mui/material';
import { useApp } from '../../contexts/AppContext/AppContext';
import backgroundImage from '../../assets/images/backgroundImage.webp';
import SignIn from './components/SignIn';
import LoginAppInfo from './components/LoginAppInfo';
import useScrollToElement from '../../hooks/useScrollToElement';

const Login = () => {
  const [scrollRef, scroll] = useScrollToElement();
  const { darkModeEnabled, toggleDarkMode, authentication } = useApp();

  useEffect(() => {
    localStorage.clear();
    if (darkModeEnabled === 'true') toggleDarkMode();
  }, [authentication, darkModeEnabled, toggleDarkMode]);

  return (
    <Box
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        minHeight: '100vh',
      }}
    >
      <SignIn scroll={scroll} />
      <LoginAppInfo scrollRef={scrollRef} />
    </Box>
  );
};

export default Login;
