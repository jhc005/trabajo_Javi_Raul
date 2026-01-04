
export type Botellon = {
    id:string,
    nombre:string
    ubicacion: string
    pueblo:string
    foto:string
    descripcion:string
    reseña: Reseña[]
}

export type Formulario = {
    nombre:string
    ubicacion: string
    pueblo:string
    foto:string
    descripcion:string
    reseña:Reseña[]
}

export type Botellones = Array<Botellon>

export type Reseña={
    id: string
    comentario: string
    fecha: string 
    puntuacion: number
}

export type Reseñas = Array<Reseña>