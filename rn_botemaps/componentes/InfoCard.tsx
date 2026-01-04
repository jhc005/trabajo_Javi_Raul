import { Pressable, Text, View } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'
import { Botellon } from '../model/Tipos'
import { GlobalStyles, GlobalStyles as styles } from '../estilos/GlobalStyles'

type InfoCardProps = {
  item: Botellon
  abrirDetalleBotellon: (botellon : Botellon) => void
}

export default function InfoCard({ item, abrirDetalleBotellon }: InfoCardProps) {
  return (
    <Pressable
      style={GlobalStyles.card}
      onPress={() => abrirDetalleBotellon (item)}>
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
    </Pressable>
     
    
  )
}

