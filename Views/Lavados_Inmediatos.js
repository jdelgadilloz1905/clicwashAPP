 

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
import DateTimePicker from "react-native-modal-datetime-picker"; 

export default class Lavados_Agendados extends Component {


  constructor(props) {
      super(props);
      this.state = { 
        Id_Global: this.props.navigation.state.params.Id_Global,
        data : [],
        loaded: true,
        error: null
      };
  }

  getData=()=>{

    this.setState({
      loaded:false, 
      error: null
    });
    
    fetch('https://clicwash.com/php/App/obtener_citas_inmediata.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                id_usuario: this.state.Id_Global
              })

          })
    
          .then((response) => response.json())
          .then(this.showData)               
          .catch(this.badStuff);

  }

  showData = (data) =>{

    
    this.setState({loaded:true, data});
    
  }
  badStuff = (err) => {
    this.setState({loaded: true, error: err.message});
  }

  componentDidMount(){

    this.getData();
  }
 

  tomarCita = (index)=>{
    
    let id_analista = this.state.Id_Global;
    let id_cita = this.state.data[index]["id_cita"];
    
    console.log(id_cita);
    console.log(id_analista);

  
        fetch('https://clicwash.com/php/App/api_tomar_cita.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                id_analista : id_analista, 
                id_cita : id_cita,
                tipo : "inmediato"
              })

          })

          .then((response) => response.json())
          .then((respuesta) => {
                    
              
              
              //leer y obtener copia del state

              const citasActuales = [...this.state.data];

              //borrar el elemento del state 
              const citasResultado = citasActuales.filter(cita => cita.id_cita !== id_cita);

              this.setState({

                  data : citasResultado
              }) 

              alert("Buen trabajo.");
              this.props.navigation.navigate('InicioTecnicoValidado');
 
          })
               
          .catch((error) => {
          alert("Try Again later" + error.message);
          });

    
    
  }

  render() {
    const transl = require('../Controllers/traductor.json');
      const lang = (Localization.locale).substr(0,2);
      

    if(this.state.data && this.state.data.length >0){
      return (
        
        <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
  
              <ScrollView>
  
                  <Image
                    style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                    source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                  /> 
                  <View style={styles.bloqueContenido}  >
                      <Text style={styles.title1}>Solicitudes Inmediatas</Text>
  
                      <Text style={styles.p}></Text>
  
                      {this.state.data.map( (schedule, index) => (
                          <View style={styles.bloqueContenido1} key={schedule.id_cita}>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Fecha de la cita: </Text>
                              <Text>{ schedule.dia_semana +" "+ schedule.fecha.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1') }</Text>
                            </Text>
                            
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Rango de Hora: </Text>
                              <Text>{ schedule.hora } - { schedule.hora_cierre }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Cliente: </Text>
                              <Text>{ schedule.usuario_nombre }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Distancia: </Text>
                              <Text>{ schedule.distancia_entre_puntos } Millas</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Direccion de la Cita:</Text>
                              <Text>{ schedule.direccion_cliente }</Text>
                            </Text>
                            <View>
                              <Text style={{fontWeight:'bold', alignItems:'center'}}>
                                ¿A que hora puedes asistir?
                                
                              </Text>
                              

                                  {Platform.OS !== 'ios' && <Text size={5} />}
                                  <Button 
                                    title="Aceptar solicitud" 
                                    onPress={()=>this.tomarCita(index)} 
                                    containerStyle={{height: 100}}
                                  
                                  />
                            </View>
                            
                            
                            
                            
                        </View>
                        ))
                    }
                    
                  </View>
                </ScrollView>
        </ImageBackground>
      );
    }else{

      return (
        <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
  
              <ScrollView>
  
                  <Image
                    style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                    source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                  /> 
                  <View style={styles.bloqueContenido}  >
                      <Text style={styles.title1}>Solicitudes Inmediatas</Text>
  
                      <Text style={styles.p}></Text>
                      
                      <Text style={{fontWeight:'bold'}}>- No se encontraron resultados -</Text>
  
                      <Text style={styles.p}></Text>
                  </View>
                </ScrollView>
        </ImageBackground>
      );
    }
    
  }
}



