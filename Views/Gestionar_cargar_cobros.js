import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker,TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


export default class Gestionar_cargar_cobros extends Component {
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
            cantidad : ''
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
      
        fetch('htpps://clicwash.com/php/App/api_gestionar_cargar_cobros.php', {
                method: 'POST',
                header: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                    tabla: "paquetes_generales"
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

  
    // enviarDatos = () =>{

    //   const {id_cita,montoImpuesto,totalConImpuesto} = this.state;
    //   const id_cliente = this.state.data.id_usuario
      
    //   this.setState({
    //     loadedEnvio:false, 
    //     errorEnvio: null
    //   });
  
      

    //   fetch('htpps://clicwash.com/php/App/api_procesar_cobro_final.php', {
    //         method: 'POST',
    //         header: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //         },

    //         body: JSON.stringify({
    //             id_cita: id_cita,
    //             impuesto  :montoImpuesto,
    //             total : totalConImpuesto,
    //             id_cliente : id_cliente
    //             })

    //         })
    
    //         .then((response) => response.json())
    //         .then(this.showDataEnvio)               
    //         .catch(this.badStuffEnvio);
    // }

    // showDataEnvio = (data) =>{
        
        
      
    //     this.props.navigation.navigate('Gestion_Cerrar_Pedido',{total: this.state.totalConImpuesto,id_cita:data,navigation:this.props.navigation});
      
    
    // }
    // badStuffEnvio = (err) => {
    //   this.setState({loadedEnvio: true, errorEnvio: err.message});
    // }

    setCantidad= (txt) => {
        let cantidad =  txt;
        this.setState({cantidad});
      
      }

      agregarCobroAdicional= (index)=>{


        let newArray = this.state.data.slice();
        newArray[index] = {
        ...this.state.data[index],
        estatus: "1",
        };
        this.setState({
            data: newArray,
        });

        let id_cita = this.state.id_cita;
        let id_paquetes_opcionales = this.state.data[index]["id_paquetes_opcionales"];
        let precio = this.state.data[index]["precio"];
        let cantidad = this.state.cantidad;
        

          fetch('htpps://clicwash.com/php/App/api_agregar_servicio_especifico.php', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id_cita: id_cita,
                id_paquetes_opcionales :id_paquetes_opcionales,
                precio : precio,
                cantidad : cantidad
                })

            })
    
            .then((response) => response.json())
            .then((respuesta) =>{
              
              
              if(respuesta =="existe"){
                alert("Este servicio se encuentra en la lista.")
              }else{
                alert("Servicio agregado")
              }
               
            })             
            .catch(this.badStuffEnvio);
      } 
        badStuffEnvio = (err) => {
          this.setState({loadedEnvio: true, errorEnvio: err.message});
        } 
      

      eliminarCobroAdicional = (index)=>{

        let newArray = this.state.data.slice();
        newArray[index] = {
        ...this.state.data[index],
        estatus: "0",
        };
        this.setState({
            data: newArray,
        });

        let id_cita = this.state.id_cita;
        let id_paquetes_opcionales = this.state.data[index]["id_paquetes_opcionales"];
        let precio = this.state.data[index]["precio"];
        let cantidad = this.state.cantidad;
        

          fetch('htpps://clicwash.com/php/App/api_eliminar_servicio_especifico.php', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id_cita: id_cita,
                id_paquetes_opcionales  :id_paquetes_opcionales,
                precio : precio,
                cantidad : cantidad
                })

            })
    
            .then((response) => response.json())
            .then((respuesta) =>{
      
              
              alert("El servicio fue eliminado.")
              
               
            })             
            .catch(this.badStuffEnvio);
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
                      
                          <Text style={styles.title3}>Servicios Adicionales</Text>

      
                          <Text style={styles.p}> </Text>

                          <View style={styles.tabla}>

                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Servicio</Text>
                            </View>
                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Accion</Text>
                            </View>

                          </View>

                          {this.state.data.length >0 && (
                              <>

                                {this.state.data.map((cobros, index) =>(
                                  <View style={styles.tabla} key={index}>
                                   
                                    <View style={styles.columBody} > 
                                      < Text style={{ fontSize: 15}}>{cobros.paquete_es} </Text>
                                      < Text style={{ fontSize: 15}}>Precio:$ {cobros.precio} </Text>
                                    </View>

                                    <View style={styles.columBody}>
                                    
                                    {
                                        cobros.estatus === "0" ?
                                        <>
                                            <TextInput
                                                
                                                placeholder="Cantidad"
                                                onChangeText={this.setCantidad}
                                                keyboardType={'numeric'} 
                                            />
                                            <Button 
                                                
                                                title="Agregar" 
                                                onPress={()=>this.agregarCobroAdicional(index)} 
                                                color='green'
                                        
                                            />
                                        </>
                                        
                                        :
                                        <Button 
                                            
                                            title="Eliminar" 
                                            onPress={()=>this.eliminarCobroAdicional(index)} 
                                            color='red'
                                    
                                        />

                                    }
                                        
                                        
                                      
                                        
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
 