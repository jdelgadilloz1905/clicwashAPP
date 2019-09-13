import React, { Component } from 'react';
import { View, Text, StyleSheet,  TextInput, AsyncStorage, ActivityIndicator, TouchableHighlight,  ImageBackground, Image,Dimensions  } from 'react-native';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
 
 
let { height } = Dimensions.get('window');
 
let box_count = 3;
let box_height = height / box_count; 



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', 
        justifyContent: 'center'
    },
    label: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 48,
  },
    h1: {
        fontSize: 22,
        margin: 20,
        textAlign:'center',
        color:'white',
        fontWeight: 'bold'
    },
    h2: {
        fontSize: 22,
        margin: 5,
        textAlign:'center',
        color:'grey',
         color:'black'
    },
    inputText: {
      borderBottomColor:'#FFF',
      margin: 20,
    width:350,
    padding: 10,
    borderBottomWidth: 2 ,
    color: '#fff',
    fontSize: 20
    },

    inputText_BWhite: {
      borderBottomColor:'#000',
      margin: 20,
    width:350,
    padding: 10,
    borderBottomWidth: 2 ,
    color: '#000',
    fontSize: 20
    },

    inputText_BWhite1: {
        borderBottomColor:'#000',
        margin: 20,
      width:'100%',
      padding: 10,
      borderBottomWidth: 2 ,
      color: '#000',
      fontSize: 14
      },


    

    inputPicker: { 
      borderBottomColor:'#FFF',
      marginTop:20,
    width:350,
    padding: 10,
    height:250,
    borderBottomWidth: 2 ,
    color: '#fff',
    fontSize: 20
    }

    ,
    cuerpoPerfil: {
        flex: 0.8,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        fontSize: 24,
        color: '#333'
    },
    err:{
        color: 'red',
        fontSize: 30,
        fontWeight: 'bold'
    }, title1: {
        fontSize: 35,
        margin: 20,
        textAlign:'center',
        color:'#4f9deb',
        fontWeight: 'bold'
    },title2: {
        fontSize: 35,
        margin: 20,
        textAlign:'center',
        color:'black',
        fontWeight: 'bold'
    },title2bl: {
        fontSize: 35,
        margin: 20,
        textAlign:'center',
        color:'white',
        fontWeight: 'bold'
    },
    title3: {
        fontSize: 25,
        margin: 20,
        textAlign:'center',
        color:'black',
        fontWeight: 'bold'
    },title3bl: {
        fontSize: 25,
        margin: 20,
        textAlign:'center',
        color:'white',
        fontWeight: 'bold'
    },
    title4: {
        fontSize: 20,
        margin: 20,
        textAlign:'center',
        color:'black',
        fontWeight: 'bold'
    },
    title5: {
        fontSize: 15,
        margin: 20,
        textAlign:'center',
        color:'green',
        fontWeight: 'bold'
    },

    bloqueContenido:{
        alignItems: 'center',  
        justifyContent: 'center',  
        backgroundColor:'#FFF', 
        width:'90%', 
        borderBottomColor:'grey', 
        borderBottomWidth: 1, 
        padding:5,
        marginLeft:'5%'

    },

    bloqueContenido1:{
        backgroundColor:'#FFF', 
        width:'90%', 
        borderBottomColor:'grey', 
        borderBottomWidth: 1, 
        padding:5,
        marginLeft:'5%'

    },


    preciosCuadro:{
        alignItems: 'center',  
        justifyContent: 'center',  
        backgroundColor:'#FFF', 
        width:'90%', 
        borderBottomColor:'grey', 
        borderBottomWidth: 1, 
        padding:5,
        marginTop:20,
        marginBottom:20,
        marginLeft:'5%'

    },

    preciosH1:{
        fontWeight: 'bold',  
        fontSize: 40,
        textAlign:'center',
        color:'#4f9deb'
    },

    preciosH2:{
        fontSize: 50,
        margin: 10,
        textAlign:'center',
        color:'black',
        fontWeight: 'bold'
    },

    preciosp:{
        fontSize: 15,
        margin: 5,
        textAlign:'center',
        color:'grey'
    },

    preciosBoton:{
        height: 50, marginTop:10, width:350 
    },



      h1: {
        fontSize: 20,
        margin: 20,
        textAlign:'center',
        color:'white',
        fontWeight: 'bold',
        borderBottomColor:'#FFF',
        borderBottomWidth: 2 
    },
    p: {
        fontSize: 20,
        marginLeft: 25,
        marginRight: 25,
        borderBottomColor:'#FFF',
        borderBottomWidth: 2 ,
        textAlign:'center',
        color:'grey',
         color:'#575757'
    },
    ps: {
        fontSize: 15,
         
        borderBottomColor:'#FFF',
        borderBottomWidth: 2 ,
        
        textAlign:'center',
        color:'grey',
         color:'#575757'
    },

    buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  },

  myRangeWrap: {
    width: 200
  },
  
  sliderLabels: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 8
  },
  
    backgroundSlider: {
        width: '100%'
    },
    
    startSlider: {
        position: 'absolute',
        width: '100%',
        left: 0,
        transform: [{ rotateY:'180deg' }]
    },
    
    endSlider: {
        // position: 'absolute',
        // width: '100%',
        // right: 0
    },


// Tablas 

 
    columHead: {
        backgroundColor: '#04A7C7',
        padding: 10,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderLeftColor:'grey',
        borderWidth:1,
         
    },


    columBody: {
        backgroundColor: '#FFF',
        padding: 5,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderLeftColor:'grey',
        borderWidth:1,
    },
         
   
    tabla: {
        flex: 1,
        flexDirection: 'row',
        padding: 3,
        backgroundColor: '#fff'
    },

    tamanoBoton:{

        width: 250
    },
    

 
});
