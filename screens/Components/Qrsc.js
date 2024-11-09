import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import InputPage from '../InputPage.js';

import { useNavigation } from '@react-navigation/native';

const Qrsc = () => {
  const navigation = useNavigation();
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, [scanned]);
      
      const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
       navigation.navigate('InputPage',{portname: data,})
        
      };
      if (hasPermission === null) {
        return <Text></Text>;
    }
    if (hasPermission === false) {
        return <Text className="mb- text-2xl font-semibold tracking-tight text-gray-900 text-center">No access to camera</Text>;
    }
  return (
    <View style={styles.container} className="flex flex-col justify-center py-8">
      
        <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned &&  <TouchableOpacity className=" items-center focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4 py-3 text-center mb-5  mt-2 justify-center mx-24" onPress={() => setScanned(false)}><Text className="text-white text-lg">Tap To Scan Again</Text></TouchableOpacity> }
      {/* <TouchableOpacity className="bg-pink-500  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4 py-3 text-center mb-5  mt-2 justify-center mx-24" onPress={() => setScanned(false)}><Text className="text-white text-lg">Tap To Scan Again</Text></TouchableOpacity> */}
    </View>
  )
}

export default Qrsc

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    absoluteFillObject: {
      width: '100%',
      height: '100%',
    },
  });