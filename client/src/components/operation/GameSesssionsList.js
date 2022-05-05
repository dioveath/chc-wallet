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

import axios from 'axios';
import useAuth from '../../hooks/Auth.js';
import config from '../../config/config.js';
import useGameSessions from '../../hooks/GameSession.js';

import ActionButton from '../../components/ActionButton.js';


export default function GameSessionList(props){

  const { user, userData } = useAuth();
  const toast = useToast();

  const { isLoading, gameSessions, deleteSession, updateSession } = useGameSessions();

  const columns = useMemo(() => [
    'ID',
    'Player',
    'In Charge',
    'Start Time',
    'Duration',
    'Cost',
    'Paid'
  ], []);


  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');
  const fgColor = useColorModeValue('darkviolet', 'darkviolet');

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
                    { columns.map((h, i) =>
                      <Th key={h}> { h }</Th>)}
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
                              <ActionButton
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
                              </ActionButton>                              

                            </Flex>

                          </Td>

                        </Tr>
                      );
                    })
                  }
                </Tbody>
                <Tfoot>
                  <Tr>
                    { columns.map((h) => <Th key={h}> { h }</Th>)}
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
              {/* { */}
              {/*   Array.from({length: props.pagination.totalPages}, (_,i) => i+1).map((i) => */}
              {/*     <Button variant={props.page == i ? 'solid' : 'outline'} colorScheme='teal' key={i} onClick={() => { props.setPage(i); }}> */}
              {/*       { i } */}
              {/*     </Button>) */}
              {/* }     */}
            </HStack>
            <Box height="0.5rem"></Box>
          </>
      }
    </>
  );


}
