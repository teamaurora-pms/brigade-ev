import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'
import { onValue, ref, set } from 'firebase/database';
import { rdb } from '../firebaseConfig';
import { SvgUri } from 'react-native-svg';
import BatteryPercent from './Components/BatteryPercent';
const InputPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {portname} = route.params;

  const [data, setData] = useState([]);
  
  const [ratedPower, setRatedPower] = useState('');
  const [batteryPercent, setBatteryPercent] = useState('');
  const [noOfCell, setNoOfCell] = useState('');

  const [destination, setDestination]= useState('');
  const [isOccupied, setOccupied]= useState('');
  const [waitingtime, setWaitingtime] = useState('');

  const [changer,setChanger]=useState(0);
  const handleTextChangeDesc = (text) =>{
    setDestination(text);
  };
  const handleTextChangeWait = (text) =>{
    setWaitingtime(text);
  };
  const startCharging = () => {
    firebasePush();
    navigation.navigate('ResultPage',{port: portname, cdtimer: waitingtime,});
  };

  useEffect(()=>{
    const fetchref = ref(rdb, 'batterydat/');
    onValue(fetchref, (snapshot)=>{
      const adata = snapshot?.val();
      const batdat = Object.keys(adata).map(key => ({
        id: key,
        ...adata[key]
      }));
      
      setData(batdat);
      
     const timeout = setTimeout(()=>{
      setChanger(changer+1);
     },2000)
     
      setRatedPower(data[0]?.ratedPower);
      setBatteryPercent(data[0]?.batteryPercent);
      setNoOfCell(data[0]?.noOfCell);
      
      return () => clearTimeout(timeout);

    });
  },[changer]);

  const firebasePush = () =>{
    const pushCapacity = ref(rdb, `stationdat/station-1/${portname}/batterycapacity/`);
    const pushPercent = ref(rdb, `stationdat/station-1/${portname}/batterypercent/`);
    const pushDestination = ref(rdb, `stationdat/station-1/${portname}/destination/`);
    const pushCell = ref(rdb, `stationdat/station-1/${portname}/noOfCell/`);
    const pushWaiting = ref(rdb, `stationdat/station-1/${portname}/waitingtime/`);
    set(pushCapacity,ratedPower);
    set(pushPercent,batteryPercent);
    set(pushDestination, destination);
    set(pushCell, noOfCell)
    set(pushWaiting, waitingtime)
  }


  return (
    <View className="min-h-full flex items-center justify-center py-12 px-6">
        <ScrollView className="max-w-md w-full space-y-8 ">
          
        <View>
          <View className="items-center">
        <Image
            source={require('../assets/bondap.png')}
            style={styles.tinylogo}
      />
          </View>
            <Text className="mt-2 text-center text-3xl font-extrabold text-gray-900">Welcome To Station - 1</Text>
            <Text className="mt-1 text-center text-sm text-gray-600">Now, you have selected {portname}</Text>
        </View>
            <View className="mt-8 space-y-6">
              <View className="rounded-md shadow-sm -space-y-px">
               { data.map((item, index)=>{
                  return(
                    <View key={index} className="my-1 pr-1 w-full p-6 bg-green-200 border-green-200 rounded-3xl ">
                      <View className="items-center"> 
      <SvgUri
    width="42px"
    height="45px"
    uri="https://svgshare.com/i/12Qx.svg"
      />
                      </View>
      <BatteryPercent progress={item.batteryPercent/100}/>
     
        <Text className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">Current Battery Percent is {item.batteryPercent}%</Text>
        <Text className="font-normal text-gray-500">Rated Voltage: {item.ratedVoltage}V        Rated Current: {item.ratedCurrent}A</Text>
        <Text className="font-normal text-gray-500">Capacity: {item.ratedPower}Ah              Number of Cells: {item.noOfCell}</Text>
       
      </View>)
                  }) }
              
                <View>
                  <Text>Destination: </Text>
                  <TextInput
                  label="Destination"
                  value={destination}
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-3 my-2 border border-gray-400
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  keyboardType="numeric"
                  defaultValue={destination}
                  placeholder='Destination'
                  onChangeText={handleTextChangeDesc}
                  />
                </View>
                <View>
                <Text>Waiting Time (in mins): </Text>
                  <TextInput
                  label="Waiting Time"
                  value={waitingtime}
                  className="appearance-none rounded-none relative block
                  w-full px-3 py-3 my-2 border border-gray-400
                  placeholder-gray-500 text-gray-900 rounded-t-md
                  focus:outline-none focus:ring-indigo-500
                  focus:border-indigo-500 focus:z-10 sm:text-sm"
                  keyboardType="numeric"
                  defaultValue={waitingtime}
                  placeholder='Waiting Time'
                  onChangeText={handleTextChangeWait}
                  />
                </View>
                  
                  <TouchableOpacity className="bg-pink-500  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4 py-3 text-center mb-5  mt-2 justify-center mx-24 items-center" onPress={startCharging}><Text className="text-white text-lg">Start Charging⚡</Text></TouchableOpacity>
              </View>
            </View>
        </ScrollView>
    </View>
  )
}

export default InputPage

const styles = StyleSheet.create({
  tinylogo: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginBottom: 12, 
  }
})