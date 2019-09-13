


import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import * as Localization from 'expo-localization';
export default class Reserva_5 extends Component {

   constructor(props){
        super(props);
        this.state = {
              latitude:this.props.navigation.state.params.latitude,
              longitud:this.props.navigation.state.params.longitude,
              direccion:this.props.navigation.state.params.direccion,
     
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

              
        }
    }


    componentDidMount(){
         this.definirData();
    }


    definirData =   () => {

      if (this.state.momento_lavado==1) {
        this.setState({momentoShow:"Immediately"});

        this.setState({HoraShow:"- The system will search the available washers in your area within the next 2 hours -"});

        this.setState({fechaShow:" "});

      }

      else {
        
        let fecha_mostrar = "Date: "+this.state.dia_semana+", "+this.state.fecha+", ";

        let hora_mostrar_entrada = this.state.hora_cita_hora+":"+this.state.hora_cita_minutos+" "+this.state.hora_cita_am_pm;

        let hora_mostrar_salida = this.state.hora_cita_hora_salida+":"+this.state.hora_cita_minutos_salida+" "+this.state.hora_cita_am_pm_salida;

        let horario_cita =  "( Between: "+ hora_mostrar_entrada+" - Until: "+hora_mostrar_salida+" )";

        this.setState({momentoShow:"Schedule Washing"});

        this.setState({fechaShow:fecha_mostrar});

        this.setState({HoraShow:horario_cita});

      }
    }


 

    crear_cita = () => { 

           fetch('https://clicwash.com/php/App/crear_cita.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
                latitude: this.state.latitude,
                longitud: this.state.longitud,
                direccion: this.state.direccion,
                momento_lavado: this.state.momento_lavado,
                paquete_titulo: this.state.paquete_titulo,
                paquete_precio: this.state.paquete_precio,
                paquete_id: this.state.paquete_id,
                Id_Global: this.state.Id_Global,
                hora_cita_am_pm_salida: this.state.hora_cita_am_pm_salida,
                hora_cita_minutos_salida: this.state.hora_cita_minutos_salida,
                hora_cita_hora_salida: this.state.hora_cita_hora_salida,
                hora_cita_am_pm: this.state.hora_cita_am_pm,
                hora_cita_minutos: this.state.hora_cita_minutos,
                hora_cita_hora: this.state.hora_cita_hora,
                dia_semana: this.state.dia_semana,
                fecha: this.state.fecha,
                total_vehiculos: this.state.total_vehiculos,
                
              })

          })
          .then((response) => response.json())
          .then((respuesta) => {
                      //alert(respuesta);
                      alert("Successfully created appointment");
                      this.props.navigation.navigate('Perfil')
                      
          })
          .catch((error) => {
                    alert("Try again Later");
          });
    }




  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
 
    return (


      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
   
      <View style={styles.bloqueContenido}>

              <Text style={styles.title1}>Service</Text>

              <Text style={styles.p}>{this.state.paquete_titulo} ( {this.state.paquete_precio} each vehicle  )</Text>

              <Text style={styles.p}>Vehicles: {this.state.total_vehiculos}  </Text>
      </View>

      <View style={styles.bloqueContenido}>

              <Text style={styles.title3}>When do you want to do your washing?</Text>

              <Text style={styles.p}>{this.state.momentoShow}</Text>

              <Text style={styles.p}>{this.state.fecha}</Text>

              <Text style={styles.p}>{this.state.HoraShow}</Text>

      </View>

      <View style={styles.bloqueContenido}>

              <Text style={styles.title3}>Address</Text>

              <Text style={styles.p}>{this.state.direccion}</Text>

      </View>

      <View style={styles.bloqueContenido}>

          <Text style={styles.p}>I certify that my address meets the requirements to perform the contracted activity.</Text>

          <Button style={styles.preciosBoton} 
            title=" Accept and continue "
           
            onPress={this.crear_cita } 
          />

      </View>

        
      </ImageBackground>
    );
  }
}