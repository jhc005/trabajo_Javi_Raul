import { Platform } from "react-native";
import { Botellon, Botellones, Formulario } from "../model/Tipos";
import axios from 'axios';
import { v4 } from "react-native-uuid/dist/v4";


const IP=Platform.OS==="android" ? "10.0.2.2" : "localhost"

export async function listarBotellones():Promise<Botellones>{
    const url =`http://${IP}:3000/botellones`
    const respuesta = await axios.get(url)
    return respuesta.data
}

export async function crearNuevoLugar(datos:Formulario):Promise<Botellon>{
    const botellon:Botellon={
        id:v4(),
        nombre:datos.nombre,
        ubicacion:datos.ubicacion,
        pueblo:datos.pueblo,
        foto:datos.foto,
        descripcion:datos.descripcion,
        reseña:datos.reseña
    }
    const URL = `http://${IP}:3000/botellones`
    await axios.post(URL,botellon)
    return botellon
}

export async function borrarBotellon(botellon:Botellon){
    const url =`http://${IP}:3000/botellones/${botellon.id}`
    await axios.delete(url)
}



