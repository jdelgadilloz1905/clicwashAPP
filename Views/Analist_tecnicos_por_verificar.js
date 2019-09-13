 
import React, { Component } from 'react';
import { View, Linking, Image, ScrollView, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator,   Header, ImageBackground , Picker } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class Analist_tecnicos_por_verificar extends React.Component {
    constructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }
    baseURL = 'https://clicwash.com/php/App/obtener_tecnicos_por_validar.php';
    
    getData = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.baseURL + '/comments';
        let h = new Headers();
        h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
        h.append('X-Client', 'Steve and Friends');
        
        let req = new Request(url, {
            headers: h,
            method: 'GET'
        });
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }
    showData = (data)=>{
        this.setState({loaded:true, data});
        console.log(data);
    }
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }
    componentDidMount(){
        this.getData();
        //geolocation -> fetch
    }
    render() {

        const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
        return (

            <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                        <ScrollView>

            <Image
          style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
          source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
        /> 
              	<View style={styles.bloqueContenido}  >
               		 <Text style={styles.title1}>Entry Requests</Text>

                 
               
                </View>

                

                 
                { this.state.data && this.state.data.length > 0 && (
                    this.state.data.map( comment => (

                        <View style={styles.bloqueContenido} key={comment.id_usuario} >

                                <Text style={styles.title3}  >
                                   { comment.usuario_nombre }     
                                </Text>

                                 <Text style={styles.p}  >
                                    { comment.correo}    
                                </Text>

                                <Button style={styles.preciosBoton} 
                              title=" Verify "


                                 
                              onPress={() => this.props.navigation.navigate('Analist_tecnicos_por_verificar_2',{usuario_nombre:comment.usuario_nombre ,correo:comment.correo ,telefono_1:comment.telefono_1 ,id_usuario:comment.id_usuario , tecnico_social:comment.tecnico_social, tecnico_zip:comment.tecnico_zip , tecnico_direccion:comment.tecnico_direccion , tecnico_ciudad:comment.tecnico_ciudad , tecnico_estado:comment.tecnico_estado , tecnico_foto_id:comment.tecnico_foto_id , tecnico_foto_carnet:comment.tecnico_foto_carnet   } )}
                            />


                        </View>
 
                        
                    ))
                )}
            </ScrollView>

            

            </ImageBackground>
        );
    }
}
 
 

