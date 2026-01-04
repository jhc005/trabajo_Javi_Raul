import { Text, View, FlatList, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from './componentes/InfoCard'
import { crearNuevoLugar, listarBotellones } from './utils/Crud'
import { Botellon, Botellones, Formulario } from './model/Tipos'
import { GlobalStyles as styles } from './estilos/GlobalStyles'
import DetalleBotellon from './componentes/DetalleBotellon'
import Add from './componentes/Add'
import CrearBotellon from './componentes/CrearBotellon'

export default function App() {
  //variables de estado
  const [botellones, setBotellones] = useState<Botellones>([])
  const [botellonSeleccionado, setBotellonSeleccionado] = useState<Botellon | undefined>(undefined)
  const [modalCrear,setModalCrear]=useState(false)
  useEffect(accionCargarBotellones, [])


  //funciones
  function accionCargarBotellones() {
    listarBotellones()
      .then(botes => setBotellones(botes))
      .catch(error => mostrarError(error.toString()))
  }
  function abrirDetallesBotellones(botellon : Botellon ){
      setBotellonSeleccionado(botellon)
  }
  function cerrarDetallesBotellon(){
    setBotellonSeleccionado(undefined)
  }

  function abrirCreacion(botellon?:Botellon){
    setModalCrear(true)
  }

  function cerrarCreacion(){
    setModalCrear(false)
  }

  function accionCrear(datos:Formulario){
    crearNuevoLugar(datos)
              .then( nuevoBotellon => {
                setModalCrear(false)
                const nuevoBote = [...botellones, nuevoBotellon]
                setBotellones(nuevoBote)
              })
              .catch(error=>mostrarError(error.toString()))
  }

  function mostrarError(error: string) {
    Alert.alert('Error al cargar', error)
  }

  function getBotellon(botellon: Botellon) {
    return <InfoCard item={botellon} abrirDetalleBotellon={abrirDetallesBotellones}/>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BOTEMAPS</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={botellones}
          keyExtractor={item => item.id}
          renderItem={({ item }) => getBotellon(item)}
          showsVerticalScrollIndicator={true}
        />
      </View>
      {
        botellonSeleccionado !==undefined &&(
          <Modal transparent={false} animationType="slide">
            <DetalleBotellon
              tarjetaSelec={botellonSeleccionado}
              cerrarModal={cerrarDetallesBotellon}/>
          </Modal>
        )
      }
      {
        modalCrear &&(
          <Modal transparent={false} animationType='slide'>
            <CrearBotellon
            aceptar={accionCrear}
            cerrar={cerrarCreacion}/>
          </Modal>
        )
      }
      <Add onPress={abrirCreacion}/>
    </View>
  )
}



