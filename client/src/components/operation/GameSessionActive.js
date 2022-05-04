import {
  Text,
  Box,
  useColorModeValue,
  Flex,
  Image
} from '@chakra-ui/react';
import { GridLoader } from 'react-spinners';
import useGameSessions from '../../hooks/GameSession.js';


export default function GameSessionActive(props){
  
  const { isLoading, gameSessions } = useGameSessions();

  const bgColor = useColorModeValue('#FFFFFF', '#1A202C');
  const fgColor = useColorModeValue('darkviolet', 'darkviolet');

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
          <Box maxW='200px' borderWidth='1px' borderRadius='lg' overflow='hidden'>
            <Image src={'/gaming/Grand_Theft_Auto_V.png'} alt={'PlayStation 4 - Charicha Gaming'} />
          </Box>
        </>

      }
      

    </>
  );

} 
