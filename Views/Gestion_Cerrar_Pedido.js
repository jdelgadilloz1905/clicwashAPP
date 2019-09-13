import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker, TextInput } from 'react-native';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem, Textarea } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


export default class Gestion_Cerrar_Pedido extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Id_Global: this.props.navigation.state.params.Id_Global,
            error : null,
            loaded: true,
            data : [],
            id_cita : this.props.navigation.state.params.id_cita,
            comentario : '',
            default_laguaje : 'nada',
            imageEnviar : null, 
            total : this.props.navigation.state.params.total

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
                console.log(resultImagePicker);
                const imageUri = resultImagePicker.uri


                this.setState({

                    imageEnviar : imageUri
                })
                
                

                
            }
            
        }


    }

    cerrarPedido = () =>{

        let comentario = this.state.comentario;
        let archivo = this.state.imageEnviar;
        let id_cita = this.state.id_cita;
        let selectExperiencia = this.state.default_laguaje;
        let montoTotal = this.state.total;
        
        
        const formData = new FormData();
        //Add your input data
        formData.append('comentario', comentario);
        formData.append('id_cita', id_cita);
        formData.append('calificacion_del_cliente', selectExperiencia);
        formData.append('montoTotal', montoTotal);

        let uriPart_archivo = archivo.split('.');
        let fileExtension_archivo = uriPart_archivo[uriPart_archivo.length - 1];

        formData.append('archivo', {
            uri: archivo,
            name: `photo.${fileExtension_archivo}`,
            type: `image/${fileExtension_archivo}`
        });

        //API que usa fetch para ingresar datos a la base de datos a través del script php

        fetch('htpps://clicwash.com/php/App/upload_cerrar_pedido.php',{
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData
      })
      .then((response) => response.json())
      .then((respuesta) => {

        console.log(respuesta);

         alert('buen trabajo. ');
         this.props.navigation.navigate('InicioTecnicoValidado')      
        })
        .catch((error) => {
            console.error(error);
          });
    }


 
    render() { 
        
    
        return (
        
            <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
      
                  <ScrollView>
      
                      <Image
                        style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                        source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                      /> 
                      <View style={styles.bloqueContenido}  >
                          <Text style={styles.title3}>Cerrar pedido  - COD {(this.state.id_cita).padStart(9,0)}</Text>
      
                          <View>
                            <Button 
                                title="Imprimir Comprobante Final" 
                                onPress={()=>console.log('imprimir comprobante')} 
                            
                            />
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            
                          </View>
                          <Text style={styles.title3}>Adjuntar Documento de cierre</Text>  
                          <Text style={styles.p}> </Text>
                          
                          <Button
                                title="Cargar Archivo" 
                                onPress={()=>this.openGallery()} 
                          />
                         {Platform.OS !== 'ios' && <Text size={5} />}
                          
                            <Textarea rowSpan={5} bordered 
                                style={{width:'100%', margin:0}}
                                placeholder="Comentarios Generales" 
                                defaultValue={this.state.comentario}
                                onChangeText={this.setComentario}
                            />
                            <Picker
                                style={{width:'100%', margin:0}}
                                selectedValue={this.state.default_laguaje}
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({default_laguaje: itemValue})
                                }>
                                
                                
                                <Picker.Item label="¿Como calificaria al cliente?" value="nada" />
                                <Picker.Item label="Excelente" value="1" /> 
                                <Picker.Item label="Normal" value="0" /> 
                                <Picker.Item label="Malo (Problematico o agresivo)" value="-1" /> 

                            </Picker>
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            <Button 
                                title="Cerrar Pedido" 
                                onPress={()=>this.cerrarPedido()} 
                            
                            />
  
                      </View>
                    </ScrollView>
            </ImageBackground>
          );
    }
}
 
 