import {
  Text,
  Box,
  Button,
  Stack,
  Flex,
  Image,
  Wrap,
  WrapItem,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { GridLoader } from 'react-spinners';
import useGameSessions from '../../hooks/GameSession.js';
import { Link as RouterLink } from 'react-router-dom';

import { AiFillInfoCircle, AiFillDelete } from 'react-icons/ai';
import { FaCashRegister } from 'react-icons/fa';
import { IoIosPerson } from 'react-icons/io';
import { MdGames, MdVideogameAssetOff } from 'react-icons/md';

import GameSessionCard from '../../components/GameSessionCard.js';

export default function GameSessionActive(props){
  const toast = useToast();
  const { isLoading, gameSessions, updateSession, deleteSession } = useGameSessions();

  const fgColor = useColorModeValue('darkviolet', 'darkviolet');
  const bgColor = useColorModeValue('white', 'gray.800');

  const activeSessions = gameSessions.filter((g) => !g.paid);

  return (
    <>

      <Text
        fontSize="24px"
        fontWeight="bold" mb="1rem"> Active Sessions </Text>

      { isLoading ?
        <Flex height="70vh" justify="center" alignItems="center">
          <GridLoader color={fgColor}></GridLoader>
        </Flex> :
        <>
          { activeSessions.length == 0 ? <Flex height="30vh" justify="center" alignItems="center" direction="column">
                                           <MdVideogameAssetOff size="50" color="brown"/>
                                           <Text fontSize="24px" fontWeight="700"> No active Sessions! </Text>
                                         </Flex> : <></>}
          <Wrap justify={['center', 'space-between']} spacing='1rem'>
            {
              activeSessions.map((s) => {
                return (<WrapItem key={s.id}>
                          <GameSessionCard session={s}
                                           onCashHandler={async () => {
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
                                           }}
                                           onDeleteHandler={async () => {
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
                                           }}/>
                        </WrapItem>);
              })
            }
          </Wrap>
        </>
      }

    </>
  );

} 
