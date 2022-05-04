import axios from 'axios';
import config from '../config/config.js';

const GameSessionService = {

  addGameSession: async (session, accessToken) => {

    try {
      const options = {
        method: 'POST',
        url: `${config.serverUrl}/api/v1/game-session`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        },
        data: {
          ...session
        }
      };

      let response = await axios.request(options);
      return {
        gameSession: response.data.newGameSession
      };

    } catch (error){
      console.log(error);
      return {
        error: error.response.data.errorList
      };
    }

  },


  deleteGameSession: async (id, accessToken) => {
    try {
      let options = {
        method: 'DELETE',
        url: `${config.serverUrl}/api/v1/game-session/${id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      };

      let response = await axios.request(options);
      console.log("Game Session deleted successfully of id: " + id);
      return {
        gameSession: response.data
      };
    } catch (e){
      return {
        error: e.response.data.errorList
      };
    }    
  }

  

};


export default GameSessionService;