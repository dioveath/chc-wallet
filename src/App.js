import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/home/index.js';
import FinancePage from './pages/finance/index.js';

function App() {
  return (
    <ChakraProvider>
      <FinancePage/>
    </ChakraProvider>
  );
}

export default App;
