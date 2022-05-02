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
import { AiFillDelete } from 'react-icons/ai';

import axios from 'axios';
import useAuth from '../../hooks/Auth.js';
import config from '../../config/config.js';
// import { GameSessionService } from '../../Service/GameSessionService.js';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';
import { GridLoader } from 'react-spinners';
import useGameSessions from '../../hooks/GameSession.js';


export default function GameSessionList(props){

  const { user, userData } = useAuth();
  const toast = useToast();

  const { isLoading, gameSessions, setGameSessions } = useGameSessions();

  const columns = useMemo(() => [
    'ID',
    'Player',
    'In Charge',
    'Start Time',
    'Duration',
    'Cost',
    'Paid'
  ], []);

  const onDeleteHandler = async () => {};

  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');
  const fgColor = useColorModeValue('darkviolet', 'darkviolet');

  return (
    <>
      { isLoading ?
        <Flex height="70vh" justify="center" alignItems="center">
          <GridLoader color={fgColor}></GridLoader>
        </Flex>
        : <>
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
                                onClick={ onDeleteHandler }/>
                              <RouterLink to={"operation/" + s.id}>
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
