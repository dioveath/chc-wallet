import Navbar from '../../components/Navbar.js';
import {
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  TableContainer
} from '@chakra-ui/react';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAuth from '../../hooks/Auth.js';
import axios from 'axios';
import config from '../../config/config.js';
import Footer from '../../components/Footer.js';


const ListItem = ({ title, content, ...props }) => {
  if(title === 'date' || title === 'createdAt' || title === 'updatedAt') {
    content = new Date(content).toLocaleString();
  }
  return (<Tr>
            <Td>
              <Text
                fontWeight="600"> { title } </Text>
            </Td>
            <Td>
              <Text> { content } </Text>
            </Td>
          </Tr>);
};


function TransactionPage() {

  const { id } = useParams();
  const { user } = useAuth();
  const [ transaction, setTransaction ] = useState(null);

  useEffect(() => {
    (async () => {

      try {

        const options = {
          method: 'GET',
          url: `${config.serverUrl}/api/v1/transactions/${id}`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + user.accessToken            
          }
        };

        const response = await axios.request(options);

        if(response.data.status != 'fail') {
          setTransaction(response.data.transaction);
        }

      } catch (e){
        console.error(e);
      }

    })();
  }, [id]);

  return (
    <>
      <Box padding={{
        base: "0rem 1rem",
        md: "0rem 4rem",
        lg: "0rem 12rem",
      }}>
        
        <Box m={"1rem"}></Box>
        <Text fontSize="xl" fontWeight="700"> Transaction Details </Text>   
        <Text fontSize="xl" fontWeight="500"> { id } </Text>

        <Box>
          <TableContainer>
            <Table>
              <Tbody>

                {
                  transaction != null ? 
                  Object.keys(transaction).map((prop) => {
                    return <ListItem key={prop} title={prop} content={transaction[prop]}/>;
                  }) : <Text> Loading.... </Text>
                } 

              </Tbody>
            </Table>
          </TableContainer>
        </Box>

      </Box>
    </>
  );

}


export default TransactionPage;
