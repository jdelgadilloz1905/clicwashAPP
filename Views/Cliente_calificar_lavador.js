
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image,ActivityIndicator,Platform, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';



export default class Cliente_calificar_lavador extends Component {

   constructor(props) {
      super(props);
      this.state = { 
      Id_Global: this.props.navigation.state.params.Id_Global,
      Nombre_global:'',
      Nivel_usuario:'',
      validado:'',
      tecnico_status_solicitud:'',
      telefono1:'',
      data: null,
      loaded: true,
      error: null,
      default_laguaje : 'nada'

      };
  }


  baseURL = 'htpps://clicwash.com/php/App/obtener_ordenes_pendientes.php';

  baseURLCalificar = 'htpps://clicwash.com/php/App/subir_calificacion_cliente.php';

  getData = (ev) =>{

    this.setState({
      loaded:false, 
      error: null
    });

    let url = this.baseURL + '/comments';
    let h = new Headers();
    h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
    h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
          id: this.state.Id_Global,
          tipo : 'cerrado'
        })
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

  convertirStatus = (texto) =>{

    let status;
    switch (texto) {
      case 'Pagado': 
        status = 'Pendiente por ejecutar';
        break;

      case 'Analista_asignado': 
        status = 'Tecnico Asignado';
        break;

      case 'en_ejecucion': 
        status = 'En Ejecucion';
        break;

      case 'cerrado_por_tecnico': 
        status = 'Pendiente de Calificar';
        break;

      case 'Cancelada': 
        status = 'Cancelada';
        break;
  
      case 'Caso_cerrado': 
        status = 'Caso cerrado';
        break;
  
      case 'calificado_cliente': 
        status = 'Calificado por cliente';
        break;
  
    }
    return status;

  } 

  calificarLavador = (id_cita,id_usuario,reclamo_activo) =>{

    let calificacion_tecnico = this.state.default_laguaje;
 
    if(calificacion_tecnico !=="nada" ){

      let url = this.baseURLCalificar + '/comments';
      let h = new Headers();
      h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
      h.append('X-Client', 'Steve and Friends');

      let req = new Request(url, {
        headers: h,
        method: 'POST',
        body: JSON.stringify({
            id_cita: id_cita,
            calificacion_tecnico : calificacion_tecnico,
            id_usuario : id_usuario,
            reclamo_activo : reclamo_activo
          })
      });
    
      fetch(req)
      .then(response=>response.json())
      .then((respuesta) =>{
        
        
        if (respuesta=="OK"){
          alert("buen trabajo");
          
        }
        //leer el state
    
        console.log('cita a calificar ' + id_cita);
      
        //Obtener copia del state
        const citasActuales = [...this.state.data];

        //borrar el elemento del state 
        const citasResultado = citasActuales.filter(cita => cita.id_cita !== id_cita); //sirve para extraer elemento de un obejto 

        //actualizar el state
        this.setState({
      
          data : citasResultado
        }) 
         
      })
      .catch((error) =>{
        alert("I didn't connect to the server, try again");
      })
    }


    
  }

  reclamoLavador(id_cita,id_usuario,reclamo_activo){


  }

  render() {

    
    const transl = require('../Controllers/traductor.json');
    const lang = (Localization.locale).substr(0,2);
      

    if(this.state.data && this.state.data.length >0){
      return (
        
        <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
  
              <ScrollView>
  
                  <Image
                    style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                    source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                  /> 
                  <View style={styles.bloqueContenido}>
                      <Text style={styles.title1}>Listado de Reseñas Pendientes</Text>
  
                      <Text style={styles.p}></Text>
  
                      {this.state.data.map( pendiente => (
                          <View style={styles.bloqueContenido1} key={pendiente.id_cita}>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Servicio: </Text>
                              <Text>{ pendiente.nombre_paquete }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Fecha de la Cita: </Text>
                              <Text>{ pendiente.dia_semana }, { pendiente.fecha }</Text>
                            </Text>
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Hora de la Cita: </Text>
                              <Text>{ pendiente.tecnico_hora_asistir }</Text>
                            </Text>
                          
                            <Text>
                              <Text style={{fontWeight: 'bold'}} >** Direccion de la Cita:</Text>
                              <Text>{ pendiente.direccion_cliente }</Text>
                            </Text>

                            <Text>
                                <Text style={{fontWeight: 'bold'}} >** Tecnico asignado:</Text>
                                <Text style={{color:'red'}}>{ pendiente.usuario_nombre }</Text>
                            </Text>
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            <Picker
                                selectedValue={this.state.default_laguaje}
                                style={{width:'100%', margin:0}}
                                onValueChange={(itemValue, itemIndex) =>
                                  this.setState({default_laguaje: itemValue})
                                }>
                                
                                <Picker.Item label="¿Como fue su experiencia?" value="nada" />
                                <Picker.Item label="Excelente" value="1" /> 
                                <Picker.Item label="Regular" value="0" /> 
                                <Picker.Item label="Mala" value="-1" /> 
                                <Picker.Item label="Muy Mala" value="-2" /> 

                          </Picker>
                          
                            <Button  style={styles.preciosBoton} 
                                title=" Calificar Lavador"
                                onPress={()=>this.calificarLavador(pendiente.id_cita,pendiente.id_usuario,pendiente.reclamo_activo)}
                            />
                            {Platform.OS !== 'ios' && <Text size={1} />}
                            <Button  style={styles.preciosBoton} 
                                title=" Iniciar reclamo "
                                color="red"
                                onPress={() => this.props.navigation.navigate('Cliente_reclamo',{id_cita :pendiente.id_cita,id_usuario: pendiente.id_usuario,reclamo_activo: pendiente.reclamo_activo})}
                            />
                            
                            
                          </View>
                        ))
                    }
                    
                  </View>
                </ScrollView>
        </ImageBackground>
      );
    }else{

      return (
        <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
  
              <ScrollView>
  
                  <Image
                    style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                    source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                  /> 
                  <View style={styles.bloqueContenido}  >
                      <Text style={styles.title1}>Listado de Reseñas Pendientes</Text>
  
                      <Text style={styles.p}></Text>
                      
                      <Text style={{fontWeight:'bold'}}>- No se encontraron resultados -</Text>
  
                      <Text style={styles.p}></Text>
                  </View>
                </ScrollView>
        </ImageBackground>
      );
    }
    
  }
}



