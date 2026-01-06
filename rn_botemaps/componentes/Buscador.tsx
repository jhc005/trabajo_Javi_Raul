import React from 'react'
import { TextInput, View } from 'react-native'
import { GlobalStyles } from '../estilos/GlobalStyles'

type BuscadorProps = {
  onSearch: (query: string) => void
}

export default function Buscador({ onSearch }: BuscadorProps) {
  return (
    <View style={GlobalStyles.searchBarContainer}>
      <TextInput
        style={GlobalStyles.searchBarInput}
        placeholder="Buscar por zona..."
        onChangeText={onSearch}
      />
    </View>
  )
}