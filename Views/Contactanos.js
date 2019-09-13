import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class Perfil extends Component {
  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <Text>- Contactanos-</Text>
        <Button
          title="Salir"
          onPress={() => this.props.navigation.navigate('Inicio')}
        />
      </View>
    );
  }
}
