import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useIsFocused, useRoute } from '@react-navigation/native';
import Pomodero from './Components/Pomodero.tsx';
import { onValue, ref } from 'firebase/database';
import { rdb } from '../firebaseConfig.js';
import Timer from './Timer.js';
import HamburgerButton from './Components/HamburgerButton.js';
import { SvgUri } from 'react-native-svg';
import CountDown from 'react-native-countdown-component';

const ResultPage = () => {
    const route = useRoute();
    const {port} = route.params;
    const {cdtimer}=route.params;

    
    const [min, setMins]=useState(0);
    
    const isFocused = useIsFocused();
    useEffect(()=>{
        const fetchref = ref(rdb, `stationdat/station-1/${port}/waitingtime`);
        if(fetchref){
          const onValueChange = (snapshot) => {
              const adata = snapshot?.val();
              const numbe = Number(adata);
              setMins(numbe);
            };
            onValue(fetchref, onValueChange);  
             
        }
    },[]);

    const formatTime = (timeInSec) => {
      const minutes = Math.floor(timeInSec/60)
      .toString()
      .padStart(2,'0');
      const second = (timeInSec % 60).toString().padStart(2,'0');
      return `${minutes}:${second}`;
  }
  const [seconds, setSeconds]=useState(0);
  const [init, setInit]=useState(0);
  useEffect(()=> {
    
    const startFunc = () =>{
      
    };
    

    if(seconds <= 0){
        return;
    }
    const timer = setInterval(()=>{
        setSeconds((prevSeconds) => prevSeconds-1);
    },1000);
  
    return () => clearInterval(timer);
  
  },[seconds]);
    
  return (
    <View>
      <HamburgerButton/>
     
      <View className="my-1 pr-1 w-full p-6 bg-blue-200 border-green-200 rounded-3xl">
        <View className="items-center">
        <SvgUri
      width="42px"
      height="42px"
      uri="https://svgshare.com/i/12Tw.svg"
        />
        </View>
          <Text className="my-3 mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-center">Charging Initiated Successfully</Text>
          
        </View>
        <CountDown
          until={Number(cdtimer*60)}
          onFinish={()=> alert('Battery Charging Completed')}
          timeToShow={['H','M','S']}
          size={20}
        />
        <TouchableOpacity className="bg-green-900  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4 py-2 text-center mb-2 mt-2 justify-center mx-24 items-center" onPress={()=> navigation.navigate('QrScanner')}><Text className="text-white text-lg" >Make Payment 💳</Text></TouchableOpacity>
        
    </View>
  )
}

export default ResultPage