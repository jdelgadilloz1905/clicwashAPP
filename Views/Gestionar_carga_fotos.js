import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

export default class Gestionar_carga_fotos extends Component {
    constructor(props){
        super(props);
        this.state = { 
            Id_Global: this.props.navigation.state.params.Id_Global,
            data : [],
            dataCobrosAdicionales : [],
            loaded: true,
            loadedCobroAdicional : true,
            loadedEnvio : true,
            errorEnvio : null,
            error : null,
            id_cita : this.props.navigation.state.params.id_cita, 
            cantidad : '',
            imageEnviar : ''
          };

    }

    componentDidMount(){
        
        //busco el plan asignado
        this.getData();

      }
    getData=()=>{

        this.setState({
            loaded:false, 
            error: null
        });
      
        fetch('https://clicwash.com/php/App/api_obtener_fotos_cita.php', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id_cita: this.state.id_cita
                })

            })
    
            .then((response) => response.json())
            .then(this.showData)               
            .catch(this.badStuff);

    }

    showData = (data) =>{
        
      console.log(data)
      this.setState({loaded:true, data});
        
    
    }
    badStuff = (err) => {
      this.setState({loaded: true, error: err.message});
      
    }


  

    eliminarFotoAdicional = (id_cita_imagen)=>{

      
        //Obtener copia del state
        const citasActuales = [...this.state.data];

        //borrar el elemento del state 
        const citasResultado = citasActuales.filter(cita => cita.id_cita_imagen !== id_cita_imagen); //sirve para extraer elemento de un obejto 

        //actualizar el state
        this.setState({
      
          data : citasResultado
        }) 

        let id_cita = this.state.id_cita;
        
          fetch('https://clicwash.com/php/App/api_eliminar_foto_cita.php', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id_cita: id_cita,
                id_cita_imagen  :id_cita_imagen
                })

            })
    
            .then((response) => response.json())
            .then((respuesta) =>{
      
                     
              alert("Foto eliminada.")
              
               
            })             
            .catch(this.badStuffEnvio);
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

    cargarFoto=()=>{

    
      let archivo = this.state.imageEnviar;
      let id_cita = this.state.id_cita;


      const formData = new FormData();
        formData.append('id_cita', id_cita);

        let uriPart_archivo = archivo.split('.');
        let fileExtension_archivo = uriPart_archivo[uriPart_archivo.length - 1];

        formData.append('archivo', {
            uri: archivo,
            name: `photo.${fileExtension_archivo}`,
            type: `image/${fileExtension_archivo}`
        });

        fetch('https://clicwash.com/php/App/api_upload_foto_cita.php',{
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: formData
        })
        .then((response) => response.json())
        .then((respuesta) => {

          console.log(respuesta);

          alert('Carga completada.');
          
          this.getData();
          //this.props.navigation.navigate('InicioTecnicoValidado')      
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
                      
                          <Text style={styles.title3}>Imagenes asociadas a la cita</Text>

      
                          <Text style={styles.p}> </Text>
                          
                          <Button
                                title="Seleccione una Foto" 
                                onPress={()=>this.openGallery()} 
                                
                          />
                          {Platform.OS !== 'ios' && <Text size={5} />}
                          <Button
                                title="Cargar" 
                                onPress={()=>this.cargarFoto()} 
                                color="green"
                          />

                          <View style={styles.tabla}>

                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Imagen</Text>
                            </View>
                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Accion</Text>
                            </View>

                          </View>

                          {this.state.data.length >0 && (
                              <>

                                {this.state.data.map((fotos, index) =>(
                                  <View style={styles.tabla} key={index}>
                                   
                                    <View style={styles.columBody} > 
                                    <Image
                                        style={{width: '50%', height: 100}}
                                        source={{uri: `https://clicwash.com/img/cita_imagen/${fotos.cita_imagen}`}}
                                    />
                                    </View>

                                    <View style={styles.columBody}>
                                    
                                        <Button 
                                            
                                            title="Eliminar" 
                                            onPress={()=>this.eliminarFotoAdicional(fotos.id_cita_imagen)} 
                                            color='red'
                                    
                                        />
                                        
                                    </View>
                                    
                                  
                                </View>
                                  
                                ))}
                              
                              </> 
                          
                            )}
                                                              
                          
                      </View>
                    </ScrollView>
            </ImageBackground>
          );
    }
}
 