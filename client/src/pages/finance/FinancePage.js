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


function FinancePage(props){

  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({page: 0});
  const [page, setPage] = useState(1);  

  useEffect(() => {
    if(user == null)
      return navigate('/');
    return undefined;
  }, [user]);

  useEffect(() => {

    if(userData.id == 0) return;

    (async () => {

      try {
        if(user == null) return;
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/transactions`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken
          },
          params: {
            limit: 6,
            page: page,
            query: {
              "branchCode": userData.branch.codeName
            }
          }
        };

        let response = await axios.request(options);

        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);

      } catch (e){
        console.log(e);
      }

    })();

  }, [transactions.length, page]);
  
  
  const listProps = {
    transactions,
    setTransactions,
    pagination,
    page,
    setPage
  };

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
        <TransactionList {...listProps}/>
        <Box m={"4rem"}></Box>        
        <TransactionAddForm {...{transactions, setTransactions}}/>

      </Box>
      <Box height="10rem"/>
    </>
  );


}

export default FinancePage;



