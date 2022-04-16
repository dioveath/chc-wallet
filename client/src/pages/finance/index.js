import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import { Box } from '@chakra-ui/react';
import TransactionAddForm from '../../components/transaction/TrasanctionAddForm.js';
import TransactionList from '../../components/transaction/TransactionList.js';

import ReactTableTest from '../../components/transaction/ReactTableTest.js';

function FinancePage(props){

  return (
    <>
      <Navbar/>
      <Box padding={{
        base: "0rem 1rem",
        md: "0rem 4rem",
        lg: "0rem 12rem",
      }}>
        <Box m={"4rem"}></Box>
        <TransactionList/>
        <Box m={"4rem"}></Box>        
        <TransactionAddForm/>

      </Box>
      <Box height="10rem"/>
      <Footer/>
    </>
  );


}

export default FinancePage;
