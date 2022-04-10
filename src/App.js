import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/home/index.js';
import FinancePage from './pages/finance/index.js';

import Fonts from './config/fonts.js';
import theme from './config/theme.js';
import './App.css';

import {
  Route,
  Routes,
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts/>

      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='finance' element={<FinancePage/>}/>
        </Routes>
      </Router>

    </ChakraProvider>
  );
}

export default App;
