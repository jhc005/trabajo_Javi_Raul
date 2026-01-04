import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors, GlobalStyles } from '../estilos/GlobalStyles'

type botonProps={
  texto: String
  onPress: () => void
}

export default function Boton({texto, onPress} :botonProps) {
  return (
    <Pressable
      style={({ pressed}) => pressed ? [GlobalStyles.boton, {backgroundColor:"#1E88E5 "}] :GlobalStyles.boton}
      onPress={onPress}>
        <Text style={styles.textoBoton}>{texto}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  
  textoBoton:{
    ...GlobalStyles.text
  }
})