import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { generarListaIdsEstrellas } from '../utils/Functions'
import { MaterialIcons } from '@expo/vector-icons'
import { GlobalStyles } from '../estilos/GlobalStyles'

type estrellasProps={
    estrellas: number
    setEstrellas?: (n: number) => void
}

export default function FilaEstrellas({estrellas, setEstrellas}: estrellasProps) {
  
    const estrellasVacias= 5 - estrellas
    const listaEstrellasLlenas= generarListaIdsEstrellas(estrellas)
    const listaEstrellasVacias= generarListaIdsEstrellas(estrellasVacias)

    return (
        <View style={styles.fila}>
            {listaEstrellasLlenas.map((id) => setEstrellas?(
                <Pressable key={`llena-${id}`} onPress={() => setEstrellas(id)}>
                    <MaterialIcons name="star" style={GlobalStyles.fullStar} />
                </Pressable>
                ) : (
                <MaterialIcons key={`llena-${id}`} name="star" style={GlobalStyles.fullStar} />
                ))
            }
            {listaEstrellasVacias.map((id) => setEstrellas?(
                <Pressable key={`vacia${id}`} onPress={() => setEstrellas(estrellas+ id)}>
                    <MaterialIcons name='star' style={GlobalStyles.emptyStar}/>
                </Pressable>
            ) : (
                <MaterialIcons
                key={`vacia-${id}`}
                name = "star"
                style={GlobalStyles.emptyStar}
                />
            )
        )}
        </View>
  )
}

const styles = StyleSheet.create({
    fila:{
        flexDirection:"row",

    },
    

})