
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, Platform, FlatList,  StatusBar, StyleSheet, Button, Image, SafeAreaView, ScrollView , Dimensions } from 'react-native';
import { NavigationActions, createSwitchNavigator, DrawerItems, createAppContainer, createDrawerNavigator, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
//import Icon from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';
import Inicio from '../Views/Inicio';
import Perfil from '../Views/Perfil';
import Cupones from '../Views/Cupones';
import Ordenes from '../Views/Ordenes';
import Contactanos from '../Views/Contactanos';
import Iniciar_sesion from '../Views/Iniciar_sesion';
import Registrarse from '../Views/Registrarse'; 

import InicioAdministrador from '../Views/InicioAdministrador'; 
import InicioAnalista from '../Views/InicioAnalista'; 
import InicioNumeroNoValidado from '../Views/InicioNumeroNoValidado'; 
import InicioCliente from '../Views/InicioCliente'; 
import InicioTecnicoValidado from '../Views/InicioTecnicoValidado';
import InicioTecnicoNoValidado from '../Views/InicioTecnicoNoValidado'; 

import Olvidocontra from '../Views/Olvidocontra'; 

import * as Localization from 'expo-localization';
import Account from '../Views/Account'; 
import Orders from '../Views/Orders'; 
import Payments from '../Views/Payments'; 
import Faq from '../Views/Faq'; 
import Setting from '../Views/Setting'; 
//import Icon from 'react-native-vector-icons/FontAwesome'; 


import Reserva_1 from '../Views/Reserva_1'; 
import Reserva_2 from '../Views/Reserva_2'; 
import Reserva_3 from '../Views/Reserva_3'; 
import Reserva_4 from '../Views/Reserva_4'; 
import Reserva_5 from '../Views/Reserva_5'; 

import Validar_telefono from '../Views/Validar_telefono'; 




import Analist_tecnicos_por_verificar from '../Views/Analist_tecnicos_por_verificar'; 
import Analist_ordenes_proceso from '../Views/Analist_ordenes_proceso'; 
import Analist_manejo_reclamos from '../Views/Analist_manejo_reclamos'; 
import Analist_tecnicos_por_verificar_2 from '../Views/Analist_tecnicos_por_verificar_2'; 


import Lavados_Agendados from '../Views/Lavados_Agendados'; 
import Lavados_Pendientes from '../Views/Lavados_Pendientes';
import Lavados_Inmediatos from '../Views/Lavados_Inmediatos'; 
import Gestion_Servicios from '../Views/Gestion_servicios'; 
import Gestion_Cerrar_Pedido from '../Views/Gestion_Cerrar_Pedido';
import Gestionar_cargar_cobros from '../Views/Gestionar_cargar_cobros';
import Gestionar_carga_fotos from '../Views/Gestionar_carga_fotos'



import Tecnicos_proximas_ordenes from '../Views/Tecnicos_proximas_ordenes'; 
import Tecnico_Historico_lavados from '../Views/Tecnico_Historico_lavados'; 
import Tecnicos_pagos_pendientes from '../Views/Tecnicos_pagos_pendientes'; 
import Tecnicos_historico_pagos from '../Views/Tecnicos_historico_pagos'; 


import Cliente_proximas_ordenes from '../Views/Cliente_proximas_ordenes'; 
import Cliente_Historico_lavados from '../Views/Cliente_Historico_lavados'; 
import Clientes_pagos_pendientes from '../Views/Clientes_pagos_pendientes'; 
import Clientes_historico_pagos from '../Views/Clientes_historico_pagos'; 
import Cliente_calificar_lavador from '../Views/Cliente_calificar_lavador';
import Cliente_reclamo from '../Views/Cliente_reclamo';
import Cliente_status_reclamos from '../Views/Cliente_status_reclamos';


import Chat from '../Views/Chat';


import Analistas_solicitudes_pago from '../Views/Analistas_solicitudes_pago'; 
import Analista_solicitudes_Reembolso from '../Views/Analista_solicitudes_Reembolso'; 
import Analist_bannear_usuarios from '../Views/Analist_bannear_usuarios'; 

                
 
export default class Navegador extends Component {


  constructor(props) {
    super(props);
    this.state = { 
      hay_sesion: '',
      Id_global: '',
      Nombre_global:'' };
  }



  componentDidMount(){
         this.obtenerData();
    }

  obtenerData = async () => {
      try {
        const Id_Global = await AsyncStorage.getItem('Id_global');
        const Nombre_global = await AsyncStorage.getItem('Nombre_global');
        const Nivel_usuario = await AsyncStorage.getItem('Nivel_usuario');
        if (Id_Global !== null) {
          this.setState({Id_Global});
          this.setState({Nombre_global});
          this.setState({Nivel_usuario});
        }
      } catch (error) {
        let hay_sesion = false;
         this.setState({hay_sesion});
      }
    };





    render() {

      
        return (<AppContainer/>)
     

       
             
    }  
}
 














// Navegador Tab del Perfil: Aqui se agrega cada pantalla nueva del perfil
 
        
const Home = createStackNavigator(
  {
    Perfil: {
      screen: Perfil,

      
      
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: 'Home',
          headerLeft: (
            <Icon style={{ paddingLeft: 10 }} onPress={() => navigation.openDrawer()} name="md-menu" size={30} />
          )
        };
      }
    },
    Orders: {
      screen: Orders
    },
    Account: {
      screen: Account,
      drawerIcon:() => (
            <Icon name="home" style={{fontSize:24, color:'#000'}} />
        ),
       
    },

    Cupones: {
      screen: Cupones
    },
    Payments: {
      screen: Payments
    },
    FAQ: {
      screen: Faq
    },
    Setting: {
      screen: Setting
    },
    InicioCliente: {
      screen: InicioCliente
    },
    Reserva_1: {
      screen: Reserva_1
    },
    Reserva_2: {
      screen: Reserva_2
    },
    Reserva_3: {
      screen: Reserva_3
    },
    Reserva_4: {
      screen: Reserva_4
    },
    Reserva_5: {
      screen: Reserva_5
    },

    Validar_telefono: {
      screen: Validar_telefono
    },

    InicioAnalista: {
      screen: InicioAnalista
    },

    Analist_tecnicos_por_verificar_2: {
      screen: Analist_tecnicos_por_verificar_2
    },

    InicioTecnicoValidado : {

      screen : InicioTecnicoValidado
    },

    Lavados_Inmediatos: {
      screen: Lavados_Inmediatos
    },


    Lavados_Agendados: {
      screen: Lavados_Agendados
    },

    Lavados_Pendientes: {
      screen : Lavados_Pendientes
    },

    Gestion_Servicios : {

      screen : Gestion_Servicios
    },

    Gestion_Cerrar_Pedido : {

      screen : Gestion_Cerrar_Pedido
    },

    Gestionar_cargar_cobros : {

      screen : Gestionar_cargar_cobros
    },
    Gestionar_carga_fotos : {

      screen : Gestionar_carga_fotos
    },


    Tecnicos_proximas_ordenes: {
      screen: Tecnicos_proximas_ordenes
    },


    Tecnico_Historico_lavados: {
      screen: Tecnico_Historico_lavados
    },


    Tecnicos_pagos_pendientes: {
      screen: Tecnicos_pagos_pendientes
    },


    Tecnicos_historico_pagos: {
      screen: Tecnicos_historico_pagos
    },

    Analist_tecnicos_por_verificar: {
      screen: Analist_tecnicos_por_verificar
    },

    Analist_ordenes_proceso: {
      screen: Analist_ordenes_proceso
    },

    Analist_manejo_reclamos: {
      screen: Analist_manejo_reclamos
    },

    Cliente_proximas_ordenes: {
      screen: Cliente_proximas_ordenes
    },

    Cliente_calificar_lavador: {
      screen: Cliente_calificar_lavador
    },

    Cliente_Historico_lavados: {
      screen: Cliente_Historico_lavados
    },


    Clientes_pagos_pendientes: {
      screen: Clientes_pagos_pendientes
    },

    Clientes_historico_pagos: {
      screen: Clientes_historico_pagos
    },

    Cliente_reclamo : {
      screen : Cliente_reclamo
    },
    Cliente_status_reclamos : {

      screen : Cliente_status_reclamos
    },

    Analista_solicitudes_Reembolso: {
      screen: Analista_solicitudes_Reembolso
    },

    Analistas_solicitudes_pago: {
      screen: Analistas_solicitudes_pago
    },


    Analist_bannear_usuarios: {
      screen: Analist_bannear_usuarios
    },

    Chat: {
      screen: Chat
    },




    
   
 
  },
   
);

const Navegador_Tab = createBottomTabNavigator(
  {
   

    Home,
    Setting,
    Payments,

  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header:null,
        headerTitle: routeName
      };
    }
  }
);












const DashboardStackNavigator = createStackNavigator(
  {
    Home: Navegador_Tab, 
      
    

  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);



// NAvegador Tab General

 

 
 


const cabecera_registrarse = createStackNavigator(
  {
    Pantalla_Inicio: Registrarse,
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
           onPress={() => navigation.navigate('Inicio')}
           name="md-arrow-round-back" style={{marginLeft:10}} size={32} color="black" />
        ),
        headerTitle:(
          <Text>CLICWASH</Text>) 
         
      };
    }
  }
);



const cabecera_iniciar_sesion = createStackNavigator(
  {
    Pantalla_Inicio: Iniciar_sesion,
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
           onPress={() => navigation.navigate('Inicio')}
           name="md-arrow-round-back" style={{marginLeft:10}} size={32} color="black" />
        ),

        headerTitle:(
          <Text>CLICWASH</Text>)
         
      };
    }
  }
);




const cabecera_olvido = createStackNavigator(
  {
    Pantalla_Inicio: Olvidocontra,
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Ionicons
           onPress={() => navigation.navigate('Iniciar_sesion')}
           name="md-arrow-round-back" style={{marginLeft:10}} size={32} color="black" />
        ),

        headerTitle:(
          <Text>CLICWASH</Text>)
         
      };
    }
  }
);







// EStilos del Navegador drawer

const CustomDrawerContentComponent = (props) => {
  return (
    <Container>
      <Header style={[{ backgroundColor: '#3a455c', height: 140 }, styles.androidHeader]}>
        <Left style={{ flex: 1, flexDirection: 'row'}}>
           <Image
          style={{width: 200, height: 60 }}
          source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
        /> 
        </Left>
      </Header>
      <Content style ={{backgroundColor: '#0099B0'}}>

      <DrawerItems {...props } />
 
         <View style={{    flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' , marginTop: 80}}>
            <Icon name="ios-undo" style={{ color: '#FF5555', fontSize:30 }} /><Text onPress={this.navigateToScreen('Inicio')}  style={{fontSize: 20, padding:4, color:'#fff'}}>  Sign Out</Text>
        </View>


         <View style={{    flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' , marginTop: 0}}>
            <Text style={{fontSize: 10, padding:4, color:'#fff'}}>  Version 1.0.0 - clicwash LLC - 2019</Text>
        </View>

      </Content>
    </Container>
  )
}



class SideMenu extends Component {
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = (Localization.locale).substr(0,2);
    
      // {transl[lang]['inicio_b1']}


    return (
      <Container>
      <Header style={[{ backgroundColor: '#3a455c', height: 140 }, styles.androidHeader]}>
        <Left style={{ flex: 1, flexDirection: 'row' }}>
           <Image
          style={{width: 200, height: 60 }}
          source={{uri: 'https://clicwash.com/img/LOGO-CLICWASH-WEB-H.png'}}
        /> 
        </Left>
      </Header>
      <Content style ={{backgroundColor: '#0099B0'}}>

     


      
    

        

        <View style={{ borderTopWidth: 0.5, borderTopColor: 'black', flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' }}>
            <Icon name="ios-contact" style={{ color: 'white', fontSize:30 }} /><Text onPress={this.navigateToScreen('Account')} style={{fontSize: 20, padding:4}}> {transl[lang]['side_account']}    </Text>
        </View>

        <View style={{ borderTopWidth: 0.5, borderTopColor: 'black', flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' }}>
            <Icon name="md-water" style={{ color: 'white', fontSize:30 }} /><Text onPress={this.navigateToScreen('Orders')} style={{fontSize: 20, padding:4}}>  {transl[lang]['side_orders']}  </Text>
        </View>


         <View style={{ borderTopWidth: 0.5, borderTopColor: 'black', flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' }}>
            <Icon name="ios-card" style={{ color: 'white', fontSize:30 }} /><Text onPress={this.navigateToScreen('Payments')} style={{fontSize: 20, padding:4}}>  {transl[lang]['side_payments']} </Text>
        </View>

        

       <View style={{ borderTopWidth: 0.5, borderTopColor: 'black', flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' }}>
            <Icon name="ios-megaphone" style={{ color: 'white', fontSize:30 }} /><Text onPress={this.navigateToScreen('FAQ')} style={{fontSize: 20, padding:4}}> {transl[lang]['side_faq']} </Text>
        </View>




         <View style={{ borderTopWidth: 0.5, borderTopColor: 'black', flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' }}>
            <Icon name="ios-construct" style={{ color: 'white', fontSize:30 }} /><Text onPress={this.navigateToScreen('Setting')} style={{fontSize: 20, padding:4}}> {transl[lang]['side_setting']} </Text>
        </View>





         <View style={{    flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' , marginTop: 80}}>
            <Icon name="ios-undo" style={{ color: '#FF5555', fontSize:30 }} /><Text onPress={this.navigateToScreen('Inicio')} style={{fontSize: 20, padding:4, color:'#fff'}}> {transl[lang]['side_salir']} </Text>
        </View>

         <View style={{    flex: 1, flexDirection: 'row', padding:20, alignSelf: 'flex-start' , marginTop: 0}}>
            <Text style={{fontSize: 10, padding:4, color:'#fff'}}>  Version 1.0.0 - clicwash LLC - 2019</Text>
        </View>
         
        
        


        

         
      </Content>
    </Container>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};






const AppDrawerNavigator = createDrawerNavigator({

  Home: { screen: DashboardStackNavigator },
  Account: { screen: Account },
  Orders: { screen: Orders },
  Payments: { screen: Payments },
  FAQ: { screen: Faq },
  Setting: { screen: Setting },
  SignOut: { screen: Inicio },
  Perfil: { screen: Perfil},
  InicioCliente: {screen:InicioCliente}, 




  

}, 

 

{
    drawerPosition: 'left',
    contentComponent: SideMenu,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'

  })

 
 



 // Aqui intercambio la pagina de inicio por la del perfil

const AppSwitchNavigator = createSwitchNavigator({
 Inicio: Inicio ,
 // Inicio: AppDrawerNavigator,
  Iniciar_sesion: cabecera_iniciar_sesion,
  Registrarse: cabecera_registrarse,
  OlvidoContra: cabecera_olvido,
  InicioCliente: InicioCliente,

 
  Perfil: AppDrawerNavigator 

   
});

 


const AppContainer = createAppContainer(AppSwitchNavigator);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      }
    })
  }
});