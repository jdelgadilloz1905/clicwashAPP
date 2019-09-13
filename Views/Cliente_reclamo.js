import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker, TextInput } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem, Textarea } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


export default class Cliente_reclamo extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Id_Global: this.props.navigation.state.params.id_usuario,
            id_cita : this.props.navigation.state.params.id_cita,
            imageEnviar : null,
            comentario : ''
          };

    }

    setComentario= (txt) => {
        let comentario =  txt;
        this.setState({comentario});
      
   }
   openGallery = async ()=>{
        
        const resultPermission = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
        );

        if(resultPermission){
            const resultImagePicker = await ImagePicker.launchImageLibraryAsync({
                allowEditing : true,
                aspect : [4,3]
            })

            if(resultImagePicker !== false){
                
                const imageUri = resultImagePicker.uri


                this.setState({

                    imageEnviar : imageUri
                })
                
                

                
            }
            
        }


    }

    EnviarReclamo = () =>{

        let comentario = this.state.comentario;
        let archivo = this.state.imageEnviar;
        let id_cita = this.state.id_cita;

            
        const formData = new FormData();
        //Add your input data
        formData.append('reclamo_cliente', comentario);
        formData.append('id_cita', id_cita);
        

        let uriPart_archivo = archivo.split('.');
        let fileExtension_archivo = uriPart_archivo[uriPart_archivo.length - 1];

        formData.append('reclamo_img', {
            uri: archivo,
            name: `photo.${fileExtension_archivo}`,
            type: `image/${fileExtension_archivo}`
        });

        //API que usa fetch para ingresar datos a la base de datos a través del script php

        fetch('https://clicwash.com/php/App/upload_crear_reclamo.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
      })
      .then((response) => response.json())
      .then((respuesta) => {

        console.log(respuesta);

         alert('Se ha creado el reclamo con exito');
         this.props.navigation.navigate('OrderCliente');    
        })
        .catch((error) => {
            console.error(error);
          });
    }


 
    render() { 
        
    console.log(this.state);
        return (
        
            <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
      
                  <ScrollView>
      
                      <Image
                        style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                        source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                      /> 
                      <View style={styles.bloqueContenido}  >
                          <Text style={styles.title3}>Reclamo de la cita: {(this.state.id_cita).padStart(9,0)}</Text>
      
                          <View>
                            <Text />
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            
                          </View>
                          <Text
                            
                            style={styles.title5}>Describe a continuacion, los detalles de su reclamo, puede anexar igualmente, una imagen que apoye su caso </Text>  
                          <Text style={styles.p}> </Text>
                          
                          <Button
                                title="Cargar Archivo" 
                                onPress={()=>this.openGallery()} 
                          />
                         {Platform.OS !== 'ios' && <Text size={5} />}
                          
                            <Textarea rowSpan={5} bordered 
                                style={{width:'100%', margin:0}}
                                placeholder="Escriba su comentario" 
                                defaultValue={this.state.comentario}
                                onChangeText={this.setComentario}
                            />
                            
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            <Button 
                                title="Enviar reclamo" 
                                onPress={()=>this.EnviarReclamo()} 
                            
                            />
  
                      </View>
                    </ScrollView>
            </ImageBackground>
          );
    }
}
 
 