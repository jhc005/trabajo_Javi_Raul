import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../estilos/GlobalStyles'
import { Reseña } from '../model/Tipos'
import FilaEstrellas from './FilaEstrellas'
import dayjs from 'dayjs'

type reviewCardProps={
    item: Reseña
    estrella: number
}

export default function ReviewCard({item, estrella} :reviewCardProps) {

    return (
    <View style={styles.cardModificada}>
        <FilaEstrellas
            estrellas={estrella}/>
        <View style={styles.filaModificada}>
            <Text style={GlobalStyles.cardSubtitle}>{dayjs(item.fecha).format("DD/MM/YYYY")}</Text>
            <View style={GlobalStyles.textContainer}>
                <Text style={GlobalStyles.cardSubtitle}>{item.comentario}</Text>
            </View>
        </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    cardModificada:{
        ...GlobalStyles.card,
        flexDirection:"column"
    },
    filaModificada:{
        ...GlobalStyles.fila,
        flexDirection:"column"
    }
})