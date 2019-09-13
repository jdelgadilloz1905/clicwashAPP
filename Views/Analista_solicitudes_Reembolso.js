



 

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class Analista_solicitudes_Reembolso extends Component {

 


  constructor(props) {
  super(props);
  this.state = { 
  Id_Global: '',
  Nombre_global:'',
  Nivel_usuario:'',
  validado:'',
  tecnico_status_solicitud:'',
  telefono1:''

   };
  }

 

  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}


    return (
      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                        <ScrollView>

            <Image
          style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
          source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
        /> 
               <View style={styles.bloqueContenido}  >
                <Text style={styles.title1}>Solicitudes de Reembolso</Text>

                <Text style={styles.p}></Text>
 

                <Text style={{fontWeight:'bold'}}>- No se encontraron resultados -</Text>



                <Text style={styles.p}></Text>

                </View>
                
 
   

 

               
            </ScrollView>

            

            </ImageBackground>
    );
  }
}

