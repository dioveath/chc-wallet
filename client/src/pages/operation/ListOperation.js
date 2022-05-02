import { AiFillInfoCircle } from 'react-icons/ai';
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

export default function ListOperation(){

  return (

    <Box padding={{
        base: "1rem 1rem",
        md: "1rem 4rem",
        lg: "1rem 12rem",
    }} minHeight='70vh'>

      <List>
        <ListItem>
          <Flex gap='0.5rem'
                shadow="sm"
                border="1px solid grey"
                borderRadius="0.5rem"
                padding="1rem 2rem"
                _hover={{
                  "shadow": 'md',
                  "cursor": 'pointer'
                }}
          >
            <FcSettings size="24"/>
            <RouterLink to={"/operation/chcGam"}>
              <Text fontSize="18px" color="blue.400"> Gaming Sessions </Text>
            </RouterLink>                
          </Flex>
        </ListItem>
      </List>

    </Box>

  );
}
