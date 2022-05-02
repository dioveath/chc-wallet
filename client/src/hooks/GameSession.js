import { useContext, createContext, useState, useEffect } from 'react';
import config from '../config/config.js';
import axios from 'axios';
import useAuth from './Auth.js';

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

  const deleteSession = (id) => {
  };

  const addSession = (id) => {
  };

  const contextValue = {gameSessions, setGameSessions, isLoading, deleteSession, addSession};
  return <gameSessionContext.Provider value={contextValue} {...props}/>;
}
