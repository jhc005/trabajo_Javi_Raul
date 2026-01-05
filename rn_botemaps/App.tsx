import { Text, View, FlatList, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from './componentes/InfoCard'
import { borrarBotellon, crearNuevoLugar, listarBotellones } from './utils/Crud'
import { Botellon, Botellones, Formulario } from './model/Tipos'
import { GlobalStyles, GlobalStyles as styles } from './estilos/GlobalStyles'
import DetalleBotellon from './componentes/DetalleBotellon'
import Add from './componentes/Add'
import CrearBotellon from './componentes/CrearBotellon'
import MapView, { Marker } from 'react-native-maps'
import Map from './componentes/Map'

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

  function borrarBote(){
    Alert.alert(
      `Esta seguro de que quiere borrar ${botellonSeleccionado?.nombre}?`,
      "La accion no se podra revertir",
      [
        {text:"Si, eliminar", onPress:realizarBorrado},
        {text:"No, cancelar"}
      ]
    )
  }

  function realizarBorrado(){
    if(botellonSeleccionado!==undefined){
      borrarBotellon(botellonSeleccionado)
          .then(()=>{
            const nuevaLista = botellones.filter(lugar=>lugar.id !== botellonSeleccionado.id)
            setBotellones(nuevaLista)
            setBotellonSeleccionado(undefined)
          })
          .catch(error=>mostrarError(error.toString()))
    }
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
      <Map/>
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

              eliminarBotellon={borrarBote}
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



