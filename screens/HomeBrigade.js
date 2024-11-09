import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import HamburgerButton from './Components/HamburgerButton'
import { SvgUri } from 'react-native-svg'
import DMotor from './DMotor'
import { useNavigation } from '@react-navigation/native'

const HomeBrigade = () => {
    const navigation = useNavigation();
  return (
    <View className="mt-2">
        <HamburgerButton/>
        <View className="justify-center items-center">
        <View className="my-2 pr-1 w-25 p-5 bg-red-100 border-green-200 rounded-3xl">
                      <View className="items-center"> 
                      <View className="items-center">
        <Image
            source={require('../assets/bondap.png')}
            style={styles.tinylogo}
      />
          </View>
                      </View>
      
     
        <Text className="text-5xl font-semibold tracking-tight text-green-900 text-center">Welcome to Brigade Charging Assistant</Text>
        <TouchableOpacity className="bg-green-900  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4 py-2 text-center mb-2 mt-2 justify-center mx-24 items-center" onPress={()=> navigation.navigate('QrScanner')}><Text className="text-white text-lg" >Let's Charge⚡</Text></TouchableOpacity>
        <TouchableOpacity className="bg-red-500  focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4 py-2 text-center mb-7 mt-2 justify-center mx-24 items-center" onPress={()=> navigation.navigate('ChargingStation')}><Text className="text-white text-lg" >Locate Stations⛽</Text></TouchableOpacity>
        <TouchableOpacity className="focus:ring-4 focus:outline-none focus:ring-pink-700 dark:focus:ring-pink-800 font-extrabold rounded-3xl  px-4  text-center mb-2 mt-2 justify-center mx-24 items-center" onPress={()=> navigation.navigate('QrScanner')}></TouchableOpacity>
        </View>
       
      </View>
    <DMotor/>
    </View>
  )
}

export default HomeBrigade

const styles = StyleSheet.create({
    tinylogo: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      marginBottom: 12, 
    }
  })