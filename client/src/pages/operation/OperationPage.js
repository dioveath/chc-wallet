import {
  Text,
  Box
} from '@chakra-ui/react';
import GameSessionList from '../../components/operation/GameSesssionsList.js';
import GameSessionAddForm from '../../components/operation/GameSessionAddForm.js';
import GameSessionActive from '../../components/operation/GameSessionActive.js';

import { GameSessionContextProvider } from '../../hooks/GameSession.js';

export default function OperationPage(props){

  return (
    <GameSessionContextProvider >
      <Box padding={{
        base: "0rem 1rem",
        md: "0rem 4rem",
        lg: "0rem 12rem",
      }}>
        <GameSessionActive/>
        <GameSessionAddForm/>
        <GameSessionList/>
      </Box>
    </GameSessionContextProvider>
  );

}
