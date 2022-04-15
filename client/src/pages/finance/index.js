import React, { useState, useRef } from 'react';
import {
  Box,
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
  useColorModeValue
} from '@chakra-ui/react';
import { TransactionService } from '../../Service/TransactionService.js';
import Navbar from '../../components/Navbar.js';

function FinancePage(props){

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


  const dateTime = useRef();

  return (
    <>
      <Navbar/>
      <Box padding={{
        base: "0rem 1rem",
        md: "0rem 4rem",
        lg: "0rem 12rem",
      }}>
        <Box m={"4rem"}></Box>
        <Stack>

          <Wrap justify='space-between' align="bottom">

            <WrapItem>
              <FormControl>
                <FormLabel htmlFor='source'> Transaction Source </FormLabel>
                <Input id='source' type='text' ref={source}/>
              </FormControl>
            </WrapItem>

            <WrapItem>
              <FormControl>
                <FormLabel htmlFor='destination'> Transaction Destination </FormLabel>
                <Input id='destination' type='text' ref={destination}/>
              </FormControl>
            </WrapItem>

            <WrapItem>
              <FormControl>
                <FormLabel htmlFor='transactionRemarks'> Transaction Remarks </FormLabel>
                <Input id='transactionRemarks' type='text' ref={remarks}/>
              </FormControl>                
            </WrapItem>
            
          </Wrap>

          <Wrap justify='space-between' align='bottom'>
            <WrapItem>
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

            <FormControl>
              <FormLabel htmlFor="transactionType"> Transaction Type </FormLabel>              
              <Select value={transactionType} onChange={handleTransactionChange} id='transactionType'>
                {
                  TransactionType.map((t) => <option value={t} key={t}> {t} </option>)
                }
              </Select>              
            </FormControl>

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

          </Wrap>

          <Button bg="purple" color="white" _hover={{bg: "purple.900"}} onClick={(e)=> {

            TransactionService.addTrasaction({
              "source": source.current.value,
              "destination": destination.current.value,
              "remarks": remarks.current.value,
              "amount": amount.current.value,
              "transactionType": transactionType,
              "date": dateTime.current.value
            }, "chcGaming");

          }}>
            Add Transaction
          </Button>
        </Stack>      
      </Box>
    </>
  );


}

export default FinancePage;
