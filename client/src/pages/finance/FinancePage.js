import {
  Box,
  Text,
  List,
  ListItem,
  Flex
} from '@chakra-ui/react';
import { GiMoneyStack } from 'react-icons/gi';
import useAuth from '../../hooks/Auth.js';
import { Link as RouterLink } from 'react-router-dom';


function FinancePage(props){

  const { userData } = useAuth();

  return (

    <Box padding={{
      base: "1rem 1rem",
      md: "1rem 4rem",
      lg: "1rem 12rem",
    }} minHeight='70vh'>

      <Text fontSize="1.4rem" fontWeight="700" mb="1rem"> {userData.branch.name } Finance </Text>
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

