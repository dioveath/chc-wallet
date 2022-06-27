import { AiFillInfoCircle } from 'react-icons/ai';
import { MdManageAccounts } from 'react-icons/md';
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Flex,
  List,
  ListItem,
  ListIcon,
  Text
} from '@chakra-ui/react';
import { FcSettings } from 'react-icons/fc';
import useAuth from '../../hooks/Auth.js';


export default function ListOperation(){

  const { userData } = useAuth();

  const listItems = () => {
    const branchCode = userData?.branch?.codeName;
    if(branchCode === undefined) return [];
    switch(branchCode){
    case 'chcGam':
      return [
        {
          to: '/operation/gaming-sessions',
          title: 'Gaming Sessions'
        }
      ];
    default:
      return [];
    }
  };

  return (
    <Box padding={{
        base: "1rem 1rem",
        md: "1rem 4rem",
        lg: "1rem 12rem",
    }} minHeight='70vh'>

      <Text fontSize="1.4rem" fontWeight="700" mb="1rem"> {userData.branch.name } Operations </Text>

      <List>

        { listItems().length == 0 ? <Flex height="30vh" justify="center" alignItems="center" direction="column">
                                      <MdManageAccounts size="50" color="royalblue"/>
                                      <Text fontSize="24px" fontWeight="500"> No Operations yet! </Text>
                                      <Box bg='teal.500' p='1rem' borderRadius='0.5rem' align="center" mt="1rem">
                                        <Text fontSize="1.2rem"> If there is some operations aspect you want here for {userData.branch.name}. </Text>
                                        <Text> You can have meeting with board of { userData.branch.name } and submit a proposal to Charicha Softwares. </Text>
                                      </Box>
                                    </Flex> : <></>}

        {
          listItems().map(item =>
            <ListItem key={item.to}>
              <RouterLink to={item.to}>          
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
                  <FcSettings size="24"/>
                  <Text fontSize="18px" color="red.400"> {item.title} </Text>
                </Flex>
              </RouterLink>
            </ListItem>)
        }

      </List>

    </Box>

  );
}
