import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRef } from 'react';
import useAuth from '../../hooks/Auth.js';
import { Link as RouterLink } from 'react-router-dom';


export default function LoginCard() {

  const email = useRef();
  const password = useRef();

  const { login, loading, error } = useAuth();

  const onSubmit = () => {

    login({
      email: email.current.value,
      password: password.current.value
    });

  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={email}/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={password}/>
              </FormControl>
              <Stack spacing={5}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                {error.length !== 0 ?
                 <Box>
                   {error.map((err) => <Text key={err} color='red.500' fontSize='0.8rem'> {err } </Text>)}
                 </Box>
                 : <Box></Box>
                }
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'
                  onClick={onSubmit}
                  isLoading={loading}>
                  Log in
                </Button>
              </Stack>
            </Stack>
            <Flex pt={6} justify="center">
              <Text align={'center'} pr={1}>
                New here? 
              </Text>
              <RouterLink to="/register"> <Text color="blue.400"> Register </Text> </RouterLink> 
            </Flex>          
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
