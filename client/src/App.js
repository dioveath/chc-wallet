import React, { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/home/index.js';
import FinancePage from './pages/finance/FinancePage.js';
import FinanceLayoutPage from './pages/finance/index.js';
import FinanceManagePage from './pages/finance/FinanceManagePage.js';
import LoginPage from './pages/login/index.js';
import RegisterPage from './pages/register/index.js';
import TransactionPage from './pages/transaction/index.js';
import OperationLayoutPage from './pages/operation/index.js';
import GamingOperationPage from './pages/operation/GamingOperationPage.js';
import ListOperation from './pages/operation/ListOperation.js';

import config from './config/config.js';
import Fonts from './config/fonts.js';
import theme from './config/theme.js';
import './App.css';

import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate
} from "react-router-dom";

import axios from 'axios';
import useAuth from './hooks/Auth.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import AnnotationPlugin from 'chartjs-plugin-annotation';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useMediaQuery } from 'react-responsive';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  AnnotationPlugin,
  ChartDataLabels
);

ChartJS.defaults.font = {
  size: 13,
  family: 'Nunito'
};


function App() {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)'});
  if(isTablet)
    ChartJS.defaults.font = {
      size: 16,
      family: 'Nunito'    
    };
  else
    ChartJS.defaults.font = {
      size: 13,
      family: 'Nunito'
    };

  ChartJS.defaults.set('plugins.datalabels', {
    color: 'rgba(0, 0, 0, 0)'
  });

  const { user, userData, setUserData, updateToken } = useAuth();  

  useEffect(() => {
    updateToken();
    if(user == null) return;

    (async () => {

      try {

        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/user/${user.userId}`,
          headers: {
            'Content-Type': 'application/json',
          }
        };

        const response = await axios.request(options);
        const newOptions = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/branch/${response.data.user.branchId}`,
          headers: {
            'Content-Type': 'application/json',
          }
        };

        const newResponse = await axios.request(newOptions);
        setUserData({
          id: response.data.user.id,
          fullName: response.data.user.fullName,
          email: response.data.user.email,          
          phoneNumber: response.data.user.phoneNumber,
          emailVerified: response.data.user.emailVerified,
          branchId: response.data.user.branchId,
          branch: newResponse.data.branch
        });


      } catch(e){
        console.log(e.message);
      }

    })();
  }, [user.id]);
  
  return (
    <ChakraProvider theme={theme}>
      <Fonts/>

      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='login' element={<LoginPage/>}/>
          <Route path='register' element={<RegisterPage/>}/>

          { userData.id != 0 ?
            <>
              <Route path='finance' element={<FinanceLayoutPage/>}>
                <Route index element={<FinancePage/>}/>
                <Route path='manage-transactions' element={<FinanceManagePage/>}/>
                <Route path='manage-transactions/:id' element={<TransactionPage/>}/>
              </Route>

              <Route path='operation' element={<OperationLayoutPage/>}>
                <Route index element={<ListOperation/>}></Route>
                { userData?.branch?.codeName == 'chcGam' ?
                  <Route path='gaming-sessions' element={<GamingOperationPage/>}/>
                  : <></> }
              </Route>
            </> :
            <>
              <Route path='*' element={<Navigate to='/'/>}/>
            </> }

        </Routes>
      </Router>

    </ChakraProvider>
  );
}

export default App;
