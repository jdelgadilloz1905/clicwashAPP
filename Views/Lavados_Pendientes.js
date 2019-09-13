 import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


export default class Lavados_Pendientes extends Component {


  constructor(props) {
      super(props);
      this.state = { 
        Id_Global: this.props.navigation.state.params.Id_Global,
        data : [],
        loaded: true,
        error: null,
        asistir:'AM',
        textoHora:null
      };
  }

  getData=()=>{

    this.setState({
      loaded:false, 
      error: null
    });
    
    fetch('https://clicwash.com/php/App/obtener_ordenes_pendientes.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                id: this.state.Id_Global,
                tipo : "lista_pendiente_lavador"
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
 

  cancelarCita = (id_cita) => {

    fetch('https://clicwash.com/php/App/cancelar_cita_tecnico.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
              id_cita: id_cita
                
              })

          })

          .then((response) => response.json())
          .then((respuesta) =>{

            if(respuesta !== true){
              alert("Error, actualizando la cita")
            }else{
              //leer y obtener copia del state

              const citasActuales = [...this.state.data];

              //borrar el elemento del state 
              const citasResultado = citasActuales.filter(cita => cita.id_cita !== id_cita);

              this.setState({

                  data : citasResultado
              })

              //this.props.navigation.navigate('InicioTecnicoValidado')
            }
            
          })               
          .catch(this.badStuff);
  }

  verConversacion = (id_cita) =>{


    this.props.navigation.navigate('Chat',{id_cita:id_cita, Id_Global : this.state.Id_Global})
  }

  heLlegado = (id_cita, index) =>{

    
    fetch('https://clicwash.com/php/App/tecnico_iniciar_limpieza.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
              id_cita: id_cita
                
              })

          })

          .then((response) => response.json())
          .then((respuesta) =>{
            
            let dataResultado = [ ...this.state.data ];
            dataResultado[index] = {...dataResultado[index], status: "en_ejecucion"};
            this.setState({ data : dataResultado });
            //this.props.navigation.navigate('InicioTecnicoValidado')
          })               
          .catch(this.badStuff);
  
  }

  gestionarServicio = (id_cita)=>{
    
    this.props.navigation.navigate('Gestion_Servicios',{id_cita:id_cita});
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
                      <Text style={styles.title1}>Lavados Pendientes</Text>
  
                      <Text style={styles.p}> </Text>
            
                      {this.state.data.map( (schedule, index) => (
                          <View style={styles.bloqueContenido1} key={schedule.id_cita}>
                            <Text>
                            
                              <Text style={{fontWeight: 'bold'}} >** Hora de la cita: </Text>
                              <Text>{ (schedule.tipo_pedido ==2 ? schedule.tecnico_hora_asistir : schedule.tiempo ) } </Text>
                            </Text>
                            
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Cliente: </Text>
                              <Text>{ schedule.usuario_nombre }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Direccion de la Cita:</Text>
                              <Text>{ schedule.direccion_cliente }</Text>
                            </Text>

                            {schedule.status =="Analista_asignado" && (
                               <View>
                                    <Button 
                                        title="Cancelar cita" 
                                        onPress={()=>this.cancelarCita(schedule.id_cita)} 
                                        color= 'red'
                                    />
                                     {Platform.OS !== 'ios' && <Text size={5} />}
                                    <Button 
                                      title="Ver conversación" 
                                      onPress={()=>this.verConversacion(schedule.id_cita)} 
                                      
                                     />
                                     {Platform.OS !== 'ios' && <Text size={5} />}
                                    <Button 
                                      title="He llegado al sitio del cliente" 
                                      onPress={()=>this.heLlegado(schedule.id_cita, index)} 
                                      color= 'green'
                                    />
                               </View> 
                            )}

                              {schedule.status=="en_ejecucion"  && (
                                <View>
                                  <Button
                                  title="Administrar" 
                                  onPress={()=>this.gestionarServicio(schedule.id_cita)} 
                                  color= 'green'
                                  />
                                </View>  
                                )}
                              
                            
                            
                            
                            
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
                      <Text style={styles.title1}>Lavados Pendientes</Text>
  
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



