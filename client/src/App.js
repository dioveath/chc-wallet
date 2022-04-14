import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/home/index.js';
import FinancePage from './pages/finance/index.js';
import LoginPage from './pages/login/index.js';
import RegisterPage from './pages/register/index.js';

import config from './config/config.js';
import Fonts from './config/fonts.js';
import theme from './config/theme.js';
import './App.css';

import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

import axios from 'axios';
import useAuth from './hooks/Auth.js';


function App() {

  const { user, userData, setUserData, updateToken } = useAuth();

  useEffect(() => {

    updateToken();

    (async () => {

      if(user == null) return;

      const options = {
        method: 'GET',
        url: `${config.serverUrl}/api/v1/user/${user.userId}`,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const response = await axios.request(options);

      if(response.data.status != 'fail') {
        setUserData({
          id: response.data.user.id,
          fullName: response.data.user.fullName,
          email: response.data.user.email,          
          phoneNumber: response.data.user.phoneNumber,
          emailVerified: response.data.user.emailVerified
        });
      }

    })();
  }, [userData.id]);


  return (
    <ChakraProvider theme={theme}>
      <Fonts/>

      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='finance' element={<FinancePage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>                    
        </Routes>
      </Router>

    </ChakraProvider>
  );
}

export default App;
