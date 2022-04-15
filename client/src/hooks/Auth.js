import { useContext, createContext, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import config from '../config/config.js';

const authContext = createContext();

export default function useAuth(){
  return useContext(authContext);
}

export function AuthProvider(props){
  // first check localStorage if it has already saved token
  let accessToken = localStorage.getItem('accessToken');
  let userId = localStorage.getItem('userId');

  let localUser = null;
  if(accessToken !== null && userId !== null)
    localUser = {userId: userId, accessToken: accessToken};

  const [user, setUser] = useState(localUser);
  const [userData, setUserData] = useState({ id: 0});
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState([]);

  const saveUserToLocal = (user) => {
    localStorage.setItem('accessToken', user.accessToken);
    localStorage.setItem('userId', user.userId);    
  };

  const removeUserLocal = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');    
  };

  const updateToken = () => {

    let token = localStorage.getItem('accessToken');
    if(token == null) return;

    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    if(decodedToken.exp * 1000 < currentDate.getTime()){
      setUser(null);
      setUserData({id: 0});
      removeUserLocal();
    }

  };

  const login = async (loginCreds) => {
    setLoading(true);
    try {
      const response = await axios.post(`${config.serverUrl}/auth/login`, loginCreds);

      if(response.data.status === 'success') {
        let newUser = {
          userId: response.data.userId,
          accessToken: response.data.accessToken          
        };
        setUser(newUser);
        saveUserToLocal(newUser);
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
        console.log('success');
        let newUser = {
          userId: response.data.userId,
          accessToken: response.data.accessToken          
        };
        setUser(newUser);
        saveUserToLocal(newUser);
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
    setUserData({id: 0});
    removeUserLocal();
    setLoading(false);    
  };

  const value = { user, userData, setUserData, updateToken, error, registerError, loading, login, register, logout};

  return <authContext.Provider value={value} {...props} />;
}
