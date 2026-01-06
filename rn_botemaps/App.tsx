import { Text, View, FlatList, Alert, Modal, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from './componentes/InfoCard'
import { borrarBotellon, crearNuevoLugar, listarBotellones } from './utils/Crud'
import { Botellon, Botellones, Formulario } from './model/Tipos'
import { GlobalStyles as styles } from './estilos/GlobalStyles'
import DetalleBotellon from './componentes/DetalleBotellon'
import Add from './componentes/Add'
import CrearBotellon from './componentes/CrearBotellon'
import Map from './componentes/Map'
import * as Notifications from 'expo-notifications'
import Buscador from './componentes/Buscador'

/*Configuración notificaciones */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
})


export default function App() {
  //variables de estado 
  const [botellones, setBotellones] = useState<Botellones>([])
  const [botellonSeleccionado, setBotellonSeleccionado] = useState<Botellon | undefined>(undefined)
  const [modalCrear, setModalCrear] = useState(false)
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    accionCargarBotellones()
    registrarNotificaciones()
  }, [])

  /*Permisos */
  async function registrarNotificaciones() {
    const { status } = await Notifications.getPermissionsAsync()
    let finalStatus = status

    if (status !== 'granted') {
      const request = await Notifications.requestPermissionsAsync()
      finalStatus = request.status
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permisos', 'No se aceptaron notificaciones')
      return
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      })
    }
  }

  //funciones

  function accionCargarBotellones() {
    listarBotellones()
      .then(botes => setBotellones(botes))
      .catch(error => mostrarError(error.toString()))
  }

  function abrirDetallesBotellones(botellon: Botellon) {
    setBotellonSeleccionado(botellon)
  }

  function cerrarDetallesBotellon() {
    setBotellonSeleccionado(undefined)
  }

  function abrirCreacion() {
    setModalCrear(true)
  }

  function cerrarCreacion() {
    setModalCrear(false)
  }

  function accionCrear(datos: Formulario) {
    crearNuevoLugar(datos)
      .then(nuevoBotellon => {
        setModalCrear(false)
        setBotellones([...botellones, nuevoBotellon])
      })
      .catch(error => mostrarError(error.toString()))
  }

  function borrarBote() {
    Alert.alert(
      `¿Eliminar ${botellonSeleccionado?.nombre}?`,
      'La acción no se podrá revertir',
      [
        { text: 'Si, eliminar', onPress: realizarBorrado },
        { text: 'No, cancelar' },
      ]
    )
  }

  function realizarBorrado() {
    if (botellonSeleccionado) {
      borrarBotellon(botellonSeleccionado)
        .then(() => {
          setBotellones(botellones.filter(b => b.id !== botellonSeleccionado.id))
          setBotellonSeleccionado(undefined)
        })
        .catch(error => mostrarError(error.toString()))
    }
  }

  function mostrarError(error: string) {
    Alert.alert('Error', error)
  }

  function getBotellon(botellon: Botellon) {
    return (
      <InfoCard
        item={botellon}
        abrirDetalleBotellon={abrirDetallesBotellones}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BOTEMAPS</Text>

      <Buscador onSearch={setBusqueda} />

      <Map />

      <View style={styles.listContainer}>
        <FlatList
          data={botellones.filter(b => b.pueblo.toLowerCase().includes(busqueda.toLowerCase()))}
          keyExtractor={item => item.id}
          renderItem={({ item }) => getBotellon(item)}
        />
      </View>

      {botellonSeleccionado && (
        <Modal animationType="slide">
          <DetalleBotellon
            tarjetaSelec={botellonSeleccionado}
            cerrarModal={cerrarDetallesBotellon}
            eliminarBotellon={borrarBote}
            onNuevaReseña={(idBotellon, reseña) => {
              const nuevos = botellones.map(b =>
                b.id === idBotellon
                  ? { ...b, reseña: [reseña, ...(b.reseña || [])] }
                  : b
              )
              setBotellones(nuevos)
              setBotellonSeleccionado(nuevos.find(b => b.id === idBotellon))
            }}
          />
        </Modal>
      )}

      {modalCrear && (
        <Modal animationType="slide">
          <CrearBotellon aceptar={accionCrear} cerrar={cerrarCreacion} />
        </Modal>
      )}

      <Add onPress={abrirCreacion} />
    </View>
  )
}




