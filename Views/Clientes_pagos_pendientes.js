import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class Clientes_pagos_pendientes extends Component {


  constructor(props) {
  super(props);
  this.state = { 
    Id_Global: '',
    Nombre_global:'',
    Nivel_usuario:'',
    correo: this.props.navigation.state.params.correo,
    validado:'',
    tecnico_status_solicitud:'',
    telefono1:'',
    data: null,
    loaded: true,
    error: null

   };
  }

  baseURL = 'https://clicwash.com/php/App/api_reembolso_cliente.php';

  componentDidMount(){
      
      
    this.getData();
    
  } 

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
          correo: this.state.correo
          
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
                      <Text style={styles.title1}>Reembolsos Pendientes</Text>
  
                      <Text style={styles.p}></Text>
  
                      {this.state.data.map( reembolso => (
                          <View style={styles.bloqueContenido1} key={reembolso.id_reembolso}>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Codigo Pedido: </Text>
                              <Text>{ reembolso.id_pedido }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Monto a reembolsar: </Text>
                              <Text>$ { reembolso.monto }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Fecha Solicitud: </Text>
                              <Text>{ reembolso.fecha_solicitud }</Text>
                            </Text>
                            
                            {(reembolso.status =='emitido') ? 
                            <Text>
                              
                                <Text style={{fontWeight: 'bold'}} >** Fecha Emisión: </Text>
                                <Text>{ reembolso.fecha_emision }</Text>
                              
                                <Text style={{fontWeight: 'bold'}} >** Estatus: </Text>
                                <Text style={{color:'green', fontWeight: 'bold'}}>Su reembolso fue emitido. Debe esperar de 7 a 12 dias laborables para recibir su dinero </Text>
                              
                            </Text>
                              :
                              <Text>
                                <Text style={{fontWeight: 'bold'}} >** Estatus: </Text>
                                <Text style={{color:'red', fontWeight: 'bold'}}>Su solicitud esta siendo procesada por nuestros analistas </Text>
                              </Text>
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
                      <Text style={styles.title1}>Reembolsos Pendientes</Text>
  
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

