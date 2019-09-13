import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class Tecnicos_pagos_pendientes extends Component {

 


  constructor(props) {
  super(props);
  this.state = { 
    Id_Global: this.props.navigation.state.params.Id_Global,
    Nombre_global:'',
    Nivel_usuario:'',
    validado:'',
    tecnico_status_solicitud:'',
    telefono1:'',
    data: [],
    loaded: true,
    error: null,
    nombre_banco:'',
    cuenta_banco : '',
    nombre_usuario : '',
    monto:''

   };
  }
  baseURL = 'https://clicwash.com/php/App/obtener_datos_lavador.php';
  baseObtenerMontoURL = 'https://clicwash.com/php/App/api_monto_obtener_lavador.php';
  baseSolicitarMontoURL = 'https://clicwash.com/php/App/api_monto_solicitar_lavador.php';

 componentDidMount(){
   
  this.getData();
 }

 getData=()=>{

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
        id_usuario: this.state.Id_Global
        
      })
  });

  fetch(req)
  .then(response=>response.json())
  .then(this.showData)
  .catch(this.badStuff)
 }
 showData = (data)=>{
   
  this.setState({
    loaded:true, 
    nombre_banco: data.cobro_banco,
    cuenta_banco: data.cobro_n_cuenta,
    nombre_usuario:data.cobro_nombre,
    data
    });
  this.obtenerCobro();
  
  
}

showData1 = (data)=>{
   
  this.setState({
     monto : data
    });
}

showData2 = (data)=>{
   
  alert("Su solicitud fue procesada.")
  this.props.navigation.navigate('PaymentTecnicoValidado');
}
badStuff = (err) => {
    this.setState({loaded: true, error: err.message});
}

setNombrebanco= (txt) => {
  let nombre_banco =  txt;
  this.setState({nombre_banco});

}
setCuenta= (txt) => {
  let cuenta_banco =  txt;
  
  this.setState({cuenta_banco});

}
setNombreUsuario= (txt) => {
  let nombre_usuario =  txt;
  this.setState({nombre_usuario});

}

obtenerCobro = () =>{

  let url = this.baseObtenerMontoURL + '/comments';
    let h = new Headers();
    h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
    h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
        id_usuario : this.state.Id_Global
        })
    });
  
    fetch(req)
    .then(response=>response.json())
    .then(this.showData1)
    .catch(this.badStuff)
}

solicitarCobro = () =>{

    let url = this.baseSolicitarMontoURL + '/comments';
    let h = new Headers();
    h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
    h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
        cobro_banco: this.state.cobro_banco,
        cobro_n_cuenta : this.state.cuenta_banco,
        cobro_nombre : this.state.nombre_usuario,
        id_de_usuario : this.state.Id_Global,
        total : this.state.monto
          
        })
    });
  
    fetch(req)
    .then(response=>response.json())
    .then(this.showData2)
    .catch(this.badStuff)
}
  render() {


    const transl = require('../Controllers/traductor.json');
    const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}

      
      return (
        <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
  
           <ScrollView>
  
              <Image
                style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
              /> 
                  <View style={styles.bloqueContenido}  >
                    <Text style={styles.title1}>Pagos Pendientes</Text>
    
                    <Text style={styles.p}></Text>

                    <Text style={styles.title3}>- Solicitar Cobros -</Text>
                    <Text style={styles.p}></Text>
                    <Text style={styles.title4}>- Total: {this.state.monto>0 ? this.state.monto : '0.00'} USD -</Text>
                    <Text style={styles.p}>Debe verificar su informacion bancaria para proceder a realizar el pago: </Text>

                  </View>

                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="#fff"
                    placeholder="Entidad Bancaria"
                    defaultValue={this.state.nombre_banco}
                    onChangeText={this.setNombrebanco}
                  />
  
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="#fff"
                    placeholder="Numero de Cuenta"
                    defaultValue={this.state.cuenta_banco}
                    onChangeText={this.setCuenta}
                  />
  
                  <TextInput
                    style={styles.inputText}
                    placeholderTextColor="#fff"
                    placeholder="Nombre y Apellido del beneficiario"
                    defaultValue={this.state.nombre_usuario}
                    onChangeText={this.setNombreUsuario}
                  />
                  {this.state.monto>0 ? 
                      <Button
                        title="Solicitar Cobro"
                        onPress={this.solicitarCobro}  
                      /> 
                    : <Button
                        title="Solicitar Cobro"
                        disabled
                        onPress={this.solicitarCobro}  
                      />
                }
                  
                
              </ScrollView>
  
              
  
              </ImageBackground>
      );
    }
}



