import React, { Component } from 'react';
import { View, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator, TouchableHighlight,  ImageBackground, Image, Platform  } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import PasswordInputText from 'react-native-hide-show-password-input';
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
 


export default class Perfil extends Component {



 
 
 

 render() {

      // import * as Localization from 'expo-localization';
      const transl = require('../Controllers/traductor.json');
      const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}

  
    return (
      
      <ImageBackground source={require('../assets/fondo_azul.jpg')}  style={styles.container}>

      <View  >



      <Image
          style={{width: 350, height: 150, marginBottom:40  }}
      
          source={require('../assets/logo2.png')} 
        /> 
   
        <Button 
        style={{height: 80 }}  
          title={transl[lang]['inicio_b1']}
           onPress={() => this.props.navigation.navigate('Iniciar_sesion')}
        />

          {Platform.OS !== 'ios' && <Text size={5} />}
         <Button  style={{height: 80 }}
         
          title={transl[lang]['inicio_b2']}
           onPress={() => this.props.navigation.navigate('Registrarse')}
        />

 
      </View>

       </ImageBackground>
    );
  }
}



 
