import { Pressable, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import React, { useState, useEffect } from "react";
import { Botellon } from "../model/Tipos";
import { GlobalStyles, GlobalStyles as styles } from "../estilos/GlobalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";

type InfoCardProps = {
  item: Botellon;
  abrirDetalleBotellon: (botellon: Botellon) => void;
};

export default function InfoCard({
  item,
  abrirDetalleBotellon,
}: InfoCardProps) {

  //variables de estado
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const cargarFavorito = async () => {
      const favoritos = await AsyncStorage.getItem("favorites");
      const lista = favoritos ? JSON.parse(favoritos) : [];
      setFavorito(lista.includes(item.id));
    };
    cargarFavorito();
  }, [item.id]);

  //funciones notificaciones
  async function programarNotificacion() {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title: "🍻 Botellón",
        body: `El botellón "${item.nombre}" está a punto de empezar`,
        sound: true,
      },
      trigger: {
        type: "calendar",
        hour: 23,
        minute: 0,
        repeats: true,
      } as any,
    });
  }

  //Favoritos
  const apartadoFavorito = async () => {
  try {
    const favoritos = await AsyncStorage.getItem("favorites");
    let lista = favoritos ? JSON.parse(favoritos) : [];

    if (favorito) {
      lista = lista.filter((id: string) => id !== item.id);

      const notifId = await AsyncStorage.getItem(`notif_${item.id}`);
      if (notifId) {
        await Notifications.cancelScheduledNotificationAsync(notifId);
        await AsyncStorage.removeItem(`notif_${item.id}`);
      }
    } else {
      lista.push(item.id);

      try {
        const notifId = await programarNotificacion();
        if (notifId) {
          await AsyncStorage.setItem(`notif_${item.id}`, notifId.toString());
        }
      } catch (error) {
        console.log("Error al programar notificación:", error);
      }
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(lista));
    setFavorito(!favorito);
  } catch (error) {
    console.log("Error en apartadoFavorito:", error);
  }
};


  return (
    <Pressable style={[styles.card, { position: 'relative' }]} onPress={() => abrirDetalleBotellon(item)}>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardSubtitle}>{item.ubicacion}</Text>
        <Text style={styles.cardSubtitle}>{item.pueblo}</Text>
      </View>

      <View style={GlobalStyles.corazon}>
        <TouchableOpacity onPress={apartadoFavorito}>
          <Ionicons
            name={favorito ? "heart" : "heart-outline"}
            size={24}
            color={favorito ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>

      <Image source={item.foto} contentFit="cover" style={styles.image} />
    </Pressable>
  );
}
