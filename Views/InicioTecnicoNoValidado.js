import React, { Component } from 'react';
import { Image, Platform, TouchableOpacity,  View, ScrollView, Text, StyleSheet,    TextInput, AsyncStorage , ImageBackground   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
 import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import { ImagePicker, Permissions } from 'expo';
import axios from 'axios';

import * as Localization from 'expo-localization';
 import styles from '../styles/styles.js'; 

 

export default class InicioTecnicoNoValidado extends Component {
 

 
  constructor(props){
    super(props);
    this.state={
      image: null,

      


      titulo_foto_id:'Select File',
      titulo_foto_carnet:'Select File',
 

 
      tecnico_foto_id: null,
      tecnico_foto_carnet: null,
      

      tecnico_social: null,
      tecnico_estado: null,
      tecnico_ciudad: null,
      tecnico_direccion: null,
      tecnico_zip: null



 
     
    }
  }

  setZip = (txt) => {
       let tecnico_zip =  txt;  
       this.setState({tecnico_zip});
       
    }



  setEstado = (txt) => {
       let tecnico_estado =  txt;  
       this.setState({tecnico_estado});
       
    }

   
    setCiudad = (txt) => {
       let tecnico_ciudad =  txt;  
       this.setState({tecnico_ciudad});
       
    }

  setAdress = (txt) => {
       let tecnico_direccion =  txt;  
       this.setState({tecnico_direccion});
       
    }

  setSocial = (txt) => {
       let tecnico_social =  txt;  
       this.setState({tecnico_social});
       
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


  selectFotoCarnet= async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({tecnico_foto_carnet: uri });

    this.setState({ titulo_foto_carnet: 'Ok' })
  };




  selectFotoId = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      aspect: 1,
      allowsEditing: true,
    });
    if (!cancelled) this.setState({ tecnico_foto_id: uri });

    this.setState({ titulo_foto_id: 'Ok' })
  };


 

 

 
subirFoto = ()=>{

 
                tecnico_status_solicitud: this.props.tecnico_status_solicitud
 
           //constant variables that equal properties in state
     let id_usuario = this.props.Id_Global;


     let tecnico_estado = this.state.tecnico_estado;
     let tecnico_ciudad = this.state.tecnico_ciudad;
     let tecnico_direccion = this.state.tecnico_direccion;
     let tecnico_zip = this.state.tecnico_zip;
     let tecnico_social = this.state.tecnico_social; 

     let tecnico_foto_id = this.state.tecnico_foto_id;
     let tecnico_foto_carnet = this.state.tecnico_foto_carnet;



    const formData = new FormData();
    //Add your input data
    formData.append('id_usuario', id_usuario);
    formData.append('tecnico_estado', tecnico_estado);
    formData.append('tecnico_ciudad', tecnico_ciudad);
    formData.append('tecnico_direccion', tecnico_direccion);
    formData.append('tecnico_zip', tecnico_zip);
    formData.append('tecnico_social', tecnico_social);

    

    //Add your photo
    //this, retrive the file extension of your photo

    let uriPart_foto_id = tecnico_foto_id.split('.');
    let fileExtension_foto_id = uriPart_foto_id[uriPart_foto_id.length - 1];

    let uriPart_foto_carnet = tecnico_foto_carnet.split('.');
    let fileExtension_foto_carnet = uriPart_foto_carnet[uriPart_foto_carnet.length - 1];

 

    formData.append('tecnico_foto_id', {
        uri: tecnico_foto_id,
        name: `photo.${fileExtension_foto_id}`,
        type: `image/${fileExtension_foto_id}`
    });

    formData.append('tecnico_foto_carnet', {
        uri: tecnico_foto_carnet,
        name: `photo.${fileExtension_foto_carnet}`,
        type: `image/${fileExtension_foto_carnet}`
    });

    
 

    //API that use fetch to input data to database via backend php script
    fetch('https://clicwash.com/php/App/subir_data_tecnico_registro.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
      })
      .then((response) => response.json())
      .then((responseJson) => {
       // return responseJson  
         alert('Login to validate');
         this.props.navigation.navigate('Iniciar_sesion')      
        })
        .catch((error) => {
            console.error(error);
          });
    
 
}



    
 
 render() {

  const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}

  if (this.props.tecnico_status_solicitud=="Verificando") {

        return(

                <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                  <Text style={styles.h1}>Our analysts are verifying your data.</Text>

                </ImageBackground>
          )
      }

      else {

    return (



      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

      <ScrollView>

      



      


      <Text style={styles.title3}>Fill this form form to validate joining our team</Text>

      <Text style={styles.title4}>{this.props.negado_motivo}</Text>
     

      <Text style={styles.h1}>Legible photo of your driver's license </Text>
      <Button title={this.state.titulo_foto_id}   onPress={this.selectFotoId}    />


      <Text style={styles.h1}>Passport photo </Text>
      <Button title={this.state.titulo_foto_carnet} onPress={this.selectFotoCarnet}    />

     





  
       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Address"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setAdress}
      />


     
       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Estado"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setEstado}
      />

       <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Ciudad"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setCiudad}
      />



      <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="ZIP Code"
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setZip}
      />




      
      <TextInput
        style={styles.inputText}
        placeholderTextColor="#fff"
        placeholder="Social Security Number. or E.I.N."
        //onChangeText={(text) => this.setState({text})}
        onChangeText={this.setSocial}
      />

      
        
        {(this.state.tecnico_zip != null && this.state.tecnico_direccion != null && this.state.tecnico_ciudad != null && this.state.tecnico_estado != null && this.state.tecnico_foto_id != null && this.state.tecnico_foto_carnet != null  && this.state.tecnico_social != null )?  <Button title="Subir Archivo" onPress={this.subirFoto}    />: null }

 
        </ScrollView>

        </ImageBackground>
     
    );

    }
  }
}


 
 