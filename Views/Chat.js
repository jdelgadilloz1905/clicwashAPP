import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker, TextInput,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import styles1 from '../styles/styles1.js'; 
import * as Localization from 'expo-localization';



export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
          Id_Global: this.props.navigation.state.params.Id_Global,
          id_cita: this.props.navigation.state.params.id_cita,
          data: [],
          loaded: true,
          error : null,
          mensaje : ''
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
      
        fetch('htpps://clicwash.com/php/App/api_chat_cita.php', {
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
        
      
      this.setState({loaded:true, data});
        
    
    }
    badStuff = (err) => {
      this.setState({loaded: true, error: err.message});
      
    }

    enviarMensaje=()=>{

      let id_cita = this.state.id_cita;
      let id_usuario = this.state.Id_Global;
      let mensaje = this.state.mensaje;
      
      fetch('htpps://clicwash.com/php/App/api_subir_chat.php', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id_cita: id_cita,
                id_usuario :id_usuario,
                mensaje : mensaje
                })

            })
    
            .then((response) => response.json())
            .then((respuesta) =>{
              
              this.setState({
                mensaje: ''
              })
              
              this.getData();
               
            })             
            .catch(this.badStuffEnvio);

    }

    badStuffEnvio = (err) => {
      this.setState({loadedEnvio: true, errorEnvio: err.message});
    }

    setMensaje= (txt) => {
      let mensaje =  txt;
      this.setState({mensaje});
    
    }
    
    render() { 

      const id_usuario = this.state.Id_Global;
      return (
        <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
  
                          <ScrollView>
  
              <Image
                  style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                  source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                /> 
                 <View style={styles.bloqueContenido}  >
                  <Text style={styles.title1}>Panel de comunicaciones</Text>
  
                  <Text style={styles.p}></Text>

                      {this.state.data.map( chat => (
                              <View style={styles.bloqueContenido1} key={chat.id_chat}>
                                <Text>
                                  <Text style={{fontWeight: 'bold'}} >* {id_usuario==chat.id_usuario ? "Yo" : chat.usuario_nombre}: </Text>
                                  <Text>{ chat.mensaje }</Text>
                                </Text>
                              
                              </View>
                            ))
                        }
                      
                      <TextInput style={styles.inputText_BWhite1}
                          placeholder="Escribe su mensaje..."
                          defaultValue={this.state.mensaje}
                          onChangeText={this.setMensaje}/>
          
                        <Button 
                            color="green"
                            title="Enviar"
                            onPress={()=>this.enviarMensaje()}
                        />
                      
                  <Text style={styles.p}></Text>
  
                </View>

                
                  
                 
              </ScrollView>
  
              
  
              </ImageBackground>
      );
        
    }
}
 
