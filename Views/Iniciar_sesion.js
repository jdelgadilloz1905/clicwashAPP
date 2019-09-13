
// Aqui el video que explica como hacer el login de Fb https://www.youtube.com/watch?v=ThcelIFSMWQ

// https://docs.expo.io/versions/latest/sdk/facebook/

import React, { Component } from 'react';
import { View, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator,   Header, ImageBackground , Picker, Platform } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import PasswordInputText from 'react-native-hide-show-password-input';
import styles from '../styles/styles.js'; 
import * as Facebook from 'expo-facebook';
import * as Localization from 'expo-localization';


export default class Registrarse extends Component {


  constructor(props) {
    super(props);
    this.state = { 
      correo: '', 
      contrasena: '',
      respuesta:null,
      id:"5",
      tipo:"normal",
      id_fb:null,
      name:null,


    };
  }


  logInFb = async (data) =>  {
  try {
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync('2252210438376206', {
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      
      // Get the user's name using Facebook's Graph API
      
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,id,email`);

      var userInfo = await response.json();

      var id_fb = userInfo.id;

      var name = userInfo.name;

      var correo = userInfo.email;

      var tipo="Face";


      this.setState({name});

      this.setState({id_fb});

      this.setState({correo});

      this.setState({tipo});

      
      this.login();

    } else {
      // type === 'cancel'
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
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
          
           fetch('htpps://clicwash.com/php/App/sesion.php', {
              method: 'POST',
              header: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },

              body: JSON.stringify({
                    correo: this.state.correo,
                    contrasena: this.state.contrasena,
                    tipo:this.state.tipo,
                    id_fb:this.state.id_fb,
                    name:this.state.name
                  })

              })

          .then((response) => response.json())
          .then((respuesta) => {
                    

                    //this.obtenerData();

                    if (  respuesta!="Err1" && respuesta!="Err2"  ){
                      this.setState({respuesta});

                     this.guardarData(respuesta);
                      
                     
                     this.props.navigation.navigate('Perfil');

                    }
                    else {
                      alert("User not found");
                    }  
          })
               
          .catch((error) => {
          alert("Try Again");
          });
 

    }

    guardarData = async (data) => {
      try {
        
        await AsyncStorage.setItem('Id_global', data.id_usuario);
        await  AsyncStorage.setItem('Nombre_global', data.usuario_nombre);
        await  AsyncStorage.setItem('Nivel_usuario', data.tipousuario_tipousuarioid);
        await  AsyncStorage.setItem('validado', data.validado);

        

        if(data.default_laguaje == null) {await  AsyncStorage.setItem('default_laguaje', 'en');}
        else {await  AsyncStorage.setItem('default_laguaje', data.default_laguaje);}

        if(data.tecnico_validado == null) {
          await  AsyncStorage.setItem('tecnico_validado', '-');
        }else {
          await  AsyncStorage.setItem('tecnico_validado', data.tecnico_validado);
        }

        if(data.tecnico_status_solicitud == null) {await  AsyncStorage.setItem('tecnico_status_solicitud', '-');}
        else {await  AsyncStorage.setItem('tecnico_status_solicitud', data.tecnico_status_solicitud);}

        if(data.negado_motivo == null) {await  AsyncStorage.setItem('negado_motivo', '-');}
        else {await  AsyncStorage.setItem('negado_motivo', data.negado_motivo);}

        if(data.tecnico_validado == null) {await  AsyncStorage.setItem('tecnico_validado', '-');}
        else {await  AsyncStorage.setItem('tecnico_validado', data.tecnico_validado);}

        if(data.banneado == null) {await  AsyncStorage.setItem('banneado', '-');}
        else {await  AsyncStorage.setItem('banneado', data.banneado);}

        if(data.banneado_motivo == null) {await  AsyncStorage.setItem('banneado_motivo', '-');}
        else {await  AsyncStorage.setItem('banneado_motivo', data.banneado_motivo);}




        if(data.tecnico_foto_id == null) {await  AsyncStorage.setItem('tecnico_foto_id', '-');}
        else {await  AsyncStorage.setItem('tecnico_foto_id', data.tecnico_foto_id);}

        if(data.contrasena == null) {await  AsyncStorage.setItem('contrasena', '-');}
        else {await  AsyncStorage.setItem('contrasena', data.contrasena);}

        if(data.correo == null) {await  AsyncStorage.setItem('correo', '-');}
        else {await  AsyncStorage.setItem('correo', data.correo);}

        if(data.telefono_1 == null) {await  AsyncStorage.setItem('telefono_1', '-');}
        else {await  AsyncStorage.setItem('telefono_1', data.telefono_1);}

  
  


        if(data.tecnico_trabajo_lunes == null) {await  AsyncStorage.setItem('tecnico_trabajo_lunes', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_lunes', data.tecnico_trabajo_lunes);}

         if(data.tecnico_trabajo_martes == null) {await  AsyncStorage.setItem('tecnico_trabajo_martes', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_martes', data.tecnico_trabajo_martes);}

         if(data.tecnico_trabajo_miercoles == null) {await  AsyncStorage.setItem('tecnico_trabajo_miercoles', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_miercoles', data.tecnico_trabajo_miercoles);}

         if(data.tecnico_trabajo_jueves == null) {await  AsyncStorage.setItem('tecnico_trabajo_jueves', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_jueves', data.tecnico_trabajo_jueves);}

         if(data.tecnico_trabajo_viernes == null) {await  AsyncStorage.setItem('tecnico_trabajo_viernes', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_viernes', data.tecnico_trabajo_viernes);}

         if(data.tecnico_trabajo_sabado == null) {await  AsyncStorage.setItem('tecnico_trabajo_sabado', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_sabado', data.tecnico_trabajo_sabado);}

         if(data.tecnico_trabajo_domingo == null) {await  AsyncStorage.setItem('tecnico_trabajo_domingo', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_domingo', data.tecnico_trabajo_domingo);}

         if(data.tecnico_trabajo_hora_entrada == null) {await  AsyncStorage.setItem('tecnico_trabajo_hora_entrada', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_hora_entrada', data.tecnico_trabajo_hora_entrada);}

         if(data.tecnico_trabajo_hora_salida == null) {await  AsyncStorage.setItem('tecnico_trabajo_hora_salida', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_hora_salida', data.tecnico_trabajo_hora_salida);}

        if(data.tecnico_trabajo_alcance == null) {await  AsyncStorage.setItem('tecnico_trabajo_alcance', '-');}
        else {await  AsyncStorage.setItem('tecnico_trabajo_alcance', data.tecnico_trabajo_alcance);}
  
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
  const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}

  
    return (

 
      <ImageBackground source={{uri: 'https://clicwash.com/img/App/fondo_azul.jpg'}} style={styles.container}>
 
            <View>

                    <Text style={styles.h1} >{transl[lang]['login_access']} </Text>
                    
                
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

                    <Text onPress={() => this.props.navigation.navigate('OlvidoContra')} style={{margin:20, textAlign:'right', color:'#FFF'}}  >Forgot Password?</Text>


                    


                      <Button
                      style={{height: 80 }}  
                        title="Continue"
                        onPress={this.login}  
                      />


                      {Platform.OS !== 'ios' && <Text size={5} />}
                      <Button
                      style={{height: 80 }}  
                        title="Login with Facebook"
                        onPress={this.logInFb.bind(this)}  
                      />
    
            </View>

       </ImageBackground>
    );
  }
}



 
