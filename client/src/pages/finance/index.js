import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Text,
  Button,
  Stack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputRightElement,
  Select,
  useColorModeValue,
  useToast
} from '@chakra-ui/react';
import { TransactionService } from '../../Service/TransactionService.js';
import Navbar from '../../components/Navbar.js';
import axios from 'axios';
import config from '../../config/config.js';
import useAuth from '../../hooks/Auth.js';

function FinancePage(props){
  const toast = useToast();
  const source = useRef();
  const destination = useRef();
  const remarks = useRef();
  const amount = useRef();

  const TransactionType = [
    "Income",
    "Expense"
  ];

  const [ transactionType, setTransactionType ] = useState(TransactionType[0]);
  const handleTransactionChange = (e) => setTransactionType(e.target.value);

  const Categories = [
    "Water Bill",
    "Electricity Bill",
    "Internet Bill",
    "Room Rent",
    "Operating",
    "Service",
    "Assets",
    "Food",
    "Other"
  ];

  const category = useRef();
  const dateTime = useRef();

  const { user, userData } = useAuth();
  const [ branch, setBranch ] = useState({branchId: 0});
  useEffect(() => {

    (async () => {
      const options = {
        method: 'GET',
        url: `${config.serverUrl}/api/v1/branch/${userData.branchId}`,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      try {
        let response = await axios.request(options);
        console.log(response.data);
        if(response.data.status === 'success') {
          setBranch(response.data.branch);
        } else {
          setBranch({branchId: 0});          
        }
      } catch(e){
        setBranch({branchId: 0});
      }


    })();
  }, [branch.branchId, userData.id]);

  return (
    <>
      <Navbar/>
      <Box padding={{
        base: "0rem 1rem",
        md: "0rem 4rem",
        lg: "0rem 12rem",
      }}>
        <Box m={"4rem"}></Box>
        <Box
          backgroundColor={branch.backgroundColor}
          w={"100%"}
          h={"4rem"}>
          <Text fontSize="3xl" fontWeight="bold"> {branch.name} </Text>
        </Box>
        <Stack direction={['column']} spacing='24px'>

          <Wrap justify={['center', 'space-between']} align="bottom">

            <WrapItem width={["300px", "300px"]}>
              <FormControl>
                <FormLabel htmlFor='source'> Transaction Source </FormLabel>
                <Input id='source' type='text' ref={source}/>
              </FormControl>
            </WrapItem>

            <WrapItem width={["300px", "300px"]}>
              <FormControl>
                <FormLabel htmlFor='destination'> Transaction Destination </FormLabel>
                <Input id='destination' type='text' ref={destination}/>
              </FormControl>
            </WrapItem>

            <WrapItem width={["300px", "300px"]}>
              <FormControl>
                <FormLabel htmlFor='transactionRemarks'> Transaction Remarks </FormLabel>
                <Input id='transactionRemarks' type='text' ref={remarks}/>
              </FormControl>                
            </WrapItem>
            
          </Wrap>

          <Wrap justify={['center', 'space-between']} align='bottom'>
            <WrapItem width={["300px", "300px"]}>
              <FormControl>
                <FormLabel htmlFor="amount"> Amount </FormLabel>              
                <NumberInput>
                  <NumberInputField id="amount" placeholder='Enter amount' ref={amount}/>
                  <InputRightElement
                    pointerEvents='none'
                    color='gray.300'
                    fontSize='1.2em'
                    children='$'
                  />                          
                </NumberInput>
              </FormControl>
            </WrapItem>

            <WrapItem width={["300px", "300px"]}>
              <FormControl>
                <FormLabel htmlFor="transactionType"> Transaction Type </FormLabel>              
                <Select value={transactionType} onChange={handleTransactionChange} id='transactionType'>
                  {
                    TransactionType.map((t) => <option value={t} key={t}> {t} </option>)
                  }
                </Select>              
              </FormControl>
            </WrapItem>

            <WrapItem width={["300px", "300px"]}>
              <FormControl>
                <FormLabel htmlFor="date"> Transaction Date</FormLabel>
                <input name="" id='date' type="date" ref={dateTime} style={{
                  "color": useColorModeValue("black", "white"),
                  "width": "100%",
                  "padding": "0.4rem 1rem",
                  "backgroundColor": "transparent",
                  "border": "1.2px solid #66666688",
                  "borderRadius": "5px"
                }}/>              
              </FormControl>
            </WrapItem>

          </Wrap>

          <WrapItem width={["300px", "auto"]}>
            <FormControl>
              <FormLabel htmlFor="transactionType"> Transaction Category </FormLabel>              
              <Select id='transactionType' ref={category}>
                {
                  Categories.map((c) => <option value={c} key={c}> {c} </option>)
                }
              </Select>              
            </FormControl>          
          </WrapItem>

          <Button bg="purple" color="white" _hover={{bg: "purple.900"}} onClick={async (e)=> {

            const { transaction, error } =await TransactionService.addTrasaction({
              "source": source.current.value,
              "destination": destination.current.value,
              "remarks": remarks.current.value,
              "amount": amount.current.value,
              "transactionType": transactionType,
              "date": dateTime.current.value,
              "category": category.current.value,
              "doneBy": user.userId,
            }, branch.branchId, user.accessToken);

            if(error != undefined && error != null) {
              error.forEach((e) => {
                toast({
                  title: 'Transaction Add Failed',
                  description: e,
                  status: 'error',
                  duration: 3000,
                  isClosable: true
                });                
              });
            } else {
                toast({
                  title: 'Transaction Added Successfully',
                  description: `Transaction ID: ${transaction.id}`,
                  status: 'success',
                  duration: 3000,
                  isClosable: true
                });                             
            }

          }}>
            Add Transaction
          </Button>
        </Stack>      
      </Box>
    </>
  );


}

export default FinancePage;
