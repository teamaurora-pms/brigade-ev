import { View, Text } from 'react-native'
import React,{useState} from 'react'
// import { OrbitControls, Preload, useGLTF } from '@react-three/drei/native'
import {Canvas} from '@react-three/fiber/native'
import MotorModel from './Model/MotorModel'
import useControls from "r3f-native-orbitcontrols"
import HamburgerButton from './Components/HamburgerButton'

const DMotor = () => {
  const [isRotating, setIsRotating] = useState(false)
  const [OrbitControls, events] = useControls()
  return (
  
    <View className="w-full h-screen relative -my-24" {...events}> 
        <Canvas
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing' : 'cursor-grab'}`}
        camera={{near: 0.1, far:1000}}
        >
            <directionalLight position={[1,1,1]} intensity={2}/>
            <ambientLight intensity={0.5}/>
            <pointLight/>
            <spotLight/>
            <hemisphereLight
            skyColor="#808080"
            groundColor="#013220"
            intensity={1}
            />
            <OrbitControls
            enableZoom={true}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
            />
            <MotorModel/>
        </Canvas>
    </View>
  )
}

export default DMotor