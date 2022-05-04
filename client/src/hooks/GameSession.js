import { useContext, createContext, useState, useEffect } from 'react';
import config from '../config/config.js';
import axios from 'axios';
import useAuth from './Auth.js';
import GameSessionService from '../Service/GameSessionService.js';

const gameSessionContext = createContext();

export default function useGameSessions(){
  return useContext(gameSessionContext);
}

export function GameSessionContextProvider(props){
  const { user } = useAuth();
  const [gameSessions, setGameSessions] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    (async() =>{
      try {
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/game-session`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken            
          }          
        };

        const response = await axios.request(options);
        setGameSessions(response.data.gameSessions);
        setLoading(false);
      } catch (e){
        console.log(e);
        setLoading(false);
      }

    })();
  }, []);

  const deleteSession = async (id) => {
    if(user == null) throw "You must log in first!";
    const { gameSession, error } = await GameSessionService.deleteGameSession(id, user.accessToken);
    if(gameSession !== undefined) setGameSessions(gameSessions.filter((e) => e.id !== id));
    return { gameSession, error };
  };

  const addSession = async (session) => {
    if(user == null) throw "You must log in first!";
    const { gameSession, error } = await GameSessionService.addGameSession(session, user.accessToken);
    if(gameSession !== undefined) setGameSessions([...gameSessions, gameSession]);
    return { gameSession, error };
  };

  const updateSession = async (id, newProps) => {
    
  };

  const contextValue = {gameSessions, setGameSessions, isLoading, deleteSession, addSession};
  return <gameSessionContext.Provider value={contextValue} {...props}/>;
}
