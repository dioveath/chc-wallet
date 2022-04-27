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
  Box,
  Flex,
  useColorModeValue,
  useToast  
} from '@chakra-ui/react';
import { AiFillDelete } from 'react-icons/ai';

import axios from 'axios';
import useAuth from '../../hooks/Auth.js';
import config from '../../config/config.js';
import { TransactionService } from '../../Service/TransactionService.js';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

export default function TransactionList(props){

  const { user, userData } = useAuth();
  const toast = useToast();

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

  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');

  return (
    <>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              { columns.map((h) => <Th key={h.Header} {...(h.Header === "Amount" ? {isNumeric: ''} : {})}> { h.Header }</Th>)}

              <Th bg={bgColor} style={{
                "position": "sticky",
                "top": 0,
                "right": 0
              }}> Action </Th>

            </Tr>
          </Thead>
          <Tbody>
            {
              props.transactions.map((t) => {
                return (
                  <Tr key={t.id}>
                    <Td> {t.id.substring(0, 6)}... </Td>
                    <Td> {t.destination} </Td>
                    <Td> {t.amount} </Td>
                    <Td> {t.transactionType} </Td>
                    <Td> {t.category} </Td>
                    <Td> {t.date.substring(0, 10)} </Td>
                    <Td> {t.doneBy?.substring(0,6)}... </Td>

                    <Td bg={bgColor} style={{
                      "position": "sticky",
                      "top": 0,
                      "right": 0
                    }}>

                      <Flex
                      justify="space-around">
                        <AiFillDelete
                          _hover={{ color: "red" }}
                          cursor="pointer"
                          onClick={ async () => {
                            const { transaction, error } = await TransactionService.deleteTransaction(t.id, user.accessToken);

                            if(error != undefined && error != null) {
                              error.forEach((e) => {
                                toast({
                                  title: 'Transaction Add Failed',
                                  description: e,
                                  status: 'error',
                                  duration: 3000,
                                  isClosable: true
                                });                
                              });
                            } else {
                              toast({
                                title: 'Transaction Deleted Successfully',
                                description: `Transaction ID: ${transaction.deleted.id}`,
                                status: 'info',
                                duration: 3000,
                                isClosable: true
                              });

                              props.setTransactions([
                                ...props.transactions.filter((t) => t.id !== transaction.deleted.id)
                              ]);

                            }                          

                          }}/>

                        <RouterLink to={"transaction/" + t.id}>
                          <AiFillInfoCircle />
                        </RouterLink>
                      </Flex>

                    </Td>

                  </Tr>
                );
              })
            }
          </Tbody>
          <Tfoot>
            <Tr>
              { columns.map((h) => <Th key={h.Header}> { h.Header }</Th>)}
              <Th bg={bgColor} style={{
                "position": "sticky",
                "top": 0,
                "right": 0
              }}> Action </Th>            
            </Tr>
            <Tr>
              
            </Tr>
          </Tfoot>
        </Table>

      </TableContainer>
      <Box height="0.5rem"></Box>
      <HStack spacing='1rem'>
        {
          Array.from({length: props.pagination.totalPages}, (_,i) => i+1).map((i) =>
            <Button variant={props.page == i ? 'solid' : 'outline'} colorScheme='teal' key={i} onClick={() => { props.setPage(i); }}>
              { i }
            </Button>)
        }    
      </HStack>
      <Box height="0.5rem"></Box>
    </>
  );


}

