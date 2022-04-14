import { ReactNode } from 'react';
import {
  Link,
  Box,
  Flex,
  Stack,
  Button,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  useColorModeValue,
  useColorMode,
  useDisclosure
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { generateRandomId } from '../Service/TransactionService.js';
import { Link as RouteLink } from 'react-router-dom';
import useAuth from '../hooks/Auth.js';

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700')
    }}
    href={"#"}>
    {children}
  </Link>
);


export default function Navbar () {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, logout, userData } = useAuth(); 

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box> Charicha Finance </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              { user == null ? 
                <>
                  <Button>
                    <RouteLink to="/login">
                      Login                      
                    </RouteLink>
                  </Button>
                  <Button variant='outline'>
                    <RouteLink to="/register">
                      Register
                    </RouteLink>
                  </Button>                          
                </>
                :
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/' + user.userId + ".svg" }
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/' + user.userId + ".svg" }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p> { userData.fullName }</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              }
            </Stack>
          </Flex>
        </Flex>
      </Box>      
    </>
  );
};
