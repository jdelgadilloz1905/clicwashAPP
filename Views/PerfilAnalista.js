 
import React, { Component } from 'react';
import { Image, View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground , Linking  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';

import * as Localization from 'expo-localization';
import styles from '../styles/styles.js'; 


export default class PerfilAnalista extends Component {

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
                <Text style={styles.title1}>- Profile -</Text>

                <Text style={styles.title3}> Categoria de su cuenta: Analista </Text>



                <View style={styles.bloqueContenido}  >
                  
                   <Text style={styles.p}>Para opciones administrativas avanzadas, se recomienda el uso del Ordenador y acceder a traves desde nuestro sitio web oficial</Text>
                   <Text style={styles.p}>  </Text>
                   <Text style={styles.p}>- CLICWASH.COM - </Text>
                   <Text style={styles.p}>  </Text>
                  
                </View>

               <Text style={styles.p}></Text><Text style={styles.p}></Text>


                </View>

               
            </ScrollView>

            

            </ImageBackground>
    );
  }
}




