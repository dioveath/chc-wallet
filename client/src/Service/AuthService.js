import axios from 'axios';
import config from '../config/config.js';

const AuthService = {

  registerUser: async (userData) => {

    try {
      const response = await axios.post(`${config.serverUrl}/auth/register`,
                                      {
                                        ...userData
                                      });
      return response.data;
    } catch (error){
      console.log(error);
      return {
        error: error
      };
    }

  }
  
};

export default AuthService;
