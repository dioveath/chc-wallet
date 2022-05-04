import { useRef, useState, useEffect } from 'react';
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
} from "@chakra-ui/react";

import axios from 'axios';
import config from '../../config/config.js';
import useAuth from '../../hooks/Auth.js';
import { TransactionService } from '../../Service/TransactionService.js';
import useGameSessions from '../../hooks/GameSession.js';

import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

export default function GameSessionAddForm(props) {
  const toast = useToast();

  const player = useRef();
  const platform = useRef();
  const game = useRef();
  const startTime = useRef();
  const duration = useRef();

  const { user, userData } = useAuth();
  const { addSession } = useGameSessions();

  const Durations = [
    "1 Hour",
    "2 Hour",
    "3 Hour"
  ];

  const Platform = [
    "PS4 Couch",
    "PC Gaming"
  ];


  const timePickerCss = '/custom-rc-time-picker-' + useColorModeValue('light', 'dark') + '.css';
  useEffect(() => {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = timePickerCss;

    head.appendChild(link);
    return () => { head.removeChild(link); };

  }, [timePickerCss]);  

  const onAddHandler = async (e) => {
    
    let startTimeStr = startTime.current.picker.value;
    let splittedTime = startTimeStr.split(':');

    let hour = Durations.findIndex((e) => e === duration.current.value) + 1;
    let startHour = parseInt(splittedTime[0]);

    splittedTime[0] = '' + (startHour + hour) > 12 ? ((startHour + hour) % 12) : (startHour + hour);
    let endTimeStr = splittedTime.join(':');

    let rate = platform.current.value === "PS4 Couch" ? 100 : 50;
    let cost = hour * rate;

    const newSession = {
      player: player.current.value,
      platform: platform.current.value,
      inCharge: user.userId,
      game: game.current.value,
      startTime: startTimeStr,
      duration: hour,
      cost: cost,
      paid: false,
    };

    const { gameSession, error } = await addSession(newSession);

    if(error !== undefined){
      error.forEach((e) => {
        toast({
          title: 'Game Session Start Failed',
          description: e,
          status: 'error',
          duration: 3000,
          isClosable: true
        });                
      });      
    } else {

      const descText = `${gameSession.player.toUpperCase()} started playing ${gameSession.game.toUpperCase()} in 
${gameSession.platform.toUpperCase()} for ${gameSession.duration} Hour`;

      toast({
        title: 'Game Session Started',
        description: descText,
        status: 'success',
        duration: 3000,
        isClosable: true
      });      
    }

  };

  return (
    <>
      <Text
        fontSize="24px"
        fontWeight="bold" mb="1rem"> Add Game Session </Text>
      <Stack direction={['column']} spacing='24px'>
        <Wrap justify={['center', 'space-between']} align="bottom">

          <WrapItem width={["300px", "300px"]}>
            <FormControl>
              <FormLabel htmlFor='player'> Session Player </FormLabel>
              <Input id='player' type='text' ref={player}/>
            </FormControl>
          </WrapItem>

          <WrapItem width={["300px", "300px"]}>
            <FormControl>
              <FormLabel htmlFor='platform'> Session Platform </FormLabel>
              <Select id='platform' ref={platform}>
                {
                  Platform.map((t) => <option value={t} key={t}> {t} </option>)
                }
              </Select>              
            </FormControl>
          </WrapItem>

          <WrapItem width={["300px", "300px"]}>
            <FormControl>
              <FormLabel htmlFor='game'> Session Game </FormLabel>
              <Input id='game' type='text' ref={game}/>
            </FormControl>
          </WrapItem>          


        </Wrap>

        <Wrap justify={['center', 'space-between']} align='bottom'>

          <WrapItem width={["300px", "300px"]}>
            <FormControl>
              <FormLabel htmlFor="duration"> Duration </FormLabel>              
              <Select id='duration' ref={duration}>
                {
                  Durations.map((t) => <option value={t} key={t}> {t} </option>)
                }
              </Select>              
            </FormControl>
          </WrapItem>

          <WrapItem width={["300px", "300px"]}>
            <FormControl>
              <FormLabel htmlFor='sessionStartTime'> Session StartTime </FormLabel>
              <TimePicker
                use12Hours={true}
                ref={startTime}
                onChange={(e) => console.log(e._i)}/>
            </FormControl>
          </WrapItem>

        </Wrap>

        <Button
          bg="purple"
          color="white"
          _hover={{bg: "purple.900"}}
          onClick={ onAddHandler }>
          Add GameSession
        </Button>
      </Stack>      
    </>
  );

  
}
