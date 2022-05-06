import { useContext, createContext, useState, useEffect } from 'react';
import config from '../config/config.js';
import axios from 'axios';
import useAuth from './Auth.js';
import { TransactionService } from '../Service/TransactionService.js';

const transactionContext = createContext();

export default function useTransactions(){
  return useContext(transactionContext);
}

export function TransactionContextProvider(props){
  const { user, userData } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({page: 1, limit: 6, totalPages: 1});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    (async() =>{
      try {
        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/transactions`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken            
          },
          params: {
            limit: pagination.limit,
            page: pagination.page,
            query: {
              'branchCode': userData.branch.codeName
            }
          }
        };

        const response = await axios.request(options);
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
        setLoading(false);
      } catch (e){
        console.log(e);
        setLoading(false);
      }

    })();
  }, [pagination.page]);

  const deleteTransaction = async (id) => {
    if(user == null) throw "You must log in first!";
    const { transaction, error } = await TransactionService.deleteTransaction(id, user.accessToken);
    if(transaction !== undefined) setTransactions(transactions.filter((e) => e.id !== id));
    return { transaction, error };
  };

  const addTransaction = async (session) => {
    if(user == null) throw "You must log in first!";
    const { transaction, error } = await TransactionService.addTransaction(session, userData.branch.codeName, user.accessToken);
    if(transaction !== undefined) setTransactions([...transactions, transaction]);
    return { transaction, error };
  };

  const updateTransaction = async (id, newProps) => {
    if(user == null) throw "You must log in first!";
    const { updatedTransaction, error } = await TransactionService.updateTransaction(id, newProps, user.accessToken);

    if(updatedTransaction !== undefined) {
      for(let i = 0; i < transactions.length; i++){
        if(transactions[i].id != updatedTransaction.id) continue;
        transactions[i] = updatedTransaction;
      }
      setTransactions([...transactions]);
    }

    return { updatedTransaction, error };    
  };

  const contextValue = {transactions, setTransactions, isLoading, deleteTransaction, addTransaction, pagination, setPagination};
  return <transactionContext.Provider value={contextValue} {...props}/>;
}
