 
import React, { Component } from 'react';
import { View, TouchableHighlight, Linking, ScrollView, Text, StyleSheet,   TextInput, AsyncStorage , ImageBackground , Image  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon, Container, Content, Header, Left, Body, Right, List, ListItem } from 'native-base'
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
//import { ObtenerData } from '../helpers/ObtenerData';
import styles from '../styles/styles.js'; 
import Stripe from 'react-native-stripe-api';
import AddSubscriptionView from './components/AddSubscriptionView';
import * as Localization from 'expo-localization';


 


const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_4UvbeQt1m6CvObv6L2wZXC4O00RJXKfLX6';

 
 
const client = new Stripe(STRIPE_PUBLISHABLE_KEY);


 

const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };

  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      // Use the correct MIME type for your server
      Accept: 'application/json',
      // Use the correct Content Type to send data in request body
      'Content-Type': 'application/x-www-form-urlencoded',
      // Use the Stripe publishable key as Bearer
      Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    // Use a proper HTTP method
    method: 'post',
    // Format the credit card data to a string of key-value pairs
    // divided by &
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

 



 

const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};




 





/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
export default class AddSubscription extends React.Component {


  

        constructor(props) {
          super(props);
          this.state = {
            submitted: false,
            error: null,
            Id_Global: this.props.navigation.state.params.Id_Global,
            paquete_titulo: this.props.navigation.state.params.paquete_titulo,
            paquete_precio: this.props.navigation.state.params.paquete_precio,
            paquete_id: this.props.navigation.state.params.paquete_id,
            total_vehiculos: this.props.navigation.state.params.total_vehiculos,


            

            useLiteCreditCardInput: false,
            cardData:false,

            numeroTarjeta:false,
            cvc:false,
            nombre:false,
            zip:false,
            fechaMes:false,
            fechaAnio:false,


          }
        }

         





enviarToken = (token) => {
 
       fetch('https://clicwash.com/php/App/subir_metodo_pago.php', {
       method: 'POST',
       header: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },

      body: JSON.stringify({
            token: token,
            Id_Global:this.state.Id_Global
          })

      })

      .then((response) => response.json())
      .then((respuesta) => {
               // alert(respuesta);

                this.props.navigation.navigate('Reserva_2',{total_vehiculos:this.state.total_vehiculos, paquete_titulo:this.state.paquete_titulo, paquete_precio:this.state.paquete_precio, paquete_id:this.state.paquete_id, Id_Global:this.state.Id_Global })

               
                           

      })
           
      .catch((error) => {
                alert('Try Again Later');
      });

}











        // Handles submitting the payment request
        onSubmit = async (creditCardInput) => {

          // Disable the Submit button after the request is sent
          this.setState({ submitted: true });
          let creditCardToken;

          try {
            // Create a credit card token

                creditCardToken = await getCreditCardToken(creditCardInput);
                
                if (creditCardToken.error) {
                  // Reset the state if Stripe responds with an error
                  // Set submitted to false to let the user subscribe again
                  this.setState({ submitted: false, error: STRIPE_ERROR });
                  return;
                }
              } catch (e) {
                // Reset the state if the request was sent with an error
                // Set submitted to false to let the user subscribe again
                this.setState({ submitted: false, error: STRIPE_ERROR });
                return;
          }


       


          



         
          // Send a request to your server with the received credit card token
          const { error } = await subscribeUser(creditCardToken);
          // Handle any errors from your server
          if (error) {
            this.setState({ submitted: false, error: SERVER_ERROR });
          } else {
            this.setState({ submitted: false, error: null });
             
            this.enviarToken(JSON.stringify(creditCardToken.id));
          }
};





  render() {

    const transl = require('../Controllers/traductor.json');
      const lang = Localization.locale;
      // {transl[lang]['inicio_b1']}
    const { submitted, error } = this.state;
    return (

         
       
        <AddSubscriptionView style={styles.bloqueContenido}
          error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
        />

       
       
    );
  }
}

 
