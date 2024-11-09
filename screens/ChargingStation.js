import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import MapView, {Callout, Marker } from 'react-native-maps';
import HamburgerButton from './Components/HamburgerButton';
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from '../firebaseConfig';

const ChargingStation = () => {
  const [data, setData]=useState([]);

  const collectRef = collection(db,"collect-2");
  const getReq = async () => {
    const dat = await getDocs(collectRef);
    const filteredData = dat.docs.map((doc)=>({
    ...doc.data(),
    id: doc.id,      
    }));
    setData(filteredData);
  };
  useEffect(()=>{
    getReq();
  },[]);
  return (
    <View className="flex flex-col justify-center py-8">
      <View className="mt-2">
      <HamburgerButton/>
      </View>
      <Text className="mb-4 text-2xl font-semibold tracking-tight text-gray-900 text-center">Charging Stations Near You 🔋</Text>
      <View>
      <MapView
         style={styles.map}
        initialRegion={{
          latitude: 11.080125,
          longitude: 77.135664,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Co-ordinates of the Marker*/}
        { data.map((item)=>(

        <Marker key={item.id} 
        coordinate={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        image={require("../assets/map-marker-brigade.png")}
        >
          <Callout>
            <View style={{padding: 10}}>
              <Text>{item.name}</Text>
              <Text className="text-blue-600">({item.vacantport}/{item.totalport}) Ports Vacant</Text>
            </View>
          </Callout>
        </Marker>
       )) }

        </MapView>
      
      </View>
    </View>
  )
}

export default ChargingStation
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '94%',
    },
  });