 
 import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet, ScrollView  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container,  Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
 
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import { Constants } from 'expo';
//import MapContainer from '../maps/containers/map-container';

import MapInput from '../maps/components/map-input';
import MyMapView from '../maps/components/map-view';
import { getLocation } from '../maps/services/location-service';

import Geocoder from 'react-native-geocoder';
import * as Localization from 'expo-localization';

export default class App extends React.Component {


    

  constructor(props){
        super(props);
        this.state = {
              momento_lavado:this.props.navigation.state.params.momento_lavado,
              paquete_titulo: this.props.navigation.state.params.paquete_titulo,
              paquete_precio: this.props.navigation.state.params.paquete_precio,
              paquete_id: this.props.navigation.state.params.paquete_id,
              Id_Global: this.props.navigation.state.params.Id_Global,

              hora_cita_am_pm_salida: this.props.navigation.state.params.hora_cita_am_pm_salida,
              hora_cita_minutos_salida: this.props.navigation.state.params.hora_cita_minutos_salida,
              hora_cita_hora_salida: this.props.navigation.state.params.hora_cita_hora_salida,
              hora_cita_am_pm: this.props.navigation.state.params.hora_cita_am_pm,
              hora_cita_minutos: this.props.navigation.state.params.hora_cita_minutos,
              hora_cita_hora: this.props.navigation.state.params.hora_cita_hora,
              dia_semana: this.props.navigation.state.params.dia_semana,
              fecha: this.props.navigation.state.params.fecha,
              total_vehiculos: this.props.navigation.state.params.total_vehiculos,

              

              latitud:null,
              longitud:null,
              direccion:null,
              region: {},
        }
    }


    componentDidMount() {
    this.getInitialState();
  }

  getInitialState() {
    getLocation().then(data => {
      this.updateState({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
  }

  updateState(location) {
    this.setState({
      region: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      },
    });
  }

  getCoordsFromName(loc) {
    this.updateState({
      latitude: loc.lat,
      longitude: loc.lng,
    });
  }
 
  onMapRegionChange(region) {
    this.setState({ region });
  }




 
    

obtenerDireccion = () => {

     


    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.region.latitude + ',' + this.state.region.longitude + '&key=AIzaSyCjumiePxSvDoNNRl6ee8_GLCeZ3eH_jUM')
        .then(response => response.json())
        .then((responseJson) => {
 
         for(var i=0;i<responseJson.results.length;i++) {
    
                if (responseJson.results[i].formatted_address!=null) {

                  let direccion = responseJson.results[i].formatted_address;

                  this.props.navigation.navigate('Reserva_5',{total_vehiculos:this.state.total_vehiculos, direccion:direccion, latitude:this.state.region.latitude,  longitude:this.state.region.longitude, Id_Global:this.state.Id_Global , paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado, hora_cita_am_pm_salida:this.state.hora_cita_am_pm_salida, hora_cita_minutos_salida:this.state.hora_cita_minutos_salida, hora_cita_hora_salida:this.state.hora_cita_hora_salida, hora_cita_am_pm:this.state.hora_cita_am_pm, hora_cita_minutos:this.state.hora_cita_minutos, hora_cita_hora:this.state.hora_cita_hora, dia_semana:this.state.dia_semana, fecha:this.state.fecha, paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado } )

                  break;
                }
 
           }
     })
 
    

    
 
}




 

  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
      
    return (

   
      <View style={styles.container}>

 
        <View style={{ flex: 1 }}>


        <View style={{ flex: 0.15 }}>
 


          <MapInput    notifyChange={loc => this.getCoordsFromName(loc)} />
        </View>


        {this.state.region['latitude'] ? (
          <View style={{ flex: 1, zIndex:0 }}>
            <MyMapView style={{zIndex:-10}}
              region={this.state.region}
              onRegionChange={reg => this.onMapRegionChange(reg)}
            />
          </View>
        ) : null}



      </View>

        <View style={styles.bloqueContenido}>
 

        <Button style={styles.preciosBoton}  title=" OK "  onPress={this.obtenerDireccion } 
        />

        </View>

                            <View></View>



      </View>

      
    );
  }
}

 
