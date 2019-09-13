
import React, { Component } from 'react';
import {  View, Linking, Image, ScrollView, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator,   Header, ImageBackground , Picker } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


export default class Analist_tecnicos_por_verificar_2 extends Component {

   static navigationOptions={
        drawerIcon:({}) => (
             <Icon name="ios-water" style={{ color: 'white', fontSize:30 }}/>
        )
    }



      constructor(props) {
    super(props);
    this.state = {
    usuario_nombre: this.props.navigation.state.params.usuario_nombre,
    correo: this.props.navigation.state.params.correo,
    telefono_1: this.props.navigation.state.params.telefono_1,

  	id_usuario: this.props.navigation.state.params.id_usuario,
    tecnico_social: this.props.navigation.state.params.tecnico_social,
    tecnico_zip: this.props.navigation.state.params.tecnico_zip,
    tecnico_direccion: this.props.navigation.state.params.tecnico_direccion,
    tecnico_ciudad: this.props.navigation.state.params.tecnico_ciudad,
    tecnico_estado: this.props.navigation.state.params.tecnico_estado,
    tecnico_foto_id: this.props.navigation.state.params.tecnico_foto_id,
    tecnico_foto_carnet: this.props.navigation.state.params.tecnico_foto_carnet,

    tecnico_validado:null,
    negado_motivo:null,

	};
  }





  procesarTecnico = () => {
           fetch('https://clicwash.com/php/App/procesar_tecnico.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                tecnico_validado: this.state.tecnico_validado,
                negado_motivo: this.state.negado_motivo,
                id_usuario: this.state.id_usuario
              })

          })
          .then((response) => response.json())
          .then((respuesta) => {
          			  alert('Successfully Updated')
                      this.props.navigation.navigate('Perfil')
          })
              
          .catch((error) => {
          alert('Intente Nuevamente')
          });
    }






  Set_negado_motivo = (txt) => {
         let negado_motivo =  txt;
         this.setState({negado_motivo});
       
    }


 

  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}

  	let url_id = 'https://clicwash.com/img/tecnico_foto_id/'+this.state.tecnico_foto_id;
    let url_foto_carnet = 'https://clicwash.com/img/tecnico_foto_carnet/'+this.state.tecnico_foto_carnet;




    return (

    	<ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

                        <ScrollView>

         <Image
          style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
          source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
        /> 


      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

 

      <View style={styles.bloqueContenido}  >

           <Text style={styles.title1}>Users Details</Text>

      </View>

      <Text style={styles.p}> </Text>



      <View style={styles.bloqueContenido}  >

      		<Text style={styles.p}>- Nombre: {this.state.usuario_nombre}.</Text>
            <Text style={styles.p}>- Correo: {this.state.correo}.</Text>
            <Text style={styles.p}>- Telefono: {this.state.telefono_1}.</Text>
      </View>

      <Text style={styles.p}> </Text>

      <View style={styles.bloqueContenido}  >

            <Text style={styles.p}>- Direccion: {this.state.tecnico_direccion}.</Text>
            <Text style={styles.p}>- Ciudad: {this.state.tecnico_ciudad}.</Text>
            <Text style={styles.p}>- Estado: {this.state.tecnico_estado}.</Text>
      
      
      		<Button  style={{height: 60, marginTop:10 }}
      		title="Passport Photo"
      		onPress={ ()=>{ Linking.openURL(url_id)} } 
      		/>
      
      		<Button   style={{height:60, marginTop:0 }}
      		title="Driver License"
      		onPress={ ()=>{ Linking.openURL(url_foto_carnet)} } 
      		/>

		</View>



		<Text style={styles.p}></Text>



		<View style={styles.bloqueContenido}  >

		 
            <Picker
			  selectedValue={this.state.tecnico_validado}
			  style={{width:'100%'}}
			  onValueChange={(itemValue, itemIndex) =>
			    this.setState({tecnico_validado: itemValue})
			  }>
			  
			  <Picker.Item label="Account Type" value="" />
			  <Picker.Item label="Aprobar" value="1" />
			  <Picker.Item label="Negar" value="0" /> 

			</Picker>



			<TextInput
		        style={styles.inputText_BWhite}
		        placeholderTextColor="grey"
		        placeholder="Comentarios"
		        //onChangeText={(text) => this.setState({text})}
		        onChangeText={this.Set_negado_motivo}
		      />



		      {(  this.state.tecnico_validado != null )?  <Button title="Procesar Tecnico" onPress={this.procesarTecnico}    />: null }



			

		</View>
 
         
      </View>

      </ScrollView>

      </ImageBackground>
    );
  }
}


