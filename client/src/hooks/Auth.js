import { useContext, createContext, useState } from 'react';
import axios from 'axios';
import config from '../config/config.js';

const authContext = createContext();

export default function useAuth(){
  return useContext(authContext);
}

export function AuthProvider(props){
  const [user, setUser] = useState(null);
  // const [userData, setUserData] = useState({ userId: 0});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState([]);

  const login = async (loginCreds) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.serverUrl}/auth/login`, loginCreds);

      if(response.data.status === 'success') {
        setUser({
          userId: response.data.userId,
          accessToken: response.data.accessToken
        });
        setError([]);
      } else {
        setUser(null);
        setError(response.data.errorList);
      }

      setLoading(false);
    } catch (e){
      setLoading(false);      
      setError([e.message]);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.serverUrl}/auth/register`, userData);

      if(response.data.status === 'success') {
        setUser({
          userId: response.data.userId,
          accessToken: response.data.accessToken
        });
        setRegisterError([]);
      } else {
        setUser(null);
        setRegisterError(response.data.errorList);
      }

      setLoading(false);
    } catch (e){
      setLoading(false);      
      setRegisterError([
          e.message
        ]);      
    }    
  };

  const logout = async() => {
    setLoading(true);    
    setUser(null);
    setLoading(false);    
  };

  const value = { user, error, registerError, loading, login, register, logout};

  return <authContext.Provider value={value} {...props} />;
}
