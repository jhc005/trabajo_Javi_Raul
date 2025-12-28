import { Platform } from "react-native";
import { Botellon, Botellones } from "../model/Tipos";
import axios from 'axios';


const IP=Platform.OS==="android" ? "10.0.2.2" : "localhost"

export async function listarBotellones():Promise<Botellones>{
    const url =`http://${IP}:3000/botellones`
    const respuesta = await axios.get(url)
    return respuesta.data
}

export async function borrarBotellon(botellon:Botellon){
    const url =`http://${IP}:3000/botellones/${botellon.id}`
    await axios.delete(url)
}