import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, Image, Platform, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import * as Localization from 'expo-localization';


const impuesto = 0.07;

export default class Gestion_Servicios extends Component {
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
            totalMonto : 0,
            montoImpuesto : 0,
            totalConImpuesto : 0,

            
            
          };

    }

    
    componentDidMount(){
        
        
        // this._interval = setInterval(() => {
          this.getData();
        // }, 5000);
      
      }

    
    getData=()=>{

      
        this.setState({
            loaded:false, 
            error: null
        });
      
        fetch('https://clicwash.com/php/App/api_gestionar_cita.php', {
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

      //busco cobros adicionales
      this.getCobrosAdicionales();
    
    }
    badStuff = (err) => {
      this.setState({loaded: true, error: err.message});
    }

    getCobrosAdicionales = () =>{

      
        this.setState({
          loadedCobroAdicional:false, 
          error: null
      });
  
      fetch('https://clicwash.com/php/App/api_obtener_cobros_citas.php', {
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
            .then(this.showDataCobroAdicional)               
            .catch(this.badStuff);

    }

    showDataCobroAdicional=(data)=>{

      this.setState({loadedCobroAdicional:true, dataCobrosAdicionales : data});

      this.sumarTotales();
      this.sacarImpuesto();
      this.montoTotalConImpuesto();

     
      
    }

    sumarTotales= () =>{
      let miPrecio = 0;
      
      const numbers = [...this.state.dataCobrosAdicionales];
      numbers.map((totals) => (
        miPrecio = parseFloat(miPrecio) + (parseFloat(totals.total) * totals.cantidad)  
        
      ));
      miPrecio = miPrecio + (parseFloat(this.state.data.precio_adelanto)*this.state.data.cantidad);
      
      this.setState({
        totalMonto : miPrecio
       })
      
    }

    sacarImpuesto = () =>{

      let monto = this.state.totalMonto*impuesto;

      this.setState({
        montoImpuesto : monto
       })


    }
    montoTotalConImpuesto = () =>{

      let montoCon = this.state.totalMonto + (this.state.totalMonto*impuesto);

      this.setState({
        totalConImpuesto : montoCon
       })

    }

    enviarDatos = () =>{

      const {id_cita,montoImpuesto,totalConImpuesto} = this.state;
      const id_cliente = this.state.data.id_usuario
      
      this.setState({
        loadedEnvio:false, 
        errorEnvio: null
      });
  
      

      fetch('https://clicwash.com/php/App/api_procesar_cobro_final.php', {
            method: 'POST',
            header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                id_cita: id_cita,
                impuesto  :montoImpuesto,
                total : totalConImpuesto,
                id_cliente : id_cliente
                })

            })
    
            .then((response) => response.json())
            .then(this.showDataEnvio)               
            .catch(this.badStuffEnvio);
    }

    showDataEnvio = (data) =>{
        
        
      
        this.props.navigation.navigate('Gestion_Cerrar_Pedido',{total: this.state.totalConImpuesto,id_cita:data,navigation:this.props.navigation});
      
    
    }
    badStuffEnvio = (err) => {
      this.setState({loadedEnvio: true, errorEnvio: err.message});
    }

    getItemAdicionales=()=>{

      this.props.navigation.navigate('Gestionar_cargar_cobros',{id_cita:this.state.id_cita,navigation:this.props.navigation});
    }

    uploadFotosAdicionales=()=>{
      
       this.props.navigation.navigate('Gestionar_carga_fotos',{id_cita:this.state.id_cita,navigation:this.props.navigation});
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
                          <Text style={styles.title3}>Panel de Gestion de Servicios en Ejecucion</Text>
      
                          <Text style={styles.p}> </Text>

                          <View>
                            <Button 
                                title="Cargar cobros adicionales" 
                                onPress={()=>this.getItemAdicionales()} 
                            
                            />
                            {Platform.OS !== 'ios' && <Text size={5} />}
                            <Button 
                                title="Cargas Fotos al proyecto" 
                                onPress={()=>this.uploadFotosAdicionales()} 
                                
                            />
                          </View>
                          <Text style={styles.title3}>Concepto del Pedido</Text>  
                          <Text style={styles.p}> </Text>

                          <View style={styles.tabla}>

                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Cant.</Text>
                            </View>

                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Servicio</Text>
                            </View>
                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Precio</Text>
                            </View>

                          </View>

                              <View style={styles.tabla}>

                                <View style={styles.columBody}>
                                  <Text style={{ fontSize: 15}}>{this.state.data.cantidad} </Text>
                                </View>

                                <View style={styles.columBody}>
                                  <Text style={{ fontSize: 15}}>{this.state.data.nombre_paquete} </Text>
                                </View>
                                <View style={styles.columBody}>
                                  <Text style={{ fontSize: 15}}>{this.state.data.precio_adelanto * this.state.data.cantidad} $</Text>
                                </View>
                              </View>

                              


                          <Text style={styles.title3}>Servicios Adicionales </Text>
                           
                          <Text style={styles.p}></Text>  

                          <Button
                                
                                title="Refrescar" 
                                onPress={()=>this.getData()} 
                                
                            />
                          
                          <View style={styles.tabla}>
                            
                           
                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Cant.</Text>
                            </View>

                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Servicio</Text>
                            </View>
                            <View style={styles.columHead}>
                                <Text style={{fontWeight:'bold', fontSize: 16}}>Precio</Text>
                            </View>

                          </View>

                          {this.state.loadedCobroAdicional ==true && (
                              <>

                                {this.state.dataCobrosAdicionales.map((cobros, index) =>(
                                  <View style={styles.tabla} key={index}>
                                   
                                    <View style={styles.columBody} > 
                                      < Text style={{ fontSize: 15}}>{cobros.cantidad} </Text>
                                    </View>

                                    <View style={styles.columBody}>
                                      <Text style={{ fontSize: 15}}>{cobros.paquete_es} </Text>
                                    </View>
                                    <View style={styles.columBody}>
                                      < Text style={{ fontSize: 15}}>{cobros.total * cobros.cantidad} $</Text>
                                    </View>
                                  
                                </View>
                                  
                                ))}
                              
                              </> 
                          
                            )}
                                  <View style={styles.tabla}>
                                   
                                   <View style={styles.columBody} > 
                                     < Text style={{ fontSize: 15}}>Impuestos y Manejo </Text>
                                   </View>
       
                                   <View style={styles.columBody}>
                                     <Text style={{ fontSize: 15}}> {this.state.montoImpuesto.toFixed(2)}$</Text>
                                   </View>   
                                 </View>
       
                                 <Text style={styles.p}> </Text>
                                 <Text style={styles.title3}>Total: {this.state.totalConImpuesto.toFixed(2) } $</Text>  
                                 <Text style={styles.p}> </Text>

                                 {Platform.OS !== 'ios' && <Text size={5} />}
                                  <Button 
                                      title="Procesar Cobro" 
                                      onPress={()=>this.enviarDatos()} 
                                      color='green'
                                      
                                  />
                          
                      </View>
                    </ScrollView>
            </ImageBackground>
          );
    }
}
 