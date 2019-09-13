 

import React, { Component } from 'react';
import { Image, View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground , Linking  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';

import * as Localization from 'expo-localization';
import styles from '../styles/styles.js'; 


export default class PaymentCliente extends Component {

    constructor(props) {

    super(props)

    this.state = { 
       
      Nombre_global:'',
      Nivel_usuario:'',
      validado:'',
      tecnico_status_solicitud:'',
      telefono1:'',
      codigo_validacion:null,

       };
  
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
                <Text style={styles.title1}>Reembolsos Procesados</Text>
 

                <Text style={styles.p}>Seleccione la Opcion a Consultar</Text>

                <Text style={styles.p}></Text>

                </View>
                <View style={styles.bloqueContenido}  >

                <Text style={styles.p}></Text>

   

                <Button  style={styles.preciosBoton} 
                              title=" Reembolsos Pendientes "
                               
                              onPress={() => this.props.navigation.navigate('Clientes_pagos_pendientes',{correo:this.props.correo}) }
                />



                <Button  style={styles.preciosBoton} 
                              title=" Historico de Reembolsos "
                               
                              onPress={() => this.props.navigation.navigate('Clientes_historico_pagos',{correo:this.props.correo})}
                />


               <Text style={styles.p}></Text><Text style={styles.p}></Text>


                </View>

               
            </ScrollView>

            

            </ImageBackground>
    );
  }
}





 



 



 

