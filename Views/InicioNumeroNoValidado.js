import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class InicioNumeroNoValidado extends Component {

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

 

  setCodigo = (txt) => {
       let codigo_validacion =  txt;  
       this.setState({codigo_validacion});
       
    }
    

   static navigationOptions={
        drawerIcon:({}) => (
             <Icon name="ios-water" style={{ color: 'white', fontSize:30 }}/>
        )
    }


    setTelefono1 = (txt) => {
      //hacer validacion del numero de telefono que sea numerico
         let telefono1 =  txt;
         this.setState({telefono1});
       
    }


    senCode = () => {
          //alert(this.state.correo);


           fetch('https://clicwash.com/php/App/sendCode.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
             
                telefono1: this.state.telefono1,
                Id_Global: this.props.Id_Global
              })

          })

          .then((response) => response.json())
          .then((respuesta) => {
                    
 
                     // this.props.navigation.navigate('Perfil');

                      if (  respuesta!="Deny" ) {
                    
                        this.setCodigo(respuesta);
                        this.props.navigation.navigate('Validar_telefono',{Id_Global:this.props.Id_Global,codigo_validacion:this.state.codigo_validacion});
 
                      }

                      else {
                        alert('Try another number');
                      }
    
          })
               
          .catch((error) => {
          alert('Try again');
          });
 

    }


  render() {

    const transl = require('../Controllers/traductor.json');
    const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}


    return (
      <ImageBackground style={{ opacity: 0.9 }} source={{uri: 'https://png.pngtree.com/thumb_back/fw800/back_pic/04/01/47/975801a66f01a3f.jpg'}} style={styles.container}>

                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                 
                      <Text style={styles.h2} >   {transl[lang]['valid_number']}</Text>

                      <TextInput
                      style={styles.inputText}
                      placeholderTextColor="#fff"
                      placeholder="Your Phone Number"
                      //onChangeText={(text) => this.setState({text})}
                      onChangeText={this.setTelefono1}
                      />

                       
                      <Button
                        title="Send Code"
                        onPress={this.senCode}  
                      />



                 
                      </View>

   </ImageBackground>
    );
  }
}



