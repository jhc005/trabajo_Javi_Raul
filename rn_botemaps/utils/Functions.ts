export const generarListaIdsEstrellas = ( numero:number):number[] => {
    
    return Array.from({length:numero}, (_,index) => index + 1)
}