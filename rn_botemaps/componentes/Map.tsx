import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../estilos/GlobalStyles'
import MapView, { Marker } from 'react-native-maps'

export default function Map() {
  return (
    <View style={GlobalStyles.mapContainer}>
            <MapView
              style={GlobalStyles.map}
              initialRegion={{
                latitude:37.177336,
                longitude:-3.598557,
                latitudeDelta:0.09,
                longitudeDelta:0.09
              }}>
                <Marker
                  coordinate={{
                    latitude:37.16943466103486, 
                    longitude:-3.5945388190769076
                }}/>
                <Marker
                  coordinate={{
                    latitude:37.16289507276888, 
                    longitude:-3.6083838037338385
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.193087718201454, 
                    longitude:-3.597455549762542
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.18494211345543, 
                    longitude:-3.5877036423592084
                  }}/> 
                <Marker
                  coordinate={{
                    latitude:37.17176485786807, 
                    longitude:-3.6077893779454886
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.17233794366745, 
                    longitude:-3.598720619076772
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.18410442509377, 
                    longitude:-3.602002905583751
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.18907499642741, 
                    longitude:-3.6069815730457715
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.16382817062564,
                    longitude:-3.5591631883903996
                  }}/>
                <Marker
                  coordinate={{
                    latitude:37.176206987181494, 
                    longitude:-3.588214334152008
                  }}/>
            </MapView>
          </View>
  )
}

const styles = StyleSheet.create({})