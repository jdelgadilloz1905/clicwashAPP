import React, { Component } from 'react';
import { ImageBackground, View, Text, StyleSheet  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import styles from '../styles/styles.js'; 
import DateTimePicker from "react-native-modal-datetime-picker";
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';

import * as Localization from 'expo-localization';


export default class Reserva_3 extends Component {
  state = {
    isDateTimePickerVisible: false,
    isDateTimePickerVisible2: false,
    isDateTimePickerVisible3: false,
    momento_lavado:this.props.navigation.state.params.momento_lavado,
    paquete_titulo: this.props.navigation.state.params.paquete_titulo,
    paquete_precio: this.props.navigation.state.params.paquete_precio,
    paquete_id: this.props.navigation.state.params.paquete_id,
    Id_Global: this.props.navigation.state.params.Id_Global,
    total_vehiculos: this.props.navigation.state.params.total_vehiculos,
    
    selectedDate: null,
    selectedDate2:null,
    selectedDate3:null,
    continuar:'No',
    error:null
  };




  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  showDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: true });
  };

  showDateTimePicker3 = () => {
    this.setState({ isDateTimePickerVisible3: true });
  };







  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  hideDateTimePicker2 = () => {
    this.setState({ isDateTimePickerVisible2: false });
  };

  hideDateTimePicker3 = () => {
    this.setState({ isDateTimePickerVisible3: false });
  };








  handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this.hideDateTimePicker();
  };

  handleDatePicked2 = date => {
    this.setState({ selectedDate2: date.toString() });
    this.hideDateTimePicker2();
  };

  handleDatePicked3 = date => {
    this.setState({ selectedDate3: date.toString() });
    this.hideDateTimePicker3();
  };







  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
      
    const { isDateTimePickerVisible, isDateTimePickerVisible2, isDateTimePickerVisible3, selectedDate, selectedDate2, selectedDate3} = this.state;
    var arreglo_fecha = selectedDate;

    var arreglo_hora_1 = selectedDate2;
    var arreglo_hora_2 = selectedDate3;

    

    if (arreglo_fecha!=null) {
      var arreglo_pasado = arreglo_fecha.split(' ');

      
      var mes = arreglo_pasado[1]; 
      var dia = arreglo_pasado[2]; 
      var anio = arreglo_pasado[3]; 

      
      var dia_semana = arreglo_pasado[0];

      if (mes=="Jan") {
        var mes_set = "01";
      }

      else if (mes=="Feb") {
        var mes_set = "02";
      }

      else if (mes=="Mar") {
        var mes_set = "03";
      }

      else if (mes=="Apr") {
        var mes_set = "04";
      }

      else if (mes=="May") {
        var mes_set = "05";
      }

      else if (mes=="Jun") {
        var mes_set = "06";
      }

      else if (mes=="Jul") {
        var mes_set = "07";
      }

      else if (mes=="Aug") {
        var mes_set = "08";
      }

      else if (mes=="Sep") {
        var mes_set = "09";
      }

      else if (mes=="Oct") {
        var mes_set = "10";
      }

      else if (mes=="Nov") {
        var mes_set = "11";
      } 

      else {
        var mes_set = "12";
      }


      var fecha = mes_set+"-"+dia+"-"+anio;

      

    }

    if (arreglo_hora_1!=null) {
      var arreglo_hora_1 = arreglo_hora_1.split(' ');
      var hora1 = arreglo_hora_1[4]; 
      var hora1_array = hora1.split(':');
      var horaInicio = hora1_array[0]+":"+hora1_array[1]; 
      var hora_cita_hora = hora1_array[0];
      var hora_cita_minutos = hora1_array[1];

      if (hora_cita_hora==13) {
        var hora_formateada = "01";
      }
      else if (hora_cita_hora==14) {
        var hora_formateada = "02";
      }
      else if (hora_cita_hora==15) {
        var hora_formateada = "03";
      }
      else if (hora_cita_hora==16) {
        var hora_formateada = "04";
      }
      else if (hora_cita_hora==17) {
        var hora_formateada = "05";
      }
      else if (hora_cita_hora==18) {
        var hora_formateada = "06";
      }
      else if (hora_cita_hora==19) {
        var hora_formateada = "07";
      }
      else if (hora_cita_hora==20) {
        var hora_formateada = "08";
      }
      else if (hora_cita_hora==21) {
        var hora_formateada = "09";
      }

      else if (hora_cita_hora==22) {
        var hora_formateada = "10";
      }

      else if (hora_cita_hora==23) {
        var hora_formateada = "11";
      }

      else if (hora_cita_hora==24) {
        var hora_formateada = "00";
      }

      else {
        var hora_formateada = hora_cita_hora;
      }

      if (hora1_array[0]>11) {var hora_cita_am_pm = "PM";}
      else {var hora_cita_am_pm = "AM";}

      var horaInicioFormato = hora_formateada+":"+hora1_array[1]+" "+hora_cita_am_pm; 

      var horaInicioShow = "*** Start: "+horaInicioFormato;

      
      
    }

    else {
      horaInicioShow='';
    }





    if (arreglo_hora_2!=null) {
      var arreglo_hora_2 = arreglo_hora_2.split(' ');
      var hora2 = arreglo_hora_2[4]; 
      var hora2_array = hora2.split(':');
      var horaFin = hora2_array[0]+":"+hora2_array[1];
      
      var hora_cita_hora_salida = hora2_array[0];
      var hora_cita_minutos_salida = hora2_array[1];

      if (hora_cita_hora_salida==13) {
        var hora_formateada_salida = "01";
      }
      else if (hora_cita_hora_salida==14) {
        var hora_formateada_salida = "02";
      }
      else if (hora_cita_hora_salida==15) {
        var hora_formateada_salida = "03";
      }
      else if (hora_cita_hora_salida==16) {
        var hora_formateada_salida = "04";
      }
      else if (hora_cita_hora_salida==17) {
        var hora_formateada_salida = "05";
      }
      else if (hora_cita_hora_salida==18) {
        var hora_formateada_salida = "06";
      }
      else if (hora_cita_hora_salida==19) {
        var hora_formateada_salida = "07";
      }
      else if (hora_cita_hora_salida==20) {
        var hora_formateada_salida = "08";
      }
      else if (hora_cita_hora_salida==21) {
        var hora_formateada_salida = "09";
      }

      else if (hora_cita_hora_salida==22) {
        var hora_formateada_salida = "10";
      }

      else if (hora_cita_hora_salida==23) {
        var hora_formateada_salida = "11";
      }

      else if (hora_cita_hora_salida==24) {
        var hora_formateada_salida = "00";
      }

      else {
        var hora_formateada_salida = hora_cita_hora_salida;
      }



      if (hora2_array[1]>11) {var hora_cita_am_pm_salida = "PM";}
      else {var hora_cita_am_pm_salida = "AM";}


      var horaFinFormato = hora_formateada_salida+":"+hora2_array[1]+" "+hora_cita_am_pm_salida; 
 

      var horaFinShow = "*** Until: "+horaFinFormato;



    }

    else {
      horaFinShow='';
    }

   

 
       

    return (
      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

      <View style={{ flex: 1,   justifyContent: 'center' }}>
 
      <View style={styles.bloqueContenido}>

          <Text style={styles.title1}>Date of your wash</Text>

          <View style={{flexDirection:'row', width:'70%', alignItems: 'center'}}>

                <Icon style={{ padding: 5 }} onPress={() => navigation.openDrawer()} name="ios-calendar" size={30} />

                <Button style={{margin:20}}  title="Select the Date" onPress={this.showDateTimePicker} />

          </View>

      </View>

      <View style={styles.bloqueContenido}>

         <Text style={styles.title3}>Availability Window</Text>

         <View style={{flexDirection:'row',  width:'60%', alignItems: 'center'}}>

         <Button style={{margin:10}}  title="< Start" onPress={this.showDateTimePicker2} /> 

               <Icon style={{ padding: 5 }} onPress={() => navigation.openDrawer()} name="md-alarm" size={30} />

               

                <Button  style={{margin:10}}  title="Until >" onPress={this.showDateTimePicker3} />

          </View>

      </View>


          

          

          

           

        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          mode={'date'}
          is24Hours={true}
        />


        

        <DateTimePicker
          isVisible={isDateTimePickerVisible2}
          onConfirm={this.handleDatePicked2}
          onCancel={this.hideDateTimePicker2}
          mode={'time'}
          is24Hours={true}
        />


        <DateTimePicker
          isVisible={isDateTimePickerVisible3}
          onConfirm={this.handleDatePicked3}
          onCancel={this.hideDateTimePicker3}
          mode={'time'}
          is24Hours={true}
        />

        <View style={styles.bloqueContenido}>


 <Text style={styles.title3}>Your appointment will be on </Text>

          {(this.state.selectedDate!=null)? <Text  style={styles.p  }>{dia_semana},  {mes} / {dia} / {anio}   </Text> :null}
          
          {(this.state.selectedDate2!=null)? <Text style={styles.p}>{horaInicioShow}   </Text> :null}

          {(this.state.selectedDate3!=null)? <Text style={styles.p}>{horaFinShow} </Text> :null}

        








        {(this.state.selectedDate!=null && this.state.selectedDate2!=null && this.state.selectedDate3!=null )?  
          <Button style={{marginBottom:20, marginTop:20 }} title="Continue"  
          onPress={() => this.props.navigation.navigate('Reserva_4',{total_vehiculos:this.state.total_vehiculos, Id_Global:this.state.Id_Global , paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado, hora_cita_am_pm_salida:hora_cita_am_pm_salida, hora_cita_minutos_salida:hora_cita_minutos_salida, hora_cita_hora_salida:hora_cita_hora_salida, hora_cita_am_pm:hora_cita_am_pm, hora_cita_minutos:hora_cita_minutos, hora_cita_hora:hora_cita_hora, dia_semana:dia_semana, fecha:fecha, paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, momento_lavado:this.state.momento_lavado, selectedDate:selectedDate } )}/>:null }
         
        </View>

      </View>

    </ImageBackground>
    );
  }
}

 

