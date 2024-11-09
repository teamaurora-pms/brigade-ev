import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import HamburgerButton from './Components/HamburgerButton';
import Qrsc from './Components/Qrsc';
import { SvgUri } from 'react-native-svg';

const QrScanner = ({navigation}) => {

  return (
    <View className="flex flex-col justify-center py-8" style={styles.container}>
        <HamburgerButton/>
        <View className="items-center">
        <SvgUri
      width="42px"
      height="42px"
      uri="https://svgshare.com/i/12TY.svg"
        />
        </View>
        <Text className="mb- text-2xl font-semibold tracking-tight text-gray-900 text-center">Scan QR code near to the Charging Port</Text>
        <Text className="mt-1 font-normal text-gray-500 text-center mb-2">Find and Scan the QR code near to the Charging Port </Text>
        <Qrsc/>
    </View>
  )
}

export default QrScanner

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '50px',
      height: '50px'
    },
    absoluteFillObject: {
      width: '100%',
      height: '100%',
    },
  });
