import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image,ActivityIndicator,Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


export default class Cliente_proximas_ordenes extends Component {

   constructor(props) {
      super(props);
      this.state = { 
      Id_Global: this.props.navigation.state.params.Id_Global,
      Nombre_global:'',
      Nivel_usuario:'',
      validado:'',
      tecnico_status_solicitud:'',
      telefono1:'',
      data: null,
      loaded: true,
      error: null

      };
  }


  baseURL = 'htpps://clicwash.com/php/App/obtener_ordenes_pendientes.php';

  baseURLRemove = 'htpps://clicwash.com/php/App/cancelar_orden_cliente.php';

  getData = (ev) =>{

    this.setState({
      loaded:false, 
      error: null
    });

    let url = this.baseURL + '/comments';
    let h = new Headers();
    h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
    h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
          id: this.state.Id_Global,
          tipo : 'pendiente'
        })
    });
  
    fetch(req)
    .then(response=>response.json())
    .then(this.showData)
    .catch(this.badStuff)
  }

  showData = (data)=>{
    this.setState({loaded:true, data});
    
  }
  badStuff = (err) => {
      this.setState({loaded: true, error: err.message});
  }
  componentDidMount(){
    
      this.getData();
      //geolocation -> fetch
  }

  convertirStatus = (texto) =>{

    let status;
    switch (texto) {
      case 'Pagado': 
        status = 'Pendiente por ejecutar';
        break;

      case 'Analista_asignado': 
        status = 'Tecnico Asignado';
        break;

      case 'en_ejecucion': 
        status = 'En Ejecucion';
        break;

      case 'cerrado_por_tecnico': 
        status = 'Pendiente de Calificar';
        break;

      case 'Cancelada': 
        status = 'Cancelada';
        break;
  
      case 'Caso_cerrado': 
        status = 'Caso cerrado';
        break;
  
      case 'calificado_cliente': 
        status = 'Calificado por cliente';
        break;
  
    }
    return status;

  } 

  removeCita = (id,precio_adelanto,id_usuario,fecha)=>{

    //leer el state
    
    console.log('cita borrar ' + id);
  
    //Obtener copia del state
    const citasActuales = [...this.state.data];

    //borrar el elemento del state 
    const citasResultado = citasActuales.filter(cita => cita.id_cita !== id); //sirve para extraer elemento de un obejto 
    
    //enviar la peticion a la API para eliminar el registro de la base de datos

    this.removeCitaAPI(id,precio_adelanto,id_usuario,fecha,citasResultado);

  }

  removeCitaAPI = (id,precio_adelanto,id_usuario,fecha,citasResultado) =>{

    let url = this.baseURLRemove + '/comments';
    let h = new Headers();
    h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
    h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
          id_cita: id,
          monto_pagado : precio_adelanto,
          id_usuario : id_usuario,
          fecha : fecha
        })
    });
  
    fetch(req)
    .then(response=>response.json())
    .then((respuesta) =>{
      
      
      if (respuesta!=="deny"){
        alert("Una orden de Reembolso fue emitida a su favor y sera ejecutada a la brevedad");
      }
      //actualizar el state
      this.setState({
    
        data : citasResultado
      })  
    })
    .catch((error) =>{
      alert("I didn't connect to the server, try again");
    })
  }

  verConversacion = (id_cita) =>{

    this.props.navigation.navigate('Chat',{id_cita:id_cita, Id_Global : this.state.Id_Global})
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
                      <Text style={styles.title1}>Ordenes Pendientes</Text>
  
                      <Text style={styles.p}></Text>
  
                      {this.state.data.map( pendiente => (
                          <View style={styles.bloqueContenido1} key={pendiente.id_cita}>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Servicio: </Text>
                              <Text>{ pendiente.nombre_paquete }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Fecha de la Cita: </Text>
                              <Text>{ pendiente.dia_semana }, { pendiente.fecha }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Rango de Hora: </Text>
                              <Text>{ pendiente.hora } - { pendiente.hora_cierre }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Estatus: </Text>
                              <Text>{ this.convertirStatus(pendiente.status) }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Direccion de la Cita:</Text>
                              <Text>{ pendiente.direccion_cliente }</Text>
                            </Text>

                            {(pendiente.status =='Analista_asignado' || pendiente.status =='en_ejecucion') && 
                            <View>
                              <Text>
                                <Text style={{fontWeight: 'bold'}} >** Tecnico asignado:</Text>
                                <Text style={{color:'red'}}>{ pendiente.usuario_nombre }</Text>
                              </Text>
                              <Button  style={styles.preciosBoton} 
                                title=" Contactar "
                                onPress={()=>this.verConversacion(pendiente.id_cita)}
                              />
                            </View>  
                            }
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            {(pendiente.status !=='en_ejecucion' && pendiente.status !=='cerrado_por_tecnico') &&
                              <Button  style={styles.preciosBoton} 
                                title=" Cancelar Orden "
                                onPress={()=>this.removeCita(pendiente.id_cita,pendiente.precio_adelanto,pendiente.id_usuario,pendiente.fecha)}
                              />
                            }
                            
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
                      <Text style={styles.title1}>Ordenes Pendientes</Text>
  
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



