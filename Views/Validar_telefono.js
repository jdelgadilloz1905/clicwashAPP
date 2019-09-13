import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';

export default class Validar_telefono extends Component {

  constructor(props) {

    super(props)

    this.state = { 
       
      codigo_validacion:'' 
       
      };
  }



  setCodigo = (txt) => {
         let codigo_validacion =  txt;
         this.setState({codigo_validacion});
       
    }

  VerificarCodigo =() => {

    if (this.state.codigo_validacion==this.props.navigation.state.params.codigo_validacion) {
      this.validarUsuario();
      
    }

    else {
      alert("Wrong code")
    }

  }






  validarUsuario = () => {
          //alert(this.state.correo);


           fetch('https://clicwash.com/php/App/validarCode.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
 
                Id_Global: this.props.navigation.state.params.Id_Global
              })

          })

          .then((response) => response.json())
          .then((respuesta) => {
                    
               
                this.props.navigation.navigate('Iniciar_sesion')
    
          })
               
          .catch((error) => {
          console.error("Error de Conexion");
          });
 

    }





// {this.props.navigation.state.params.Id_Global}
 

  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}
    return (

      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 
            <Text style={styles.h2} >  Verify your phone and enter your verification code</Text>

            <TextInput
            style={styles.inputText}
            placeholderTextColor="#fff"
            placeholder="Verification code"
            //onChangeText={(text) => this.setState({text})}
            onChangeText={this.setCodigo}
            />

             
            <Button
              title="Verify"
              onPress={this.VerificarCodigo}  
            />
 
       </View>

      </ImageBackground>
    );
  }
}