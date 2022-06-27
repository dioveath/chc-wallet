import {
  Text,
  Box,
  Stack,
  Flex,
  Wrap,
  Button,
  Image,
  useColorModeValue
} from '@chakra-ui/react';

import { AiFillInfoCircle, AiFillDelete } from 'react-icons/ai';
import { FaCashRegister } from 'react-icons/fa';
import { BsHourglassSplit } from 'react-icons/bs';
import { IoIosPerson } from 'react-icons/io';
import { MdGames } from 'react-icons/md';
import { GiCash } from 'react-icons/gi';

import { useState, useEffect } from 'react';
import { getGameSessionRemainingTime } from '../utils/TimeUtils.js';

const EmptyCard = () => {
  return <Box maxW='200px'
              borderRadius='lg'
              bg='gray.800'
              boxShadow='2xl'
              overflow='hidden'>
         </Box>;
};

const Games = [
  {
    name: 'GTA V',
    src: '/gaming/Grand_Theft_Auto_V.png'
  },
  {
    name: 'FIFA',
    src:'/gaming/Fifa_22.jpg'
  },
  {
    name: 'Free Fire',
    src:'/gaming/Free_fire.jpg'
  },
  {
    name: 'The Last of Us: Part I',
    src:'/gaming/The_Last_of_Us_Part_I.jpg'
  },
  {
    name: 'Gran Turismo',
    src:'/gaming/Gran_Turismo.webp'
  },
  {
    name: 'Uncharted 4',
    src:'/gaming/Uncharted_4.jpg'
  },
  {
    name: 'PUBG',
    src:'/gaming/PUBG.jpg'
  },
    
];


export default function GameSessionCard({ session, onCashHandler, onInfoHandler, onDeleteHandler, ...props}){
  const bgColor = useColorModeValue('white', 'gray.800');
  const { player, startTime, duration, platform, game, cost, createdAt } = session;
  const [ remainTime, setRemainTime] = useState('00:00:00');
  const [ overflow, setOverflow] = useState(false);

  const imgSrc = Games.find((g) => g.name == game).src;

  useEffect(() => {
    if(session === undefined) return;

    const intervalId = setInterval(() => {
      let { overflow, remainingTimeStr } = getGameSessionRemainingTime(session);
      setRemainTime(remainingTimeStr);
      setOverflow(overflow);
    }, [1000]);

    return () => clearInterval(intervalId);
    
  }, [remainTime]);



  if(session === undefined) return <EmptyCard/>;
  return (
    <Box maxW='300px'
         borderRadius='lg'
         bg={bgColor}
         boxShadow='2xl'
         overflow='hidden'>

      <Box w="100%" position='relative'>
        <Image src={imgSrc}
               alt={'PlayStation 4 - Charicha Gaming'}
               width="300px" height="300px"
               objectFit="cover"
               transition='all 0.2s ease'/>

        <Text position='absolute'
              bottom='0%' left="50%"
              fontSize="3rem"
              fontWeight='900'
              color={'gray.800'}
              bg={overflow ? 'red.400' : 'green.400'}
              width='100%'
              align='center'
              transform='translate(-50%, 0%)'> {(overflow ? '-' : '') + remainTime} </Text>                
      </Box>

      <Wrap direction='row' spacing='1rem' p='1rem'>
        <Stack direction='row' alignItems='center'>
          <IoIosPerson size='24' color='brown'/> 
          <Text fontSize='1.1rem'
                fontWeight='700'> { player } </Text>                
        </Stack>

        <Stack direction='row' alignItems='center'>
          <MdGames size='24' color='royalblue'/> 
          <Text fontSize='1.1rem'
                fontWeight='700'> { platform } </Text>                
        </Stack>

        <Stack direction='row' alignItems='center'>
          <BsHourglassSplit size='24'/> 
          <Text fontSize='1.1rem'
                fontWeight='700'> { duration } Hour </Text>                
        </Stack>
        <Stack direction='row' alignItems='center'>
          <GiCash size='24' color='yellow'/> 
          <Text fontSize='1.1rem'
                fontWeight='700'> Rs. { cost } </Text>                
        </Stack>                              
      </Wrap>

      <Flex
        justify="space-around">
        <Button
          width="100%"
          borderRadius="0px"
          colorScheme="teal"
          onClick={onCashHandler}
        >
          <FaCashRegister size='24'/>
        </Button>
        <Button
          width="100%"
          borderRadius="0px"
          colorScheme="blue"
        >
          <AiFillInfoCircle size='24'/>
        </Button>                
        <Button
          width="100%"
          borderRadius="0px"
          colorScheme="red"
          onClick={onDeleteHandler}>
          <AiFillDelete size='24'/>
        </Button>                
      </Flex>              
    </Box>);
} 
