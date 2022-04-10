import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import HomePage from './pages/home/index.js';
import FinancePage from './pages/finance/index.js';

import Fonts from './config/fonts.js';
import theme from './config/theme.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Fonts/>
      <HomePage/>
    </ChakraProvider>
  );
}

export default App;
