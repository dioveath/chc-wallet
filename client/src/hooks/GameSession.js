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
  const [pagination, setPagination] = useState({page: 1, limit: 6, totalPages: 1, sort: 'updatedAt'});  
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
          },
          params: {
            ...pagination
          }
        };

        const response = await axios.request(options);
        setGameSessions(response.data.gameSessions);
        setPagination({ ...pagination, ...response.data.pagination });
        setLoading(false);
      } catch (e){
        console.log(e);
        setLoading(false);
      }

    })();
  }, [pagination.page, gameSessions.length, pagination.sort]);

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
    if(user == null) throw "You must log in first!";
    const { updatedGameSession, error } = await GameSessionService.updateGameSession(id, newProps, user.accessToken);

    if(updatedGameSession !== undefined) {
      for(let i = 0; i < gameSessions.length; i++){
        if(gameSessions[i].id != updatedGameSession.id) continue;
        gameSessions[i] = updatedGameSession;
      }
      setGameSessions([...gameSessions]);
    }

    return { updatedGameSession, error };    
  };

  const contextValue = {gameSessions, setGameSessions, isLoading, deleteSession, addSession, updateSession, pagination, setPagination};
  return <gameSessionContext.Provider value={contextValue} {...props}/>;
}
