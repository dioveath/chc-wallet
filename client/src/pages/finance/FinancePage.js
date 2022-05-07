import {
  Box,
  Text,
  List,
  ListItem,
  Flex,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import { GiMoneyStack } from 'react-icons/gi';
import useAuth from '../../hooks/Auth.js';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import FinancePieChart from '../../components/finance/FinancePieChart.js';
import { TransactionService } from '../../Service/TransactionService.js';

function FinancePage(props){
  const { user, userData } = useAuth();
  const [ allTransactions, setAllTransactions ] = useState([]);
  const [ incomeTransactions, setIncomeTransactions ] = useState([]);
  const [ expenseTransactions, setExpenseTransactions ] = useState([]);  

  useEffect(() => {
    if(userData.id == 0) return;
    (async()=> {

      const {transactions, error} = await TransactionService.getAllTransactions({
        'branchCode': userData.branch.branchCode,
      }, user.accessToken);

      if(error){
        console.log(error);
        return;
      }

      if(transactions) {
        setAllTransactions(transactions);
        setIncomeTransactions(transactions.filter((t) => t.transactionType == 'Income'));
        setExpenseTransactions(transactions.filter((t) => t.transactionType == 'Expense'));        
      }
      
    })();
  }, [userData.id]);



  return (

    <Box padding={{
      base: "1rem 1rem",
      md: "1rem 4rem",
      lg: "1rem 12rem",
    }} minHeight='70vh'>

      <Flex justifyContent='center'
            alignItems='center'
            gap="1rem"
            wrap="wrap">
        <WrapItem>
          <Box width={{'sm': '350px', 'md': '350px'}}>
            <FinancePieChart transactions={allTransactions}/>
            <Box bg='purple.600' p='0.5rem' borderRadius='0.4rem' my='1rem'>
              <Text align='center' fontSize='1.2rem' fontWeight='600'> Cash Flow Pie Chart </Text>
            </Box>
          </Box>          
        </WrapItem>

        <WrapItem>
          <Box width={{'sm': '350px', 'md': '350px'}}>
            <FinancePieChart transactions={incomeTransactions}/>
            <Box bg='green.600' p='0.5rem' borderRadius='0.4rem' my='1rem'>
              <Text align='center' fontSize='1.2rem' fontWeight='600'> Income Flow Pie Chart </Text>
            </Box>            
          </Box>                  
        </WrapItem>

        <WrapItem>
          <Box width={{'sm': '350px', 'md': '350px'}}>
            <FinancePieChart transactions={expenseTransactions}/>
            <Box bg='red.600' p='0.5rem' borderRadius='0.4rem' my='1rem'>
              <Text align='center' fontSize='1.2rem' fontWeight='600'> Expense Flow Pie Chart </Text>
            </Box>                        
          </Box>                  
        </WrapItem>        

      </Flex>

      <Text fontSize="1.4rem" fontWeight="700" mb="1rem"> {userData?.branch?.name } Finance </Text>
      <List>
        <ListItem>
          <RouterLink to='/finance/manage-transactions'>
            <Flex gap='0.5rem'
                  shadow="sm"
                  border="1px solid grey"
                  borderRadius="0.5rem"
                  padding="1rem 2rem"
                  _hover={{
                    "shadow": 'md',
                    "cursor": 'pointer',
                    "bg": 'gray.700'
                  }}>
              <GiMoneyStack size="24" color='lightgreen'/>
              <Text fontSize="18px" color="green.400"> Manage Finance </Text>
            </Flex>            
          </RouterLink>
        </ListItem>
      </List>
    </Box>
  );
}

export default FinancePage;

