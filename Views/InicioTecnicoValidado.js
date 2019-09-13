 
import React, { Component } from 'react';
import { Slider, View,  TouchableHighlight, Linking, ScrollView, Text, StyleSheet, TouchableOpacity,  TextInput, AsyncStorage , ImageBackground , Image, Platform  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
//import { ObtenerData } from '../helpers/ObtenerData';
import styles from '../styles/styles.js'; 
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import DateTimePicker from "react-native-modal-datetime-picker"; 
import * as Localization from 'expo-localization';


 
export default class InicioTecnicoValidado extends Component {

    constructor(props) {
      super(props)

      this.props.tecnico_trabajo_alcance
      this.state = { 
              mensaje_conectado: 'You are Online', 
              conexion: 'ON',
              mensaje_boton: "Turn Off Connection",
              color_boton:"#99FFA2",

              selectedDate: null,
              selectedDate2:null,
              selectedDate3:null,

              isDateTimePickerVisible: false,
              isDateTimePickerVisible2: false,
              isDateTimePickerVisible3: false,


              startLabel: 10,
              endLabel: 20,
              min:0,
              max:40,
              start: 10,
              end: 20,
              color:"blue",
              distanciaON:'Off',
              tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
              tableData: [
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd'],
                ['1', '2', '3', '4'],
                ['a', 'b', 'c', 'd']
              ]


        }

        
        
        
    }

  

  asInverse(num) {
        
        const { min, max } = this.state;
        const numInverse = min + (max - num);
        return numInverse;
    }
    asForward(numInverse) {
 
        const { min, max } = this.state;
        const num = -numInverse + min + max;
        return num;
    }
    
    handleStartValueChange = (startInverse) => {
        this.setState({ distanciaON:'ON' });
        const start = this.asForward(startInverse);
        this.setState(() => ({ startLabel:start }));
    }
    handleStartSlidingComplete = (startInverse) => {
 
        const start = this.asForward(startInverse);
        this.setState(() => ({ start }));
    }

    handleEndValueChange = end => this.setState(() => ({ endLabel:end }))
    handleEndSlidingComplete = end => this.setState(() => ({ end }))




  setConexion = () => {
       if (this.state.conexion=="ON") {
        this.setState({mensaje_conectado:"You are OFFLINE"});
        this.setState({conexion:"OFF"});
        this.setState({ruta:"'../assets/OFF.png'"});
        this.setState({color_boton:"#FF2929"});
       } 

       else if (this.state.conexion=="OFF") {
        this.setState({mensaje_conectado:"You are ONLINE"});
        this.setState({conexion:"ON"});
        this.setState({ruta:"'../assets/ON.png'"});
        this.setState({color_boton:"#99FFA2"});
       } 
       
    }




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



apagarLunes =()=>{ this.setState({ tecnico_trabajo_lunes: 'off' }); }

encenderLunes =()=>{  this.setState({ tecnico_trabajo_lunes: 'on' }); }



apagarMartes =()=>{ this.setState({ tecnico_trabajo_martes: 'off' }); }

encenderMartes =()=>{  this.setState({ tecnico_trabajo_martes: 'on' }); }



apagarMiercoles =()=>{ this.setState({ tecnico_trabajo_miercoles: 'off' }); }

encenderMiercoles =()=>{  this.setState({ tecnico_trabajo_miercoles: 'on' }); }



apagarJueves =()=>{ this.setState({ tecnico_trabajo_jueves: 'off' }); }

encenderJueves =()=>{  this.setState({ tecnico_trabajo_jueves: 'on' }); }



apagarViernes =()=>{ this.setState({ tecnico_trabajo_viernes: 'off' }); }

encenderViernes =()=>{  this.setState({ tecnico_trabajo_viernes: 'on' }); }




apagarSabado =()=>{ this.setState({ tecnico_trabajo_sabado: 'off' }); }

encenderSabado =()=>{  this.setState({ tecnico_trabajo_sabado: 'on' }); }



apagarDomingo =()=>{ this.setState({ tecnico_trabajo_domingo: 'off' }); }

encenderDomingo =()=>{  this.setState({ tecnico_trabajo_domingo: 'on' }); }


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





  actualizar_lavador = ()=>{

    if (this.state.tecnico_trabajo_lunes==null )  {var lunes = this.props.tecnico_trabajo_lunes; }
    else {  var lunes = this.state.tecnico_trabajo_lunes ;  }

    if (this.state.tecnico_trabajo_martes==null )  {var martes = this.props.tecnico_trabajo_martes; }
    else {  var martes = this.state.tecnico_trabajo_martes ;  }

    if (this.state.tecnico_trabajo_miercoles==null )  {var miercoles = this.props.tecnico_trabajo_miercoles; }
    else {  var miercoles = this.state.tecnico_trabajo_miercoles ;  }

    if (this.state.tecnico_trabajo_jueves==null )  {var jueves = this.props.tecnico_trabajo_jueves; }
    else {  var jueves = this.state.tecnico_trabajo_jueves ;  }

    if (this.state.tecnico_trabajo_viernes==null )  {var viernes = this.props.tecnico_trabajo_viernes; }
    else {  var viernes = this.state.tecnico_trabajo_viernes ;  }

    if (this.state.tecnico_trabajo_sabado==null )  {var sabado = this.props.tecnico_trabajo_sabado; }
    else {  var sabado = this.state.tecnico_trabajo_sabado ;  }

    if (this.state.tecnico_trabajo_domingo==null )  {var domingo = this.props.tecnico_trabajo_domingo; }
    else {  var domingo = this.state.tecnico_trabajo_domingo ;  }

    if (this.state.distanciaON!='ON' )  {var rango = this.props.tecnico_trabajo_alcance; }
    else {  var rango = this.state.startLabel ;  }


    if (this.state.selectedDate2!=null )  {

      var Entrada = this.state.selectedDate2; 
      var arreglo_entrada = Entrada.split(' ');
      var hora2 = arreglo_entrada[4]; 
      var hora2_array = hora2.split(':');
      var hora_entrada_hora = hora2_array[0];
      var hora_entrada_minutos = hora2_array[1];
      var horaEntrada = hora_entrada_hora+":"+hora_entrada_minutos; 

      } else {  var horaEntrada = this.props.tecnico_trabajo_hora_entrada ;  }


    if (this.state.selectedDate3!=null )  {

      var Salida = this.state.selectedDate3; 
      var arreglo_salida = Salida.split(' ');
      var hora1 = arreglo_salida[4]; 
      var hora1_array = hora1.split(':'); 
      var hora_cita_hora = hora1_array[0];
      var hora_cita_minutos = hora1_array[1];
      var horaSalida = hora_cita_hora+":"+hora_cita_minutos; 

    }  else {  var horaSalida = this.props.tecnico_trabajo_hora_salida ;  }

   
 

    fetch('https://clicwash.com/php/App/update_lavador.php', {
           method: 'POST',
           header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },

          body: JSON.stringify({
                lunes: lunes,
                martes: martes,
                miercoles: miercoles,
                jueves: jueves,
                viernes: viernes,
                sabado: sabado,
                domingo: domingo,
                rango: rango,
                horaEntrada: horaEntrada,
                horaSalida: horaSalida,
                Id:this.props.Id_Global,
              })

          })

          .then((response) => response.json())
          .then((respuesta) => {
                    

                    alert("Login to validate");
                    this.props.navigation.navigate('Iniciar_sesion')
 
          })
               
          .catch((error) => {
          alert("Try Again later");
          });
 


 


  }


 
  render() {

  
    const transl = require('../Controllers/traductor.json');
      const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}
 
    const { color, min, max } = this.state;
    const { start, startLabel, end,  endLabel } = this.state;
    const { isDateTimePickerVisible, isDateTimePickerVisible2, isDateTimePickerVisible3, selectedDate, selectedDate2, selectedDate3} = this.state;

    var arreglo_hora_1 = selectedDate2;
    var arreglo_hora_2 = selectedDate3;
 
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );


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

      var horaInicioShow =  horaInicioFormato;

      
      
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
 

      var horaFinShow =  horaFinFormato;



    }

    else {
      horaFinShow='';
    }

 
    

    return (

    
      <ImageBackground source={require('../assets/fondo_perfil_app.jpg')}  style={styles.container}>

                        <ScrollView>

                    
            <Image
          style={{width: 200, height: 50,   marginTop:40, marginBottom:30  }}
          source={require('../assets/logo2.png')} 

         
        /> 
                <View style={styles.bloqueContenido}  >

                      <Text style={styles.title1}>Control Panel</Text>

                    

                      <TouchableOpacity onPress={this.setConexion} >

                      {(this.state.conexion=="OFF")?
                        <Image
                                style={{width: 100, height: 100, marginBottom:40  }}
                                source={require('../assets/ON.png')} />:
                        <Image
                                style={{width: 100, height: 100, marginBottom:40  }}
                                source={require('../assets/OFF.png')} />
                      }



                      

                             

                      </TouchableOpacity>

   

                    
                      

                </View>



                <View style={styles.bloqueContenido}  >

                 <Text style={styles.title3}>- {this.state.mensaje_conectado} -</Text>



                      {(this.state.conexion=="ON")?
                        <Button   
                          title="Immediate Requests"
                          style={styles.preciosBoton} 
                          onPress={() => this.props.navigation.navigate('Lavados_Inmediatos',{Id_Global:this.props.Id_Global, navigation:this.props.navigation}  )}
                      />:null
                      }
                      
                      {Platform.OS !== 'ios' && <Text size={5} />}
                      {(this.state.conexion=="ON")?
                        <Button  style={{height: 80, marginTop:40   }}
                        title="Scheduled Requests"
                        style={styles.preciosBoton} 
                        onPress={() => this.props.navigation.navigate('Lavados_Agendados',{Id_Global:this.props.Id_Global, navigation:this.props.navigation}  )}
                      />:null
                      }
                      {Platform.OS !== 'ios' && <Text size={5} />}
                      {(this.state.conexion=="ON")?
                        <Button  style={{height: 80, marginTop:40   }}
                        title="Pending Appointments"
                        style={styles.preciosBoton} 
                        onPress={() => this.props.navigation.navigate('Lavados_Pendientes',{Id_Global:this.props.Id_Global, navigation:this.props.navigation}  )}
                      />:null
                      }
                      
   

                      

                </View>



                 <View style={styles.bloqueContenido}  >

                        <Text style={styles.title3}>- Work Information -</Text>

 
                      {(this.state.distanciaON!='ON')?
                      <Text style={styles.p}>Miles from You: {this.props.tecnico_trabajo_alcance} Mil </Text>:
                      <Text style={styles.p}>Miles from You: {startLabel} Mil </Text>
                      }

                      <View style={{width:200}}>

                            <Slider style={styles.backgroundSlider} minimumValue={this.min} maximumValue={this.max} thumbTintColor="transparent" />

                            <Slider style={styles.startSlider} onValueChange={this.handleStartValueChange} onSlidingComplete={this.handleStartSlidingComplete} value={this.asInverse(start)} step={1} minimumValue={min} maximumValue={max} thumbTintColor={color} minimumTrackTintColor={color} maximumTrackTintColor="transparent" />

                      </View>


 

                      <View style={styles.tabla}>

                          <View style={styles.columHead}>
                            <Text style={{fontWeight:'bold', fontSize: 18}}>Day</Text>
                          </View>

                          <View style={styles.columHead}>
                            <Text style={{fontWeight:'bold', fontSize: 18}}>Status</Text>
                          </View>
  
                      </View>


                      <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Monday </Text>
                            {(this.props.tecnico_trabajo_lunes=='on' && (this.state.tecnico_trabajo_lunes==null || this.state.tecnico_trabajo_lunes=='on') )?
                            <Text>({this.props.tecnico_trabajo_lunes})</Text>:
                            <Text>({this.state.tecnico_trabajo_lunes})</Text>
                            }
                            
                          </View>

                          <View style={styles.columBody}>
                            {(this.props.tecnico_trabajo_lunes=='on' && (this.state.tecnico_trabajo_lunes==null || this.state.tecnico_trabajo_lunes=='on') )?
                            <Button  title="Turn off" onPress={this.apagarLunes}  />:
                            <Button title="Turn on" onPress={this.encenderLunes}   />
                            }
                          </View>
  
                      </View>


                       <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Tuesday</Text>

                            {(this.props.tecnico_trabajo_martes=='on' && (this.state.tecnico_trabajo_martes==null || this.state.tecnico_trabajo_martes=='on') )?
                            <Text>({this.props.tecnico_trabajo_martes})</Text>:
                            <Text>({this.state.tecnico_trabajo_martes})</Text>
                            }
                          </View>

                          <View style={styles.columBody}>
                            
                           
                            {(this.props.tecnico_trabajo_martes=='on' && (this.state.tecnico_trabajo_martes==null || this.state.tecnico_trabajo_martes=='on') )?
                            <Button title="Turn off" onPress={this.apagarMartes}  />:
                            <Button title="Turn on" onPress={this.encenderMartes}   />
                            }
                       

                          </View>
  
                      </View>


                       <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Wednesday</Text>

                            {(this.props.tecnico_trabajo_miercoles=='on' && (this.state.tecnico_trabajo_miercoles==null || this.state.tecnico_trabajo_miercoles=='on') )?
                            <Text>({this.props.tecnico_trabajo_miercoles})</Text>:
                            <Text>({this.state.tecnico_trabajo_miercoles})</Text>
                            }
                          </View>

                          <View style={styles.columBody}>

                          {(this.props.tecnico_trabajo_miercoles=='on' && (this.state.tecnico_trabajo_miercoles==null || this.state.tecnico_trabajo_miercoles=='on') )?
                            <Button title="Turn off" onPress={this.apagarMiercoles}  />:
                            <Button title="Turn on" onPress={this.encenderMiercoles}   />
                            }


                            
                          </View>
  
                      </View>


                       <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Thursday</Text>
                            {(this.props.tecnico_trabajo_jueves=='on' && (this.state.tecnico_trabajo_jueves==null || this.state.tecnico_trabajo_jueves=='on') )?
                            <Text>({this.props.tecnico_trabajo_jueves})</Text>:
                            <Text>({this.state.tecnico_trabajo_jueves})</Text>
                            }
                          </View>

                          <View style={styles.columBody}>
                            
                            {(this.props.tecnico_trabajo_jueves=='on' && (this.state.tecnico_trabajo_jueves==null || this.state.tecnico_trabajo_jueves=='on') )?
                            <Button title="Turn off" onPress={this.apagarJueves}  />:
                            <Button title="Turn on" onPress={this.encenderJueves}   />
                            }

                          </View>
  
                      </View>


                       <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Friday</Text>
                            {(this.props.tecnico_trabajo_viernes=='on' && (this.state.tecnico_trabajo_viernes==null || this.state.tecnico_trabajo_viernes=='on') )?
                            <Text>({this.props.tecnico_trabajo_viernes})</Text>:
                            <Text>({this.state.tecnico_trabajo_viernes})</Text>
                            }
                          </View>

                          <View style={styles.columBody}>
                            
                            {(this.props.tecnico_trabajo_viernes=='on' && (this.state.tecnico_trabajo_viernes==null || this.state.tecnico_trabajo_viernes=='on') )?
                            <Button title="Turn off" onPress={this.apagarViernes}  />:
                            <Button title="Turn on" onPress={this.encenderViernes}   />
                            }

                          </View>
  
                      </View>


                       <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Saturday</Text>
                            {(this.props.tecnico_trabajo_sabado=='on' && (this.state.tecnico_trabajo_sabado==null || this.state.tecnico_trabajo_sabado=='on') )?
                            <Text>({this.props.tecnico_trabajo_sabado})</Text>:
                            <Text>({this.state.tecnico_trabajo_sabado})</Text>
                            }
                          </View>

                          <View style={styles.columBody}>
                            
                            {(this.props.tecnico_trabajo_sabado=='on' && (this.state.tecnico_trabajo_sabado==null || this.state.tecnico_trabajo_sabado=='on') )?
                            <Button title="Turn off" onPress={this.apagarSabado}  />:
                            <Button title="Turn on" onPress={this.encenderSabado}   />
                            }

                          </View>
  
                      </View>


                       <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15}}>Sunday</Text>
                            {(this.props.tecnico_trabajo_domingo=='on' && (this.state.tecnico_trabajo_domingo==null || this.state.tecnico_trabajo_domingo=='on') )?
                            <Text>({this.props.tecnico_trabajo_domingo})</Text>:
                            <Text>({this.state.tecnico_trabajo_domingo})</Text>
                            }
                          </View>

                          <View style={styles.columBody}>
                            {(this.props.tecnico_trabajo_domingo=='on' && (this.state.tecnico_trabajo_domingo==null || this.state.tecnico_trabajo_domingo=='on') )?
                            <Button title="Turn off" onPress={this.apagarDomingo}  />:
                            <Button title="Turn on" onPress={this.encenderDomingo}   />
                            }
                          </View>
  
                      </View>



                      <View style={styles.tabla}>

                          <View style={styles.columHead}>
                            <Text style={{fontWeight:'bold', fontSize: 18}}></Text>
                          </View>

                          <View style={styles.columHead}>
                            <Text style={{fontWeight:'bold', fontSize: 18}}></Text>
                          </View>
  
                      </View>







                      <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15, marginBottom:25}}>Working time (Start)</Text>
                            
                            {(this.state.tecnico_trabajo_hora_entrada!=null)? <Text style={styles.p}>{horaInicioShow}   </Text> :<Text style={{ fontSize: 15, marginBottom:25}}>{this.props.tecnico_trabajo_hora_entrada}</Text>}
                          </View>

                          <View style={styles.columBody}>
                            <Button style={{margin:10}}  title="Select" onPress={this.showDateTimePicker2} /> 
                          </View>
  
                      </View>




                      <View style={styles.tabla}>

                          <View style={styles.columBody}>
                            <Text style={{ fontSize: 15, marginBottom:25}}>Working time (Until)</Text>
                            
                            {(this.state.tecnico_trabajo_hora_salida!=null)? <Text style={styles.p}>{horaFinShow} </Text> :<Text style={{ fontSize: 15, marginBottom:25}}>{this.props.tecnico_trabajo_hora_salida}</Text>}

                            
                          </View>

                          <View style={styles.columBody}>
                            <Button  style={{margin:10}}  title="Select" onPress={this.showDateTimePicker3} />

                          </View>
  
                      </View>
                           
 


                      <Button  style={{height: 80, marginTop:40 }}
                        title="Update"
                        style={styles.preciosBoton} 
                         onPress={this.actualizar_lavador} 
                      />

 

                </View>





            

          {(this.state.selectedDate!=null)? <Text  style={styles.p  }>{dia_semana},  {mes} / {dia} / {anio}   </Text> :null}
          
          

          


               
            </ScrollView>




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
















            <View style={{flexDirection:'row', backgroundColor: '#EFFDFF', width:'100%', alignItems: 'center'}}>
        
              <TouchableHighlight underlayColor="white" onPress={()=>{ Linking.openURL('https://www.instagram.com/clicwash/')} }>
              <Image
                style={{width: 30, height: 30,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/instagram.png'}}
              /> 
              </TouchableHighlight>


              <TouchableHighlight underlayColor="white" onPress={()=>{ Linking.openURL('https://www.facebook.com/clic.wash.14')} }>
              <Image
                style={{width: 30, height: 30,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/facebook.png'}}
              /> 
              </TouchableHighlight>


              <TouchableHighlight underlayColor="white" onPress={()=>{ Linking.openURL('https://api.whatsapp.com/send?phone=14072336137')} }>
              <Image
                style={{width: 30, height: 30,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/btn_whatsapp.png'}}
              /> 
              </TouchableHighlight>




        </View>

          
            </ImageBackground>
    );
  }
} 
