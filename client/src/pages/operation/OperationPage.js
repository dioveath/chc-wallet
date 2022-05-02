import {
  Text
} from '@chakra-ui/react';
import GameSessionList from '../../components/operation/GameSesssionsList.js';
import { GameSessionContextProvider } from '../../hooks/GameSession.js';

export default function OperationPage(props){

  return (
    <GameSessionContextProvider >
      <GameSessionList/>
    </GameSessionContextProvider>
  );

}
