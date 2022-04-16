import { useState, useEffect } from 'react';

import {
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
} from '@chakra-ui/react';
import axios from 'axios';
import useAuth from '../../hooks/Auth.js';
import config from '../../config/config.js';

export default function TransactionList(){

  const [transactions, setTransactions] = useState([]);
  const { user, userData } = useAuth();

  useEffect(() => {

    (async () => {

      try {

        if(user == null) return;
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/transactions?branchId=${userData.branchId}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken
          }
        };
        
        let response = await axios.request(options);

        setTransactions(response.data.transactions);

      } catch (e){
        console.log(e);
        // setTransactions([]);
      }

    })();


  }, [transactions.length]);

  return (
    <TableContainer>
      <Table>
        <TableCaption> Transactions of { userData.branchId }</TableCaption>
      <Thead>
        <Tr>
          <Th> ID </Th>
          <Th> Destination </Th>
          <Th> Amount </Th>
          <Th> Transaction Type </Th>
          <Th> Category </Th>
          <Th> Date </Th>
          <Th> Done By </Th>
        </Tr>
      </Thead>
        <Tbody>
          {
            transactions.map((t, i) => {
              if(i > 9) return <></>;
              return (
                <Tr>
                  <Td> {t.id} </Td>
                  <Td> {t.destination} </Td>
                  <Td> {t.amount} </Td>
                  <Td> {t.transactionType} </Td>
                  <Td> {t.category} </Td>
                  <Td> {t.date.substring(0, 10)} </Td>
                  <Td> {t.doneBy} </Td>
                </Tr>
              );
            })
          }
      </Tbody>
    </Table>
    </TableContainer>
  );


}

