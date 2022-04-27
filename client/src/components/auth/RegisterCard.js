import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import config from '../../config/config.js';
import useAuth from '../../hooks/Auth.js';


export default function RegisterCard() {
  const [showPassword, setShowPassword] = useState(false);
  const fullName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const branch = useRef();

  const [ branches, setBranches ] = useState([]);
  useEffect(() => {

    (async () => {
      const options = {
        method: 'GET',
        url: `${config.serverUrl}/api/v1/branch`,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      let response = await axios.request(options);
      if(response.data.status === 'success') {
        setBranches(response.data.branches);
      }


    })();
  }, [branches.length]);  

  const { register, loading, registerError } = useAuth(); 
  const handleSubmit = async (e) => {
    
    var userData = {
      fullName: fullName.current.value,
      email: email.current.value,
      phoneNumber: phoneNumber.current.value,
      password: password.current.value,
      branchId: branch.current.value
    };

    register(userData);
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} w={'md'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Register at Charicha
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <Box>
                <FormControl id="fullName" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input type="text" ref={fullName}/>
                </FormControl>
              </Box>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={email}/>
              </FormControl>
              <FormControl id="number" isRequired>
                <FormLabel> Phone Number </FormLabel>
                <Input type="number" ref={phoneNumber}/>
              </FormControl>
              
              <FormControl id="branchId" isRequired>
                <FormLabel> Branch </FormLabel>
                <Select ref={branch}>
                  {
                    branches.map((b) => <option value={b.id} key={b.id}> {b.name} </option>)
                  }
                </Select>                          
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} ref={password}/>
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {registerError.length !== 0 ?
               <Box>
                 {registerError.map((err) => <Text key={err} color='red.500' fontSize='0.8rem'> {err } </Text>)}
               </Box>
               : <Box></Box>
              }            
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  onClick={handleSubmit}
                  isLoading={loading}>
                  Register
                </Button>
              </Stack>
              <Flex pt={6} justify="center">
                <Text align={'center'} pr={1}>
                  Already a user? 
                </Text>
                <RouterLink to="/login"> <Text color="blue.400"> Login </Text> </RouterLink> 
              </Flex>
            </Stack>
          </form>    
        </Box>
      </Stack>
    </Flex>
  );
}
