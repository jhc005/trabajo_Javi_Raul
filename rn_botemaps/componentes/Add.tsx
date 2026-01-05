import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { GlobalStyles } from '../estilos/GlobalStyles'

type Props = {
    onPress: () => void 
}

export default function Add({onPress}:Props) {
  return (
    <Pressable style={GlobalStyles.pressIcono} onPress={onPress}>
        <MaterialIcons name="add" style={GlobalStyles.icono}/>
    </Pressable>
  )
}

const styles = StyleSheet.create({})