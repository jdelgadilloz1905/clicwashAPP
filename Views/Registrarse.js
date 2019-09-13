import React, { Component } from 'react';
import { View, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator,   Header, ImageBackground , Picker } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import PasswordInputText from 'react-native-hide-show-password-input';
import styles from '../styles/styles.js'; 
 import * as Localization from 'expo-localization';

export default class Registrarse extends Component {


  constructor(props) {
    super(props);
    this.state = { 
      correo: '', 
      nombre: '',
      contrasena: '',      
      contrasena2: '',
      respuesta:null,
      id:"5",
      nivel_usuario:''
    };
  }


  setCorreo = (txt) => {
       let correo =  txt;  
       this.setState({correo});
       
    }


    setNombre= (txt) => {
         let nombre =  txt;
         this.setState({nombre});
       
    }


    setContrasena = (txt) => {
         let contrasena =  txt;
         this.setState({contrasena});
       
    }

     setContrasena2 = (txt) => {
         let contrasena2 =  txt;
         this.setState({contrasena2});
       
    }


    login = () => {
          //alert(this.state.correo);


           fetch('htpps://clicwash.com/php/App/registrarse.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                correo: this.state.correo,
                nombre: this.state.nombre,
                contrasena: this.state.contrasena,
                contrasena2: this.state.contrasena2,
                nivel_usuario: this.state.nivel_usuario
              })

          })

          .then((response) => response.json())
          .then((respuesta) => {
                    

                   // this.obtenerData();

                    

                    if (  respuesta=="Err1" ) {
                      alert('Incorrect data');
                    }

                    else if (  respuesta=="Err2" ) {
                      alert('Your password does not match');
                    }

                    else if (  respuesta=="Err3" ) {
                      alert('The email already exists');
                    }

                    else if (  respuesta=="Ok" ) {
                      alert('Login to validate');
                      this.props.navigation.navigate('Iniciar_sesion')
                    }


          })
               
          .catch((error) => {
          console.error("Error de Conexion");
          });
 

    }

    guardarData = async (data) => {
      try {
        await AsyncStorage.setItem('Id_global', data.id_usuario);
        await  AsyncStorage.setItem('Nombre_global', data.usuario_nombre);
      } catch (error) {
        alert("No se guardo");
      }
    }


    obtenerData = async () => {
      try {
        const Id_Global = await AsyncStorage.getItem('Id_global');
        if (Id_Global !== null) {
          alert("Id "+Id_Global);
        }
      } catch (error) {
        alert("No se guardo");
      }
    };

 

 render() {

  const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}

  
    return (


    	


 
  
      <ImageBackground source={{uri: 'https://clicwash.com/img/App/fondo_azul.jpg'}} style={styles.container}>
 
      <View  >


 


      <Text style={styles.h1} >CREATE YOUR ACCOUNT: </Text>



      
 
 


  <Picker
  selectedValue={this.state.nivel_usuario}
  style={{width:'100%'}}
  onValueChange={(itemValue, itemIndex) =>
    this.setState({nivel_usuario: itemValue})
  }>
  
  <Picker.Item label="Account Type" value="" />
  <Picker.Item label="Customer" value="3" />
  <Picker.Item label="Washer" value="4" /> 

</Picker>

<TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Your Name"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setNombre}
      />


       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Your E-mail"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setCorreo}
      />


       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Password"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setContrasena}
      />


 <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Repeat your Password"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setContrasena2}
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


 