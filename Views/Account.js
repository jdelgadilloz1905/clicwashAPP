import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


import InicioNumeroNoValidado from '../Views/InicioNumeroNoValidado'; 
import InicioTecnicoNoValidado from '../Views/InicioTecnicoNoValidado'; 

import PerfilTecnicoValidado from '../Views/PerfilTecnicoValidado';
import PerfilCliente from '../Views/PerfilCliente'; 
import PerfilAdministrador from '../Views/PerfilAdministrador'; 
import PerfilAnalista from '../Views/PerfilAnalista'; 


export default class Account extends Component {

 
 

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



  componentDidMount(){
         this.obtenerData();
    }

    



  obtenerData = async () => {
      try {
        const Id_Global = await AsyncStorage.getItem('Id_global');
        const Nombre_global = await AsyncStorage.getItem('Nombre_global');
        const Nivel_usuario = await AsyncStorage.getItem('Nivel_usuario');
        const validado = await AsyncStorage.getItem('validado');
       // const tecnico_status_solicitud = await AsyncStorage.getItem('tecnico_status_solicitud');
        if (Id_Global !== null) {
          this.setState({Id_Global});
          this.setState({Nombre_global});
          this.setState({Nivel_usuario});
          this.setState({validado});
         // this.setState({tecnico_status_solicitud});

        }
      } catch (error) {
        alert("No se guardo");
      }
    };





  render() {

    

    // import * as Localization from 'expo-localization';
      const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // transl[lang]['inicio_b1']

                  if (this.state.Nivel_usuario==1) {

                  return (  

                  <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                         <PerfilAdministrador/> 

                  </ImageBackground>


                   );

                  }



                  else if (this.state.Nivel_usuario==2)  {

                  return ( 

                  <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                    <PerfilAnalista/> 

                    </ImageBackground> );

                  }



                  else if (this.state.Nivel_usuario==3) {


                        if (this.state.validado==0) {

                          return (

                          <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                           <InicioNumeroNoValidado/> 

                          </ImageBackground> );

                        }

                        else {
                          return ( 

                            <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                            <PerfilCliente/> 

                            </ImageBackground>
                             );
                        }

                  }



                  else  {


                        if (this.state.validado==0) {

                          return ( <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                            <InicioNumeroNoValidado/> 

                            </ImageBackground> );

                        }

                        else {

                                  if (this.state.tecnico_status_solicitud==0) {

                                    return ( <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                                      <PerfilTecnicoValidado/> 

                                      </ImageBackground> );

                                  }

                                  else {

                                    return ( <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                                      <InicioTecnicoNoValidado/> 

                                     </ImageBackground> );

                                  }

                        }

                  }
      
  }


}

 

 


