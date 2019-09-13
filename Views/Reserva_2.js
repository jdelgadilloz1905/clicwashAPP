


import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet,   Picker} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 

import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';

import * as Localization from 'expo-localization';
export default class Reserva_2 extends Component {

constructor(props){

  super(props)

  this.state= {
    momento_lavado:null,
    mensaje_momento_lavado:null,
    Id_Global: this.props.navigation.state.params.Id_Global,
    paquete_titulo: this.props.navigation.state.params.paquete_titulo,
    paquete_precio: this.props.navigation.state.params.paquete_precio,
    paquete_id: this.props.navigation.state.params.paquete_id,
    total_vehiculos: this.props.navigation.state.params.total_vehiculos,
    hora_cita_am_pm_salida: null,
    hora_cita_minutos_salida: null,
    hora_cita_hora_salida: null,
    hora_cita_am_pm: null,
    hora_cita_minutos: null,
    hora_cita_hora: null,
    dia_semana: null,
    fecha: null
  }

}


 


  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
      
    return (

      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

      <View style={styles.bloqueContenido}>



                <Text style={styles.title1}>When do you want to do your washing?</Text>

                



                  <Picker
                    selectedValue={this.state.momento_lavado}
                    style={{width:'100%'}}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState({momento_lavado: itemValue, mensaje_momento_lavado:'Ok'})
                    }>
                    
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Immediately" value="1" />
                    <Picker.Item label="Schedule Washing" value="2" /> 

                  </Picker>

        

                  {(this.state.momento_lavado!=null && this.state.momento_lavado==1)?  <Button style="marginTop:20" title="Continue"  onPress={() => this.props.navigation.navigate('Reserva_4',{total_vehiculos:this.state.total_vehiculos, Id_Global:this.state.Id_Global , paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado, hora_cita_am_pm_salida:this.state.hora_cita_am_pm_salida, hora_cita_minutos_salida:this.state.hora_cita_minutos_salida, hora_cita_hora_salida:this.state.hora_cita_hora_salida, hora_cita_am_pm:this.state.hora_cita_am_pm, hora_cita_minutos:this.state.hora_cita_minutos, hora_cita_hora:this.state.hora_cita_hora, dia_semana:this.state.dia_semana, fecha:this.state.fecha, paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado  } )}/>:null }

                  {(this.state.momento_lavado!=null && this.state.momento_lavado==2)?  <Button style="marginTop:20" title="Continue"  onPress={() => this.props.navigation.navigate('Reserva_3',{total_vehiculos:this.state.total_vehiculos, Id_Global:this.state.Id_Global , paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado, hora_cita_am_pm_salida:this.state.hora_cita_am_pm_salida, hora_cita_minutos_salida:this.state.hora_cita_minutos_salida, hora_cita_hora_salida:this.state.hora_cita_hora_salida, hora_cita_am_pm:this.state.hora_cita_am_pm, hora_cita_minutos:this.state.hora_cita_minutos, hora_cita_hora:this.state.hora_cita_hora, dia_semana:this.state.dia_semana, fecha:this.state.fecha, paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado } )}/>:null }
 </View>
        </ImageBackground>
    );
  }
}