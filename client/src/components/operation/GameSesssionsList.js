import { useState, useEffect, useMemo, useContext } from 'react';

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
import { Link as RouterLink } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import { AiFillInfoCircle, AiFillDelete } from 'react-icons/ai';
import { FaCashRegister } from 'react-icons/fa';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';

import axios from 'axios';
import useAuth from '../../hooks/Auth.js';
import config from '../../config/config.js';
import useGameSessions from '../../hooks/GameSession.js';

import ActionButton from '../../components/ActionButton.js';
import PromptActionButton from '../../components/PromptActionButton.js';


export default function GameSessionList(props){
  const { user, userData } = useAuth();
  const toast = useToast();

  const { isLoading, gameSessions, deleteSession, updateSession, pagination, setPagination } = useGameSessions();

  const columns = useMemo(() => [
    {
      Header: 'ID',
      accessor: 'id'
    },
    {
      Header: 'Player',
      accessor: 'player'
    },
    {
      Header: 'In Charge',
      accessor: 'inCharge'
    },
    {
      Header: 'StartTime',
      accessor: 'startTime'
    },
    {
      Header: 'Duration',
      accessor: 'duration'
    },
    {
      Header: 'Cost',
      accessor: 'cost'
    },
    {
      Header: 'Paid',
      accessor: 'paid'
    }
  ], []);


  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');
  const fgColor = useColorModeValue('darkviolet', 'darkviolet');

  const { sort } = pagination;

  return (
    <>
      { isLoading ?
        <Flex height="70vh" justify="center" alignItems="center">

          <GridLoader color={fgColor}></GridLoader>
        </Flex>
        : <>
          <Text
            fontSize="24px"
            fontWeight="bold" mb="1rem"> All Game Sessions </Text>
            <TableContainer>
              <Table>
                <Thead>
                  <Tr>
                    { columns.map((h) =>
                      <Th key={h.Header}
                          _hover={{
                            'cursor': 'pointer'
                          }}
                          onClick={() => {
                            if(sort !== undefined) {
                              let newSort = sort;
                              
                              if(sort == h.accessor) newSort = '-'+ sort; // to desc
                              else if(sort == '-' + h.accessor) newSort = sort.slice(1, sort.length); // to asc
                              else newSort = h.accessor; // new sort

                              console.log(newSort);

                              setPagination({...pagination, sort: newSort});
                            }                            
                          }}>

                        <Flex alignItems='center'>
                          { h.Header }
                          { h.accessor == sort && <RiArrowDownSFill size='20'/>}
                          { '-' + h.accessor == sort && <RiArrowUpSFill size='20'/>}                                      
                        </Flex>
                      </Th>)}
                    
                    <Th bg={bgColor} style={{
                      "position": "sticky",
                      "top": 0,
                      "right": 0
                    }}> Action </Th>

                  </Tr>
                </Thead>
                <Tbody>
                  {
                    gameSessions.map((s) => {
                      return (
                        <Tr key={s.id}>
                          <Td> {s.id.substring(0, 6)}... </Td>
                          <Td> {s.player} </Td>
                          <Td> {s.inCharge?.substring(0,6)}... </Td>
                          <Td> {s.startTime} </Td>
                          <Td> {s.duration} </Td>
                          <Td> {s.cost} </Td>                                        
                          <Td> {
                            <FaCashRegister
                                  color={s.paid ? "green" : "grey"}
                              size="20px"/>}
                          </Td>
                          <Td bg={bgColor} style={{
                            "position": "sticky",
                            "top": 0,
                            "right": 0
                          }}>

                            <Flex
                              justify="space-around"
                              gap="0.4rem">

                              <RouterLink to={"operation/" + s.id}>
                                <ActionButton>
                                  <AiFillInfoCircle size="20"/>
                                </ActionButton>
                              </RouterLink>                                

                              <ActionButton>
                                <FaCashRegister
                                  size="20"
                                  onClick={async () => {
                                    
                                    const { updatedGameSession, error } = await updateSession(s.id, {
                                      paid: !s.paid
                                    });

                                    if(error === undefined){
                                      toast({
                                        title: `CASH ${updatedGameSession.paid ? 'IN' : 'REVERT'}`,
                                        description: `Cashed ${updatedGameSession.paid ? 'IN' : 'REVERT'} Rs.${s.cost}`,
                                        status: updatedGameSession.paid ? 'success' : 'error',
                                        duration: 3000,
                                        isClosable: true
                                      });                                            
                                    } else {
                                      toast({
                                        title: `CASH REGISTER FAILED`,
                                        description: `Cash Register is not working properly. Please Try again later.`,
                                        status: 'error',
                                        duration: 3000,
                                        isClosable: true
                                      });                                                     
                                    }

                                  }}/>
                              </ActionButton>
                              <PromptActionButton title='Delete'
                                                  content='Are you sure you want delete?'                                
                                                  onClick={ async () => {
                                                    const { gameSession, error } = await deleteSession(s.id);
                                                    if(error === undefined){
                                                      toast({
                                                        title: `Games Session ${gameSession.id} DELETED!`,
                                                        description: `Cashed REVERT successfully`,
                                                        status: 'success',
                                                        duration: 3000,
                                                        isClosable: true
                                                      });                                            
                                                    } else {
                                                      toast({
                                                        title: `Session delete failed`,
                                                        description: `Cash Register is not working properly. Please Try again later.`,
                                                        status: 'error',
                                                        duration: 3000,
                                                        isClosable: true
                                                      });
                                                    }
                                                  }}>
                                <AiFillDelete
                                  _hover={{ color: "red" }}
                                  cursor="pointer"
                                  size="20"
                                />                                                                
                              </PromptActionButton>                              

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
                Array.from({length: pagination.totalPages}, (_,i) => i+1).map((i) =>
                  <Button variant={pagination.page == i ? 'solid' : 'outline'} colorScheme='teal' key={i} onClick={() => { setPagination({...pagination, page: i}); }}>
                    { i }
                  </Button>)
              }    
            </HStack>
            <Box height="0.5rem"></Box>
          </>
      }
    </>
  );


}
