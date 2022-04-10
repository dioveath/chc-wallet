import axios from 'axios';

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
      let response = await axios.get(`http://localhost:3000/transactions/${transactionId}`);
      console.log(response.data);
    } catch(e){
      console.log(e);
    }
  }, 

  addTrasaction: async (transaction, branchId) => {
    try {
      if(!isValidTransaction(transaction)) throw "Not valid transaction";
      let transactionId = generateRandomId(10);

      let response = await axios.post("http://localhost:3000/transactions",
                                      {
                                        id: transactionId,
                                        ...transaction,
                                        branchId: branchId
                                      });
      console.log("transaction added successfully with id: " + transactionId);
    } catch (e){
      console.log(e);
    }
  }

  
};


export { TransactionService, generateRandomId };
