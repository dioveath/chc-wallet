import axios from 'axios';
import config from '../config/config.js';

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateRandomId(len){
  let result = "";
  for(let i = 0; i < len; i++){
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const isValidTransaction = (transaction) => {
    if(transaction.source !== ""
       && transaction.destination !== ""
       && transaction.remarks !== ""
       && transaction.amount !== 0)
      return true;
    return false;
};

const TransactionService = {

  getTrasaction: async (transactionId) => {
    try {
      let response = await axios.get(`${config.serverUrl}/api/v1/transactions/${transactionId}`);
      console.log(response.data);
    } catch(e){
      console.log(e);
    }
  }, 

  addTrasaction: async (transaction, branchCode, accessToken) => {
    try {
      if(!isValidTransaction(transaction)) {
        return       {
          error: [
            "Not valid transaction, Check for empty fields!"
          ]
        };
      }

      let transactionId = generateRandomId(10);

      let options = {
        method: 'POST',
        url: `${config.serverUrl}/api/v1/transactions`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        },
        data: {
          id: transactionId,
          ...transaction,
          branchCode: branchCode
        }
      };

      let response = await axios.request(options);
      console.log("transaction added successfully with id: " + transactionId);
      return {
        transaction: response.data.newTransaction
      };        
    } catch (e){
      return {
        error: e.response.data.errorList
      };
    }
  },

  deleteTransaction: async (transactionId, accessToken) => {
    try {
      let options = {
        method: 'DELETE',
        url: `${config.serverUrl}/api/v1/transactions/${transactionId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + accessToken
        }
      };

      let response = await axios.request(options);
      console.log("transaction deleted successfully of id: " + transactionId);
      return {
        transaction: response.data
      };
    } catch (e){
      return {
        error: e.response.data.errorList
      };
    }    
  }

  
};


export { TransactionService, generateRandomId };
