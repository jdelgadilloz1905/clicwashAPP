import React, { Component } from 'react';
import { View, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator,   Header, ImageBackground , Picker } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import PasswordInputText from 'react-native-hide-show-password-input';
 import styles from '../styles/styles.js'; 

import * as Localization from 'expo-localization';
export default class Olvidocontra extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      correo: '', 
 
      respuesta:null,
      id:"5"
    };
  }


  setCorreo = (txt) => {
       let correo =  txt;  
       this.setState({correo});
       
    }


    setContrasena = (txt) => {
         let contrasena =  txt;
         this.setState({contrasena});
       
    }


    login = () => {
          //alert(this.state.correo);


           fetch('htpps://clicwash.com/php/App/olvido_contra.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                correo: this.state.correo
              })

          })

          .then((response) => response.json())
          .then((respuesta) => {
                    

                   // this.obtenerData();

                    if (  respuesta!="Err1" && respuesta!="Err2"  ){
                      
                      alert("Your password was successfully sent");

                    }
                    else {
                      alert("User not Found");
                    }  
          })
               
          .catch((error) => {
          console.error("Error de Conexion");
          });
 

    }

     
 

 render() {

  const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}

  
    return (


      


 
  
      <ImageBackground source={{uri: 'https://clicwash.com/img/App/fondo_azul.jpg'}} style={styles.container}>
 
      <View  >


 


      <Text style={styles.h1} >ENTER YOUR E-MAIL AND WE'LL SEND YOUR PASSWORD </Text>
      
 
 
 

       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Your E-mail"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setCorreo}
      />


      

   
 
      
        <Button
          title="Continue"
          onPress={this.login}  
        />



         
        




      </View>

       </ImageBackground>
    );
  }
}

 