import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Formulario, Reseñas } from '../model/Tipos'
import Boton from './Boton'
import { Image } from 'expo-image'
import { GlobalStyles } from '../estilos/GlobalStyles'

type Props = {
    aceptar: (datos:Formulario) => void
    cerrar: () => void
}

export default function CrearBotellon({aceptar,cerrar}:Props) {
    //variables de estado 
    const [nombre,setNombre]= useState("")
    const [ubicacion,setUbicacion]= useState("")
    const [pueblo,setPueblo]= useState("")
    const [foto,setFoto]= useState("")
    const [descripcion,setDescripcion]= useState("")
    const [reseña,setReseña]= useState<Reseñas>([])

    //funciones
  function cogerDatos():Formulario{
    return {nombre,ubicacion,pueblo,foto,descripcion,reseña}
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1 }}>
      <View style={GlobalStyles.formContainer}>
        <Text style={GlobalStyles.formTitle}>AÑADIR BOTELLON NUEVO</Text>
        <Image source={foto} contentFit='cover' style={GlobalStyles.imagePreview}/>
        <TextInput
          value={nombre}
          onChangeText={setNombre}
          style={GlobalStyles.textInput}
          placeholder='Nombre del botellon'
          placeholderTextColor={"#9ca3af"}
        />
        <TextInput
          value={ubicacion}
          onChangeText={setUbicacion}
          style={GlobalStyles.textInput}
          placeholder='Ubicacion(Calle o zona)'
          placeholderTextColor={"#9ca3af"}
        />
        <TextInput
          value={pueblo}
          onChangeText={setPueblo}
          style={GlobalStyles.textInput}
          placeholder='Nombre del pueblo'
          placeholderTextColor={"#9ca3af"}
        />
        <TextInput
          value={foto}
          onChangeText={setFoto}
          style={GlobalStyles.textInput}
          placeholder='URL foto'
          placeholderTextColor={"#9ca3af"}
        />
        <TextInput
          value={descripcion}
          onChangeText={setDescripcion}
          style={GlobalStyles.textInput}
          placeholder='Descripcion'
          placeholderTextColor={"#9ca3af"}
        />
        <TextInput
          value={reseña as any}
          onChangeText={setReseña as any}
          style={GlobalStyles.textInput}
          placeholder='Reseña (dejar vacia)'
          placeholderTextColor={"#9ca3af"}
        />
        <View style={GlobalStyles.buttonsContainer}>
          <Boton texto='Aceptar' onPress={()=>aceptar(cogerDatos())}/>
          <Boton texto='Cancelar' onPress={cerrar}/>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({})