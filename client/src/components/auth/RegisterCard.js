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
import { useState, useRef } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import AuthService from '../../Service/AuthService.js';


export default function RegisterCard() {
  const [showPassword, setShowPassword] = useState(false);
  const fullName = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const Branches = [
    "chcInstitute",
    "chcGaming",
    "chcProductions"
  ];  

  const [ selectedBranch, setSelectedBranch] = useState(Branches[0]);
  const onBranchChange = (e) => {
    setSelectedBranch(e.target.value);
  };

  const handleSubmit = async (e) => {
    
    var userData = {
      fullName: fullName.current.value,
      email: email.current.value,
      phoneNumber: phoneNumber.current.value,
      password: password.current.value,
      branchId: selectedBranch
    };

    const response = await AuthService.registerUser(userData);

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
              <FormLabel> Branch ID  </FormLabel>
              <Select value={selectedBranch} onChange={onBranchChange}>
                {
                  Branches.map((b) => <option value={b} key={b}> {b} </option>)
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
            <Stack spacing={10} pt={2}>
              <Button
                /* isLoading={} */
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={handleSubmit}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? 
                <RouterLink to="/login"> Login </RouterLink> 
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
