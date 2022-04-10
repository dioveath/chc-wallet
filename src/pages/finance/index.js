import React, { useState } from 'react';
import { Box, Button, Stack, HStack, FormControl, FormLabel, FormHelperText, Input, NumberInput, NumberInputField, InputGroup, InputRightElement, Select } from '@chakra-ui/react';
import { TransactionService } from '../../Service/TransactionService.js';


function FinancePage(props){

  const [ source, setSource ] = useState('');
  const handleSourceChange = (e) => setSource(e.target.value);

  const [ destination, setDestination ] = useState('');
  const handleDestinationChange = (e) => setDestination(e.target.value);

  const [ remarks, setRemarks ] = useState('');
  const handleRemarksChange = (e) => setRemarks(e.target.value);

  const [ amount, setAmount ] = useState(0);
  const handleAmountChange = (e) => setAmount(e.target.value);      

  const TransactionType = [
    "Income",
    "Expense"
  ];

  const [ transactionType, setTransactionType ] = useState(TransactionType[0]);
  const handleTransactionChange = (e) => setTransactionType(e.target.value);

  const [ dateTime, setDateTime ]  = useState(Date.now());
  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  return (
    <Box padding="0rem 12rem">
      <Stack>

        <HStack>

          <FormControl>
            <FormLabel htmlFor='source'> Transaction Source </FormLabel>
            <Input id='source' type='text' value={source} onChange={handleSourceChange}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='destination'> Transaction Destination </FormLabel>
            <Input id='destination' type='text' value={destination} onChange={handleDestinationChange}/>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor='transactionRemarks'> Transaction Remarks </FormLabel>
            <Input id='transactionRemarks' type='text' value={remarks} onChange={handleRemarksChange}/>
          </FormControl>                
          
        </HStack>

        <HStack>
          <InputGroup>
            <NumberInput>
              <NumberInputField placeholder='Enter amount' value={amount} onChange={handleAmountChange}/>
              <InputRightElement
                pointerEvents='none'
                color='gray.300'
                fontSize='1.2em'
                children='$'
              />                          
            </NumberInput>
          </InputGroup>

          <Select value={transactionType} onChange={handleTransactionChange}>
            {
              TransactionType.map((t) => <option value={t} key={t}> {t} </option>)
            }
          </Select>

          <input name="" type="date" value={dateTime} onChange={handleDateTimeChange}/>
        </HStack>

        <Button bg="purple" color="white" _hover={{bg: "purple.900"}} onClick={(e)=> {

          TransactionService.addTrasaction({
            "source": source,
            "destination": destination,
            "remarks": remarks,
            "amount": amount,
            "transactionType": transactionType,
            "date": dateTime
          }, "chcInstitute");

        }}>
          Add Transaction
        </Button>
      </Stack>      
    </Box>

  );


}

export default FinancePage;
