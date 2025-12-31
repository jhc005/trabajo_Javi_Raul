import { Text, View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { Botellon } from '../model/Tipos'
import { GlobalStyles as styles } from '../estilos/GlobalStyles'

type InfoCardProps = {
  item: Botellon
}

export default function InfoCard({ item }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSubtitle}>{item.ubicacion}</Text>
        <Text style={styles.cardSubtitle}>{item.pueblo}</Text>
      </View>

      <Image
        source={item.foto}
        contentFit='cover'
        style={styles.image}
      />
    </View>
  )
}

