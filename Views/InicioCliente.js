import React, { Component } from 'react';
import { View, TouchableHighlight, Linking, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground , Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
//import { ObtenerData } from '../helpers/ObtenerData';
import styles from '../styles/styles.js'; 

import * as Localization from 'expo-localization';


export default class InicioCliente extends Component {

  
 constructor(props) {
    super(props);
    this.state = { 
      Id_Global: this.props.Id_Global,
      data: null,
      loaded: true,
      error: null,
      total_vehiculos:1,
      tecnico_status_solicitud:'',
      paquete_color_top1:'#ECF1FF',
      paquete_color_top2:'#FFF',
      paquete_color_top3:'#FFF',
      paquete_color_top4:'#FFF',
      paquete_titulo:'Clic Basic',
      paquete_precio:'$ 49.99',
      paquete_id:'1',
      paquete_detalle1:'',
      paquete_detalle2:'',
      paquete_detalle3:'',
      paquete_detalle4:'',
      paquete_detalle5:'',
      paquete_detalle6:'',
      paquete_detalle7:'',
      paquete_detalle8:'',
      paquete_detalle9:'',
      paquete_detalle10:'',
      paquete_detalle11:'',
      paquete_detalle12:'',
      paquete_detalle13:'',
      paquete_detalle14:'',
      paquete_detalle15:'',
      paquete_detalles:[],
      baseURL_1 : 'htpps://clicwash.com/php/App/obtener_info_paquete_1.php',
      baseURL_2 : 'htpps://clicwash.com/php/App/obtener_info_paquete_2.php',
      baseURL_3 : 'htpps://clicwash.com/php/App/obtener_info_paquete_3.php',
      baseURL_4 : 'htpps://clicwash.com/php/App/obtener_info_paquete_4.php',
      id_paquete:1



       };
  }

  
    
    getDataPackage1 = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.state.baseURL_1 + '/comments';
        let h = new Headers();
        h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
        h.append('X-Client', 'Steve and Friends');
        
        let req = new Request(url, {
            headers: h,
            method: 'POST',

            body: JSON.stringify({
                id: this.state.id_paquete
              })
        }

        );
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }

    getDataPackage2 = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.state.baseURL_2 + '/comments';
        let h = new Headers();
        h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
        h.append('X-Client', 'Steve and Friends');
        
        let req = new Request(url, {
            headers: h,
            method: 'POST',

            body: JSON.stringify({
                id: this.state.id_paquete
              })
        }

        );
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }

    getDataPackage3 = (ev)=>{
        this.setState({loaded:false, error: null});
        let url = this.state.baseURL_3 + '/comments';
        
        let h = new Headers();
        h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
        h.append('X-Client', 'Steve and Friends');
        
        let req = new Request(url, {
            headers: h,
            method: 'POST',

            body: JSON.stringify({
                id: this.state.id_paquete
              })
        }

        );
        
        fetch(req)
        .then(response=>response.json())
        .then(this.showData)
        .catch(this.badStuff)
    }

    getDataPackage4 = (ev)=>{
      this.setState({loaded:false, error: null});
      let url = this.state.baseURL_4 + '/comments';
      
      let h = new Headers();
      h.append('Authorization', 'Bearer sjdkfhakdkakhkajsdhks');
      h.append('X-Client', 'Steve and Friends');
      
      let req = new Request(url, {
          headers: h,
          method: 'POST',

          body: JSON.stringify({
              id: this.state.id_paquete
            })
      }

      );
      
      fetch(req)
      .then(response=>response.json())
      .then(this.showData)
      .catch(this.badStuff)
  }

    showData = (data)=>{
      
      
        this.setState({loaded:true, data});
      
        this.setState({paquete_titulo:data.paquete_en});
        this.setState({paquete_precio:'$ '+data.precio});
        this.setState({paquete_detalle1:data.espe_en_1});
        this.setState({paquete_detalle2:data.espe_en_2});
        this.setState({paquete_detalle3:data.espe_en_3});
        this.setState({paquete_detalle4:data.espe_en_4});
        this.setState({paquete_detalle5:data.espe_en_5});
        this.setState({paquete_detalle6:data.espe_en_6});
        this.setState({paquete_detalle7:data.espe_en_7});
        this.setState({paquete_detalle8:data.espe_en_8});
        this.setState({paquete_detalle9:data.espe_en_9});
        this.setState({paquete_detalle10:data.espe_en_10});
        this.setState({paquete_detalle11:data.espe_en_11});
        this.setState({paquete_detalle12:data.espe_en_12});
        this.setState({paquete_detalle13:data.espe_en_13});
        this.setState({paquete_detalle14:data.espe_en_14});
        this.setState({paquete_detalle15:data.espe_en_15});
         
    }
    badStuff = (err) => {
        this.setState({loaded: true, error: err.message});
    }








    componentDidMount(){
        this.getDataPackage1();
        //geolocation -> fetch
    }









  setColorTop1= () => {
 
        
        this.setState({id_paquete:1});
       
        this.getDataPackage1();

           
         
         this.setState({paquete_color_top1:'#ECF1FF'});
         this.setState({paquete_color_top2:'#FFF'});
         this.setState({paquete_color_top3:'#FFF'});
         this.setState({paquete_color_top4:'#FFF'});
    }


    setColorTop2= () => {

       this.setState({id_paquete:2});
        
       this.getDataPackage2();

         
         this.setState({paquete_color_top1:'#FFF'});
         this.setState({paquete_color_top2:'#ECF1FF'});
         this.setState({paquete_color_top3:'#FFF'});
         this.setState({paquete_color_top4:'#FFF'});

  
    }

    setColorTop3= () => {
      this.setState({id_paquete:3});

     

      this.getDataPackage3();

         this.setState({paquete_color_top1:'#FFF'});
         this.setState({paquete_color_top2:'#FFF'});
         this.setState({paquete_color_top3:'#ECF1FF'});
         this.setState({paquete_color_top4:'#FFF'});
    }


    setColorTop4= () => {
      this.setState({id_paquete:4});
      
        this.getDataPackage4();
 
         this.setState({paquete_color_top1:'#FFF'});
         this.setState({paquete_color_top2:'#FFF'});
         this.setState({paquete_color_top3:'#FFF'});
         this.setState({paquete_color_top4:'#ECF1FF'});
 
    }

    sumarVehiculos=()=>{

      total_vehiculos = parseInt(this.state.total_vehiculos)+1 ;

      this.setState({total_vehiculos});
    }

    restarVehiculos=()=>{

      if (this.state.total_vehiculos>1){
        total_vehiculos = parseInt(this.state.total_vehiculos)-1 ;
      }

      else {
        total_vehiculos = parseInt(this.state.total_vehiculos);
      }
      

      this.setState({total_vehiculos});
  
    }




    



 
 

  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = (Localization.locale).substr(0,2);
      // {transl[lang]['inicio_b1']}

    let arreglo_detalles = [];

    

    if (this.state.paquete_detalle1!="-") {
      arreglo_detalles.push(['1. ',this.state.paquete_detalle1] )
    }

    if (this.state.paquete_detalle2!="-") {
      arreglo_detalles.push(['2. ',this.state.paquete_detalle2] )
    }

    if (this.state.paquete_detalle3!="-") {
      arreglo_detalles.push(['3. ',this.state.paquete_detalle3] )
    }

    if (this.state.paquete_detalle4!="-") {
      arreglo_detalles.push(['4. ',this.state.paquete_detalle4] )
    }

    if (this.state.paquete_detalle5!="-") {
      arreglo_detalles.push(['5. ',this.state.paquete_detalle5] )
    }

    if (this.state.paquete_detalle6!="-") {
      arreglo_detalles.push(['6. ',this.state.paquete_detalle6] )
    }

    if (this.state.paquete_detalle7!="-") {
      arreglo_detalles.push(['7. ',this.state.paquete_detalle7] )
    }

    if (this.state.paquete_detalle8!="-") {
      arreglo_detalles.push(['8. ',this.state.paquete_detalle8] )
    }

    if (this.state.paquete_detalle9!="-") {
      arreglo_detalles.push(['9. ',this.state.paquete_detalle9] )
    }

    if (this.state.paquete_detalle10!="-") {
      arreglo_detalles.push(['10. ',this.state.paquete_detalle10] )
    }

    if (this.state.paquete_detalle11!="-") {
      arreglo_detalles.push(['11. ',this.state.paquete_detalle11] )
    }

    if (this.state.paquete_detalle12!="-") {
      arreglo_detalles.push(['12. ',this.state.paquete_detalle12] )
    }

    if (this.state.paquete_detalle13!="-") {
      arreglo_detalles.push(['13. ',this.state.paquete_detalle13] )
    }

    if (this.state.paquete_detalle14!="-") {
      arreglo_detalles.push(['14. ',this.state.paquete_detalle14] )
    }

    if (this.state.paquete_detalle15!="-") {
      arreglo_detalles.push(['15. ',this.state.paquete_detalle15] )
    }

    

    return (
      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

 


<View style={{flexDirection:'row', backgroundColor: '#fff', width:'100%'}}>


        <TouchableHighlight style={{backgroundColor:this.state.paquete_color_top1,  width:'25%'}} underlayColor="white" onPress={this.setColorTop1} >
        <View  >
              <Image
                style={{width: 70, height: 70,   margin:15   }}
                source={{uri: 'https://clicwash.com/img/bronce.png'}}
              /> 

              <Text style={styles.ps} >$ 49.99 </Text>

        </View>
        </TouchableHighlight>



        <TouchableHighlight style={{backgroundColor:this.state.paquete_color_top2,  width:'25%'}} underlayColor="white" onPress={this.setColorTop2} >
        <View  >
              <Image
                style={{width: 70, height: 70,  margin:15      }}
                source={{uri: 'https://clicwash.com/img/plata.png'}}
              /> 

              <Text style={styles.ps} >$ 79.99 </Text>

        </View>
        </TouchableHighlight>





        <TouchableHighlight style={{backgroundColor:this.state.paquete_color_top3,  width:'25%'}} underlayColor="white" onPress={this.setColorTop3}>
        <View   >

              <Image
                style={{width: 70, height: 70,  margin:15     }}
                source={{uri: 'https://clicwash.com/img/oro.png'}}
              /> 

              <Text style={styles.ps} >$ 129.99 </Text>

        </View>
        </TouchableHighlight>



        <TouchableHighlight style={{backgroundColor:this.state.paquete_color_top4,  width:'25%'}} underlayColor="white" onPress={this.setColorTop4} >
        <View  >

              <Image
                style={{width: 70, height: 70,   margin:15    }}
                source={{uri: 'https://clicwash.com/img/esmeralda.png'}}
              /> 

              <Text style={styles.ps} >$ 149.99 </Text>

        </View>
        </TouchableHighlight>
               
                 
</View>
                    <ScrollView>



                  <View style={styles.preciosCuadro }  >


                
                            <Text style={styles.preciosH1}>{this.state.paquete_titulo}</Text>


                            <Text style={styles.preciosH2}>{this.state.paquete_precio}</Text>

                            {
                                  arreglo_detalles.map( comment => (

                                      <View style={styles.bloqueContenido} key={comment} >

                                      <Text style={styles.preciosp}  >
                                         { comment }     
                                      </Text>

                                       

                                      </View>

                                  ))
                            }




                            <View style={{flexDirection:'row', backgroundColor: '#FFF', width:'40%', marginLeft:30, marginTop:5}}>

                                  <Button  
                                    title="+" 
                                    onPress={this.sumarVehiculos }
                                  />

                                  <Text style={styles.title3}>{this.state.total_vehiculos}</Text>

                                  <Button  
                                    title="-" 
                                    onPress={this.restarVehiculos }
                                  />

                            </View>



                            <Button style={styles.preciosBoton} 
                              title=" GET STARTED "


                              
                              onPress={() => this.props.navigation.navigate('Reserva_1',{total_vehiculos:this.state.total_vehiculos ,paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, Id_Global:this.state.Id_Global } )}
                            />

                      </View>




                    <View style={styles.bloqueContenido}  >
                
 
                            <Button  style={{height: 50, marginTop:10 }}
                              title=" < CONTACT US > "
                               
                               onPress={ ()=>{ Linking.openURL('https://clicwash.com/index.php?menu=contact') } } 
                            />

                      </View>

                     



                    </ScrollView>





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

