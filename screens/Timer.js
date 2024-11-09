import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Pomodero from './Components/Pomodero.tsx';
import { useIsFocused } from '@react-navigation/native';



const Timer = (props) => {
  const init = props.input;
  const [seconds, setSeconds]=useState(0);
  const [fullran, setFullran]=useState(0);
  
  const [start, setStart]=useState(0);

  const isFocused = useIsFocused();
  useEffect(()=> {
    const startFunc = () =>{
      if(start == 0){
        setSeconds(init);
        setFullran(init);
        setStart(start+1);
      }
    };
    startFunc();

    if(seconds <= 0){
        return;
    }
    const timer = setInterval(()=>{
        setSeconds((prevSeconds) => prevSeconds-1);
    },1000);
  
    return () => clearInterval(timer);
  
  },[seconds]);

  //Format Time in HH:MM:SS
  const formatTime = (timeInSec) => {
    const minutes = Math.floor(timeInSec/60)
    .toString()
    .padStart(2,'0');
    const seconds = (timeInSec % 60).toString().padStart(2,'0');
    return `${minutes}:${seconds}`;
}

  return (
    <View>
      
      <Pomodero progress={seconds} fullrange={fullran} text={formatTime(seconds)} />
    
      <Text>{seconds} {fullran} {init}</Text>
      <Text className="mx-44 text-4xl">{String(isFocused)}</Text>
    </View>
  )
}

export default Timer