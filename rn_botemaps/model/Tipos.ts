
export type Botellon = {
    id:string,
    nombre:string
    ubicacion: string
    pueblo:string
    foto:string
    descripcion:string
    reseña:Array<String>
}

export type Formulario = {
    nombre:string
    ubicacion: string
    pueblo:string
    foto:string
    descripcion:string
    reseña:Array<String>
}

export type Botellones = Array<Botellon>