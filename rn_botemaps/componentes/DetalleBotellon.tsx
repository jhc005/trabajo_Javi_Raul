import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Colors, GlobalStyles } from '../estilos/GlobalStyles'
import { Botellon, Reseña, Reseñas } from '../model/Tipos'
import { Image } from 'expo-image'
import ReviewCard from './ReviewCard'
import FilaEstrellas from './FilaEstrellas'
import Boton from './Boton'
import { v4 } from 'react-native-uuid/dist/v4'

type DetalleBotellonProps={
    tarjetaSelec: Botellon
    cerrarModal: () => void
    onNuevaReseña:(id: string, reseña: Reseña) => void
}
type NuevaReseña={
  comentario: string
  puntuacion: number
}

export default function DetalleBotellon({tarjetaSelec, cerrarModal, onNuevaReseña} :DetalleBotellonProps) {
  //const [reseñas, setReseñas] = useState<Reseña[]> (tarjetaSelec.reseña ?? [])
  const [puntuacion, setPuntuacion] =useState(0)
  const [comentario, setComentario]=useState("")

  function getReseña(reseña: Reseña){
    return <ReviewCard item={reseña} estrella={reseña.puntuacion}/>
  }
  function crearReseña(datos: NuevaReseña){
    const reseña:Reseña ={
      id: v4(),
      comentario: datos.comentario,
      fecha: new Date().toISOString(),
      puntuacion: datos.puntuacion
    }
    return reseña
  }
  function nuevaReseña(){
    if(puntuacion ===0 || comentario.trim()=== "") return
    const nuevaReseña= crearReseña({
      comentario,
      puntuacion,
      
    })
    onNuevaReseña(tarjetaSelec.id, nuevaReseña)

    setPuntuacion(0)
    setComentario("")
  }
  return (
    <View style={styles.contenedor}>
      <View style={{paddingHorizontal:25, width:"100%" , flex:1}}>
        <Text style={GlobalStyles.title}>{tarjetaSelec.nombre}</Text>
      <Image
        source={tarjetaSelec.foto}
        contentFit="cover"
        style={styles.imagen}/>
        <View style={GlobalStyles.textContainer}>
          <Text style={GlobalStyles.cardSubtitle}>{tarjetaSelec.descripcion}</Text>
        </View>
        
        <View style={GlobalStyles.listContainer}>
          <FlatList
            data={tarjetaSelec.reseña || []}
            keyExtractor={item => item.id}
            renderItem={({item}) => getReseña(item)}
            ListEmptyComponent={<Text style={GlobalStyles.text}>No hay reseñas todavia</Text>}/>
        </View>
        <View style={GlobalStyles.reviewContainer}>
          <FilaEstrellas estrellas={puntuacion} setEstrellas={setPuntuacion}/>
          <View style={GlobalStyles.fila}>
            <TextInput
            style={GlobalStyles.textInput}
            placeholder='comentario'
            placeholderTextColor={Colors.placeholder}
            value={comentario}
            onChangeText={setComentario}/>
            <View style={styles.botonAñadir}>
              <Boton
              texto={"AÑADIR"}
              onPress={nuevaReseña}/>
            </View>
            
          </View>
          
        </View>
        <View style={styles.botonSalir}>
          <Boton
          texto={"SALIR"}
          onPress={cerrarModal}/>
        </View>
      </View>
        
    </View>
  )
}

const styles = StyleSheet.create({
    contenedor:{
        ...GlobalStyles.container,
        rowGap: 10,
       
    },
    imagen:{
        ...GlobalStyles.detailImage,
        
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center"
    },
    botonSalir:{
      ...GlobalStyles.boton,
      justifyContent:"center",
      alignItems:"center",
      marginTop:20,
      paddingVertical:2,
      marginBottom:10,
      marginLeft:10,
      marginRight:10
    },
    botonAñadir:{
      ...GlobalStyles.boton,
      paddingHorizontal:12,
      minHeight:44,
      justifyContent:"center"

    },
    contenedorFlatlist:{
      ...GlobalStyles.listContainer,
      marginTop:10,
      marginBottom:10
    },
    

})