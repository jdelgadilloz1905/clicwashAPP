



import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class OrderAdministrador extends Component {

   static navigationOptions={
        drawerIcon:({}) => (
             <Icon name="ios-water" style={{ color: 'white', fontSize:30 }}/>
        )
    }



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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>- Ordenes del Administrador-</Text>
        <Button
          title="Salir"
          onPress={() => this.props.navigation.navigate('Inicio')}
        />
      </View>
    );
  }
}


 
