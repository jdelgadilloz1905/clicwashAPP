import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground   } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import styles from '../styles/styles.js'; 

import * as Localization from 'expo-localization';
import InicioAdministrador from '../Views/InicioAdministrador'; 
import InicioAnalista from '../Views/InicioAnalista'; 
import InicioNumeroNoValidado from '../Views/InicioNumeroNoValidado'; 
import InicioCliente from '../Views/InicioCliente'; 
import InicioTecnicoValidado from '../Views/InicioTecnicoValidado';
import InicioTecnicoNoValidado from '../Views/InicioTecnicoNoValidado'; 



export default class Perfil extends Component {


  constructor(props) {
    super(props);
    this.state = { 
      Id_Global: '',
      Nombre_global:'',
      Nivel_usuario:'',
      validado:'',
      tecnico_validado:'',
      tecnico_status_solicitud:'',
      negado_motivo:'',
      banneado:'',
      banneado_motivo:'',
      telefono1:''

       };
  }

   

  componentDidMount(){
      
         this.obtenerData();
  }

    



  obtenerData = async () => {
      try {
        
        const Id_Global = await AsyncStorage.getItem('Id_global');
        const Nombre_global = await AsyncStorage.getItem('Nombre_global');
        
        const tecnico_foto_id = await AsyncStorage.getItem('tecnico_foto_id');
        const contrasena = await AsyncStorage.getItem('contrasena');
        const correo = await AsyncStorage.getItem('correo');
        const telefono_1 = await AsyncStorage.getItem('telefono_1');

        const default_laguaje = await AsyncStorage.getItem('default_laguaje');



        const Nivel_usuario = await AsyncStorage.getItem('Nivel_usuario');
        const validado = await AsyncStorage.getItem('validado');
        const tecnico_validado = await AsyncStorage.getItem('tecnico_validado');
        const tecnico_status_solicitud = await AsyncStorage.getItem('tecnico_status_solicitud');
        const negado_motivo = await AsyncStorage.getItem('negado_motivo');
        const banneado = await AsyncStorage.getItem('banneado');
        const banneado_motivo = await AsyncStorage.getItem('banneado_motivo');


        const tecnico_trabajo_lunes = await AsyncStorage.getItem('tecnico_trabajo_lunes');
        const tecnico_trabajo_martes = await AsyncStorage.getItem('tecnico_trabajo_martes');
        const tecnico_trabajo_miercoles = await AsyncStorage.getItem('tecnico_trabajo_miercoles');
        const tecnico_trabajo_jueves = await AsyncStorage.getItem('tecnico_trabajo_jueves');
        const tecnico_trabajo_viernes = await AsyncStorage.getItem('tecnico_trabajo_viernes');
        const tecnico_trabajo_sabado = await AsyncStorage.getItem('tecnico_trabajo_sabado');
        const tecnico_trabajo_domingo = await AsyncStorage.getItem('tecnico_trabajo_domingo');
        const tecnico_trabajo_hora_entrada = await AsyncStorage.getItem('tecnico_trabajo_hora_entrada');
        const tecnico_trabajo_hora_salida = await AsyncStorage.getItem('tecnico_trabajo_hora_salida');
        const tecnico_trabajo_alcance = await AsyncStorage.getItem('tecnico_trabajo_alcance');

    

        if (Id_Global !== null) {
          this.setState({Id_Global});
          this.setState({Nombre_global});
          this.setState({Nivel_usuario});
          this.setState({validado});
          this.setState({default_laguaje});


          this.setState({tecnico_foto_id});
          this.setState({contrasena});
          this.setState({correo});
          this.setState({telefono_1});


          this.setState({tecnico_validado});
          this.setState({tecnico_status_solicitud});
          this.setState({negado_motivo});
          this.setState({banneado});
          this.setState({banneado_motivo});



          this.setState({tecnico_trabajo_lunes});
          this.setState({tecnico_trabajo_martes});
          this.setState({tecnico_trabajo_miercoles});
          this.setState({tecnico_trabajo_jueves});
          this.setState({tecnico_trabajo_viernes});
          this.setState({tecnico_trabajo_sabado});
          this.setState({tecnico_trabajo_domingo});
          this.setState({tecnico_trabajo_hora_entrada});
          this.setState({tecnico_trabajo_hora_salida});
          this.setState({tecnico_trabajo_alcance});

        }

        
      } catch (error) {
        alert("No se guardo");
      }
  };

  render() {
    
    const transl = require('../Controllers/traductor.json');
    const lang = (Localization.locale).substr(0,2);
  
    if (this.state.Nivel_usuario==1) {

        return (

            <InicioAdministrador  
                tecnico_foto_id={this.state.tecnico_foto_id}  
                contrasena={this.state.contrasena}  
                correo={this.state.correo} 
                telefono_1={this.state.telefono_1} 
                navigation={this.props.navigation}
            /> 
        );

    }else if (this.state.Nivel_usuario==2)  {

            return (   
              <InicioAnalista  
                  tecnico_foto_id={this.state.tecnico_foto_id}  
                  contrasena={this.state.contrasena}  
                  correo={this.state.correo} 
                  telefono_1={this.state.telefono_1}  
                  Id_Global={this.state.Id_Global} 
                  navigation={this.props.navigation}
              />
            );

    }else if (this.state.Nivel_usuario==3) {
                if (this.state.validado==0) {
                    return ( 
                        <InicioNumeroNoValidado   
                            tecnico_foto_id={this.state.tecnico_foto_id} 
                            contrasena={this.state.contrasena}  
                            correo={this.state.correo} 
                            telefono_1={this.state.telefono_1}  
                            Id_Global={this.state.Id_Global}  
                            navigation={this.props.navigation} 
                        />  
                    );

                }
                else {
                  return (
                    <InicioCliente  
                        tecnico_foto_id={this.state.tecnico_foto_id}  
                        contrasena={this.state.contrasena}  
                        correo={this.state.correo} 
                        telefono_1={this.state.telefono_1} 
                        Id_Global={this.state.Id_Global}  
                        navigation={this.props.navigation}
                    />
                  );
                }

    }else{
                if (this.state.validado==0) {

                  return ( <InicioNumeroNoValidado  tecnico_foto_id={this.state.tecnico_foto_id}  contrasena={this.state.contrasena}  correo={this.state.correo} telefono_1={this.state.telefono_1}  Id_Global={this.state.Id_Global}  navigation={this.props.navigation}/>  );

                }else {

                      if (this.state.tecnico_validado!==0) {
                        

                        
                        return ( <InicioTecnicoValidado 
                                          tecnico_trabajo_lunes={this.state.tecnico_trabajo_lunes}
                                          tecnico_trabajo_martes={this.state.tecnico_trabajo_martes}
                                          tecnico_trabajo_miercoles={this.state.tecnico_trabajo_miercoles}
                                          tecnico_trabajo_jueves={this.state.tecnico_trabajo_jueves}
                                          tecnico_trabajo_viernes={this.state.tecnico_trabajo_viernes}
                                          tecnico_trabajo_sabado={this.state.tecnico_trabajo_sabado}
                                          tecnico_trabajo_domingo={this.state.tecnico_trabajo_domingo}
                                          tecnico_trabajo_hora_entrada={this.state.tecnico_trabajo_hora_entrada}
                                          tecnico_trabajo_hora_salida={this.state.tecnico_trabajo_hora_salida}
                                          tecnico_trabajo_alcance={this.state.tecnico_trabajo_alcance} 
                                          negado_motivo={this.state.negado_motivo} 
                                          tecnico_foto_id={this.state.tecnico_foto_id}  contrasena={this.state.contrasena}  correo={this.state.correo} telefono_1={this.state.telefono_1}
                                          tecnico_status_solicitud={this.state.tecnico_status_solicitud}   Id_Global={this.state.Id_Global}  navigation={this.props.navigation}/>  );

                      }else {

                        return ( <InicioTecnicoNoValidado   


                                          Id_Global={this.state.Id_Global} 
                                          navigation={this.props.navigation}/>  );
                      }

                }
      }
  }


}
