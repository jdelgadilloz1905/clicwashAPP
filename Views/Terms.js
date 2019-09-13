

import React, { Component } from 'react';
import { View, Image, ScrollView, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator,   Header, ImageBackground , Picker } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';
export default class Terms extends React.Component {
    constructor(){
        super();
        this.state = {
            data: null,
            loaded: true,
            error: null
        }
    }
    baseURL = 'htpps://clicwash.com/php/App/obtener_Terms.php';
    
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

            <ImageBackground source={{uri: 'https://png.pngtree.com/thumb_back/fw800/back_pic/04/01/47/975801a66f01a3f.jpg'}} style={styles.container}>

                        <ScrollView>

            <Image
          style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
          source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
        /> 
               <View style={styles.bloqueContenido} >
                <Text style={styles.title1}>F . A . Q .</Text>

                <Text style={styles.p}>Before continuing, we invite you to read our Terms and Conditions of Use.</Text>
               
                <Button  style={{height: 80, marginTop:40 }}
                  title="Terms and Conditions"
                   onPress={() => this.props.navigation.navigate('Terms')}
                />

                </View>

                

                 
                { this.state.data && this.state.data.length > 0 && (
                    this.state.data.map( comment => (

                        <View style={styles.bloqueContenido} key={comment.id_preguntas_frecuentes} >

                                <Text style={styles.title3}  >
                                   { comment.pregunta_en }     
                                </Text>

                                 <Text style={styles.p}  >
                                    { comment.respuesta_en }    
                                </Text>


                        </View>



                        
                    ))
                )}
            </ScrollView>

            

            </ImageBackground>
        );
    }
}
 