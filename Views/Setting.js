 
import React, { Component } from 'react';
import { Slider, View,  TouchableHighlight, Linking, ScrollView, Text, StyleSheet, TouchableOpacity, Picker, TextInput, AsyncStorage , ImageBackground , Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
//import { ObtenerData } from '../helpers/ObtenerData';
import styles from '../styles/styles.js'; 
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DateTimePicker from "react-native-modal-datetime-picker"; 
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';
 
import * as Localization from 'expo-localization';
export default class Setting extends Component {




  constructor(props) {
    super(props);
    this.state = { 
      Id_Global: '',
      Nombre_global:'',
      Nivel_usuario:'',
      validado:'',
      tecnico_validado:'',
      tecnico_status_solicitud:'',
      negado_motivo:'',
      banneado:'',
      banneado_motivo:'',
      titulo_foto_id:'Select File',
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
        const default_laguaje = await AsyncStorage.getItem('default_laguaje');

        
 
        const tecnico_foto_id = await AsyncStorage.getItem('tecnico_foto_id');
        const contrasena = await AsyncStorage.getItem('contrasena');
        const contrasena2 = await AsyncStorage.getItem('contrasena');
        const correo = await AsyncStorage.getItem('correo');
        const telefono_1 = await AsyncStorage.getItem('telefono_1');



        const Nivel_usuario = await AsyncStorage.getItem('Nivel_usuario');
        const validado = await AsyncStorage.getItem('validado');
        const tecnico_validado = await AsyncStorage.getItem('tecnico_validado');
        const tecnico_status_solicitud = await AsyncStorage.getItem('tecnico_status_solicitud');
        const negado_motivo = await AsyncStorage.getItem('negado_motivo');
        const banneado = await AsyncStorage.getItem('banneado');
        const banneado_motivo = await AsyncStorage.getItem('banneado_motivo');
 

        if (Id_Global !== null) {
          this.setState({Id_Global});
          this.setState({Nombre_global});
          this.setState({Nivel_usuario});
          this.setState({validado});
          this.setState({default_laguaje});
 
          this.setState({tecnico_foto_id});
          this.setState({contrasena});
          this.setState({contrasena2});
          this.setState({correo});
          this.setState({telefono_1});


          this.setState({tecnico_validado});
          this.setState({tecnico_status_solicitud});
          this.setState({negado_motivo});
          this.setState({banneado});
          this.setState({banneado_motivo});
 

        }
      } catch (error) {
        alert("No se guardo");
      }
    };





setCorreo = (txt) => {
       let correo =  txt;  
       this.setState({correo});
       
    }


    setNombre= (txt) => {
         let Nombre_global =  txt;
         this.setState({Nombre_global});
       
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


           fetch('htpps://clicwash.com/php/App/actualizar_datos_basicos.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                correo: this.state.correo,
                nombre: this.state.Nombre_global,
                contrasena: this.state.contrasena,
                contrasena2: this.state.contrasena2,
                Id_Global:this.state.Id_Global,
                default_laguaje:this.state.default_laguaje
                
               
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
          alert('Try again later');
          });
 

    }





selectFotoId= async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({tecnico_foto_id: uri });

    this.setState({ titulo_foto_id: 'Ok' })

    
  };
  

  render() {

    const transl = require('../Controllers/traductor.json');
    const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}
      
    return (

      <ImageBackground source={require('../assets/fondo_perfil_app.jpg')}  style={styles.container}>

      <ScrollView>

      <Image
          style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
          source={require('../assets/logo2.png')} 

         
        /> 


      <View style={styles.bloqueContenido}  >

          <Text style={styles.title1}>Settings</Text>

          <Text style={{fontWeight:'bold', fontSize:20}}>- Default Laguaje -</Text>
          

            <Picker
                style={{bgColor:'red'}}
                selectedValue={this.state.default_laguaje}
                style={{width:'100%', margin:0}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({default_laguaje: itemValue})
                }>
                
                
                <Picker.Item label="English" value="en" />
                <Picker.Item label="Español" value="es" /> 

            </Picker>
      </View>


       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Your Name"
        defaultValue={this.state.Nombre_global}
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setNombre}
      />


       <TextInput
        style={styles.inputText}
        defaultValue={this.state.correo}
        placeholderTextColor="#fff"
        placeholder="Your E-mail"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setCorreo}
      />


       <TextInput
        style={styles.inputText}
        defaultValue={this.state.contrasena}
        placeholderTextColor="#fff"
        placeholder="Password"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setContrasena}
      />


 <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        defaultValue={this.state.contrasena2}
        placeholder="Repeat your Password"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setContrasena2}
      />


 
 
      
        <Button
          title="Update"
          onPress={this.login}  
        />

      </ScrollView>

      </ImageBackground>
    );
  }
}
