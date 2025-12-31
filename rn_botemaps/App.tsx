import { Text, View, FlatList, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import InfoCard from './componentes/InfoCard'
import { listarBotellones } from './utils/Crud'
import { Botellon, Botellones } from './model/Tipos'
import { GlobalStyles as styles } from './estilos/GlobalStyles'

export default function App() {
  const [botellones, setBotellones] = useState<Botellones>([])

  useEffect(accionCargarBotellones, [])

  function accionCargarBotellones() {
    listarBotellones()
      .then(botes => setBotellones(botes))
      .catch(error => mostrarError(error.toString()))
  }

  function mostrarError(error: string) {
    Alert.alert('Error al cargar', error)
  }

  function getBotellon(botellon: Botellon) {
    return <InfoCard item={botellon} />
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
    </View>
  )
}



