import { Outlet }  from 'react-router-dom';
import FinanceNavbar from '../../components/FinanceNavbar.js';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import { Box } from '@chakra-ui/react';

function OperationLayoutPage(props){

  return (
    <>
      <Navbar/>
      <Box padding={{
        base: "1rem 1rem",
        md: "1rem 4rem",
        lg: "1rem 12rem",
      }}>
        <FinanceNavbar/>
      </Box>
      <Outlet/>
      <Footer/>
    </>
  );

}

export default OperationLayoutPage;
