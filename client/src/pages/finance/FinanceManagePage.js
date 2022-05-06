import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar.js';
import Footer from '../../components/Footer.js';
import { Box, Text } from '@chakra-ui/react';
import TransactionAddForm from '../../components/transaction/TrasanctionAddForm.js';
import TransactionList from '../../components/transaction/TransactionList.js';

import ReactTableTest from '../../components/transaction/ReactTableTest.js';

import useAuth from '../../hooks/Auth.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config.js';




function FinanceManagePage(props){
  const { userData } = useAuth();

  return (
    <>
      <Box padding={{
        base: "0rem 1rem",
        md: "0rem 4rem",
        lg: "0rem 12rem",
      }}>
        <Box m={"1rem"}></Box>
        <Text fontSize="4xl" fontWeight="700"> Welcome to { userData?.branch?.name }! </Text>
        <Box m={"2rem"}></Box>        
        <TransactionList/>
        <Box m={"4rem"}></Box>        
        <TransactionAddForm/>
      </Box>
      <Box height="10rem"/>
    </>
  );

}

export default FinanceManagePage;
