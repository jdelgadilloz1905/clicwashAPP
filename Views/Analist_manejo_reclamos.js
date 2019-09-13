import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Linking,TextInput, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem, Textarea,Picker } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


export default class Analist_manejo_reclamos extends Component {

  constructor(props) {
  super(props);
  this.state = { 
      Id_Global: '',
      Nombre_global:'',
      Nivel_usuario:'',
      validado:'',
      tecnico_status_solicitud:'',
      telefono1:'',
      data:null,
      loaded: true,
      error: null,
      comentario : '',
      default_laguaje : 'nada',
      monto: ''

   };
  }
  baseURL = 'https://clicwash.com/php/App/api_obtener_lista_reclamos.php';

  baseprocesarReclamoURL = 'https://clicwash.com/php/App/api_subir_sentencia_reclamo.php';

  componentDidMount(){
    
    this.getData();
    
  }
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
          tipo : 'pendiente'
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

  setComentario= (txt) => {
    let comentario =  txt;
    this.setState({comentario});
  
  }
  setMonto= (txt) => {
    let monto =  txt;
    this.setState({monto});
  
  }

  procesarReclamo=() =>{

    console.log('procesar');
  }

  procesarReclamo = (index) =>{

    let url = this.baseprocesarReclamoURL + '/comments';
    let h = new Headers();
    h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
    h.append('X-Client', 'Steve and Friends');

    let req = new Request(url, {
      headers: h,
      method: 'POST',
      body: JSON.stringify({
        id_cita: this.state.data[index]["id_cita"],
        reclamo_sentencia : this.state.comentario,
        reclamo_sentencia_comentario : this.state.default_laguaje,
        total_reembolsar : this.state.monto,
        id_cliente : this.state.data[index]["id_usuario"]
          
        })
    });
  
    fetch(req)
    .then(response=>response.json())
    .then((respuesta) =>{
      
      //leer el state 
      //la repuesta es el id_Cita
      alert("Solicitud procesada.")
      console.log('cita a calificar ' + respuesta);
    
      //Obtener copia del state
      const citasActuales = [...this.state.data];

      //borrar el elemento del state 
      const citasResultado = citasActuales.filter(cita => cita.id_cita !== respuesta); //sirve para extraer elemento de un obejto 

      //actualizar el state
      this.setState({
    
        data : citasResultado
      }) 
       
    })
    .catch(this.badStuff)
  }
  

  render() {

    const transl = require('../Controllers/traductor.json');
    const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}


      if(this.state.data && this.state.data.length >0){
        return (
          
          <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>
    
                <ScrollView>
    
                    <Image
                      style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
                      source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
                    /> 
                    <View style={styles.bloqueContenido}  >
                        <Text style={styles.title1}>Reclamos pendientes</Text>
    
                        <Text style={styles.p}></Text>
    
                        {this.state.data.map( (reclamos, index) => (
                            <View style={styles.bloqueContenido1} key={reclamos.id_cita}>
                              <Text>
                                <Text style={{fontWeight: 'bold'}} >** Servicio: </Text>
                                <Text>{ reclamos.nombre_paquete }</Text>
                              </Text>
                              <Text>
                                <Text style={{fontWeight: 'bold'}} >** Fecha de la Cita: </Text>
                                <Text>{ reclamos.dia_semana }, { reclamos.fecha }</Text>
                              </Text>
                              <Text>
                                <Text style={{fontWeight: 'bold'}} >** Rango de Hora: </Text>
                                <Text>{ reclamos.hora } - { reclamos.hora_cierre }</Text>
                              </Text>
                              
                              <Text>
                                <Text style={{fontWeight: 'bold'}} >** Direccion de la Cita:</Text>
                                <Text>{ reclamos.direccion_cliente }</Text>
                              </Text>
  
                              
                              <Text>
                                  <Text style={{fontWeight: 'bold'}} >** Se ha generado un reclamo en contra del tecnico:</Text>
                                  <Text style={{color:'red'}}>{ reclamos.usuario_nombre }</Text>
                              </Text>

                              <Text style={styles.title5}>** DETALLES DEL CIERRE **</Text>

                              <Text style={{color: 'blue', alignItems: 'center',justifyContent: 'center', flex:1}}
                                    onPress={() => Linking.openURL(`https://clicwash.com/img/informe_cierre/${reclamos.informe_cierre}`)}>
                                    Orden de Cierre
                              </Text>
                              
                              <Text style={{color: 'blue'}}
                                    onPress={() => Linking.openURL(`https://clicwash.com/php/App/fotos_cita_respaldo_movil.php?id=${reclamos.id_cita}`)}>
                                    Fotos asociadas al pedido cargadas por el tecnico 
                              </Text>

                              <Text>
                                  <Text style={{fontWeight: 'bold'}} >** Se ha generado un reclamo en contra del tecnico: { reclamos.reclamo_cliente }</Text>
                              </Text>
                              <Text style={{color: 'blue', alignItems: 'center',justifyContent: 'center', flex:1}}
                                    onPress={() => Linking.openURL(`https://clicwash.com/img/reclamo_img/${reclamos.reclamo_img}`)}>
                                   Foto asociada al pedido, cargada por el cliente
                              </Text>

                              <Text>
                                  <Text style={{fontWeight: 'bold'}} >** Comentarios de Cierre emitido por el tecnico:</Text>
                                  <Text style={{color:'red'}}>{ reclamos.comentarios }</Text>
                              </Text>

                              <Text>
                                  <Text style={{fontWeight: 'bold'}} >** Telefono Tecnico:</Text>
                                  <Text style={{color:'red'}}>{ reclamos.telefono_1 }</Text>
                              </Text>
                              <Text>
                                  <Text style={{fontWeight: 'bold'}} >** Telefono Cliente:</Text>
                                  <Text style={{color:'red'}}>{ reclamos.telefono_cliente }</Text>
                              </Text>
                              <View>

                                    <Textarea rowSpan={5} bordered 
                                      style={{width:'100%', margin:0}}
                                      placeholder="Escriba su comentario" 
                                      defaultValue={this.state.comentario}
                                      onChangeText={this.setComentario}
                                      />
                                      <Picker
                                      style={{width:'100%', margin:0}}
                                      selectedValue={this.state.default_laguaje}
                                      onValueChange={(itemValue, itemIndex) =>
                                      this.setState({default_laguaje: itemValue})
                                      }>
                                      
                                      
                                      <Picker.Item label="Decisión del Caso" value="nada" />
                                      <Picker.Item label="Aprobar Reclamo (Emitir reembolso)" value="SI" /> 
                                      <Picker.Item label="Negar Reclamo (Negar Reembolso)" value="NO" /> 
                                      

                                    </Picker>

                                    <TextInput
                                      placeholder="Total a reembolsar USD"
                                      defaultValue={this.state.monto}
                                      onChangeText={this.setMonto}
                                      keyboardType={'numeric'}
                                    /> 
                                    {Platform.OS !== 'ios' && <Text size={5} />}
                                    <Button
                                      title="Procesar"
                                      onPress={()=>this.procesarReclamo(index)}  
                                    /> 

                                          
                                    </View>
                              
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
                        <Text style={styles.title1}>Reclamos pendientes</Text>
    
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

