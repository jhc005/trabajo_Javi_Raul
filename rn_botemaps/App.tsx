import { Text, View, FlatList, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from './componentes/InfoCard'
import { listarBotellones } from './utils/Crud'
import { Botellon, Botellones } from './model/Tipos'
import { GlobalStyles as styles } from './estilos/GlobalStyles'
import DetalleBotellon from './componentes/DetalleBotellon'

export default function App() {
  const [botellones, setBotellones] = useState<Botellones>([])
  const [botellonSeleccionado, setBotellonSeleccionado] = useState<Botellon | undefined>(undefined)
  useEffect(accionCargarBotellones, [])

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
              cerrarModal={cerrarDetallesBotellon}
              onNuevaReseña={(idBotellon, reseña) =>{
                const nuevosBotellones=[]

                for(let i=0; i< botellones.length;i++){
                  const b= botellones[i]

                  const reseñasActuales= b.reseña || []

                  if(b.id == idBotellon){
                    const nuevoBotellon={
                      id: b.id,
                      nombre: b.nombre,
                      ubicacion: b.ubicacion,
                      pueblo: b.pueblo,
                      foto: b.foto,
                      descripcion: b.descripcion,
                      reseña: [reseña].concat(reseñasActuales)
                    }
                    nuevosBotellones.push(nuevoBotellon)
                  }else {
                    nuevosBotellones.push(b)
                  }
                  
                }
                setBotellones(nuevosBotellones)
                
                const actualizado= nuevosBotellones.find(b=> b.id === idBotellon)
                setBotellonSeleccionado(actualizado)
              }}/>
          </Modal>
        )
      }
    </View>
  )
}



