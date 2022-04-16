import { useState, useEffect, useMemo } from 'react';

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
  TableContainer,
  Button,
  HStack,
  Box
} from '@chakra-ui/react';
import axios from 'axios';
import useAuth from '../../hooks/Auth.js';
import config from '../../config/config.js';

export default function TransactionList(){

  const [transactions, setTransactions] = useState([]);
  const { user, userData } = useAuth();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({page: 0});

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Destination',
      accessor: 'destination'
    },
    {
      Header: 'Amount',
      accessor: 'amount',
      isNumeric: true
    },
    {
      Header: 'Type',
      accessor: 'transactionType'
    },
    {
      Header: 'Category',
      accessor: 'category'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Done By',
      accessor: 'doneBy'
    }
  ], []);


  useEffect(() => {

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
              "branchId": "chcGaming"
            }
          }
        };
        
        let response = await axios.request(options);

        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);

        console.log(response);

      } catch (e){
        // console.log(e);
        // setTransactions([]);
      }

    })();

  }, [page]);

  return (
    <>
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            { columns.map((h) => <Th {...(h.Header === "Amount" ? {isNumeric: ''} : {})}> { h.Header }</Th>)}
          </Tr>
        </Thead>
        <Tbody>
            {
              transactions.map((t) => {
                return (
                  <Tr>
                    <Td> {t.id.substring(0, 6)}... </Td>
                    <Td> {t.destination} </Td>
                    <Td> {t.amount} </Td>
                    <Td> {t.transactionType} </Td>
                    <Td> {t.category} </Td>
                    <Td> {t.date.substring(0, 10)} </Td>
                    <Td> {t.doneBy?.substring(0,6)}... </Td>
                  </Tr>
                );
              })
            }
        </Tbody>
        <Tfoot>
          <Tr>
            { columns.map((h) => <Th> { h.Header }</Th>)}
          </Tr>
          <Tr>

          </Tr>
        </Tfoot>
      </Table>

    </TableContainer>
      <Box height="0.5rem"></Box>
      <HStack spacing='1rem'>
        {
          Array.from({length: pagination.totalPages}, (_,i) => i+1).map((i) =>
            <Button variant={page == i ? 'solid' : 'outline'} colorScheme='teal' key={i} onClick={() => { setPage(i); }}>
              { i }
            </Button>)
        }    
      </HStack>
      <Box height="0.5rem"></Box>
    </>
  );


}

