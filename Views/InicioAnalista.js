import React, { Component } from 'react';
import { Image, View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground ,TouchableHighlight  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';

import * as Localization from 'expo-localization';
import styles from '../styles/styles.js'; 


export default class InicioAnalista extends Component {

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
                <Text style={styles.title1}>Control Panel</Text>

                <Text style={styles.p}>Seleccione a Continuacion, la opcion a procesar</Text>
               
                <Text style={styles.p}></Text>
        
                <Button  style={styles.preciosBoton}
                  title="Solicitudes de Ingreso"
                   onPress={() => this.props.navigation.navigate('Analist_tecnicos_por_verificar')} 
                />

                 <Text style={styles.p}></Text>

                                <Button  style={styles.preciosBoton}
                                  title="Bannear Usuarios"
                                   onPress={() => this.props.navigation.navigate('Analist_bannear_usuarios')} 
                                />

                 <Text style={styles.p}></Text>

                



                </View>


                

               
            </ScrollView>


            <View style={{flexDirection:'row', backgroundColor: '#EFFDFF', width:'100%', alignItems: 'center'}}>
        
              <TouchableHighlight underlayColor="white" onPress={()=>{ Linking.openURL('https://www.instagram.com/clicwash/')} }>
              <Image
                style={{width: 30, height: 30,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/instagram.png'}}
              /> 
              </TouchableHighlight>


              <TouchableHighlight underlayColor="white" onPress={()=>{ Linking.openURL('https://www.facebook.com/clic.wash.14')} }>
              <Image
                style={{width: 30, height: 30,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/facebook.png'}}
              /> 
              </TouchableHighlight>


              <TouchableHighlight underlayColor="white" onPress={()=>{ Linking.openURL('https://api.whatsapp.com/send?phone=14072336137')} }>
              <Image
                style={{width: 30, height: 30,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/btn_whatsapp.png'}}
              /> 
              </TouchableHighlight>




        </View>

            

            </ImageBackground>
    );
  }
}



