

 
 

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


export default class Cliente_Historico_lavados extends Component {

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
    error: null

    };
}

baseURL = 'https://clicwash.com/php/App/obtener_ordenes_pendientes.php';

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
        tipo : 'finalizado'
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

printCita = (id_cita) =>{
  //Envio la peticion para que se imprima la cita
  console.log(id_cita);
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
                <View style={styles.bloqueContenido}  >
                    <Text style={styles.title1}>Historico de Lavado</Text>

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
                          <Button  style={styles.preciosBoton} 
                              title=" Imprimir Factura "
                              color='red'
                              onPress={()=>this.printCita(pendiente.id_cita)}
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
                    <Text style={styles.title1}>Historico de Lavado</Text>

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







