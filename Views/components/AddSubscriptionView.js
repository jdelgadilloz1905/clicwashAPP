import React from 'react';
import { StyleSheet, Text, View, ScrollView , ImageBackground} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import PaymentFormView from './PaymentFormView';
 
/**
 * The class renders a view with PaymentFormView
 */
export default class AddSubscriptionView extends React.Component {
  render() {
    return (
      <ImageBackground source={{uri: 'https://clicwash.com/img/fondo_perfil_app.jpg'}} style={styles.container}>

       

      <View style={styles.container}>
        <ScrollView style={styles.container} ref={ref => (this.scrollViewRef = ref)}>
           
          <View style={styles.cardFormWrapper}>
            <PaymentFormView {...this.props}/>
          </View>
        </ScrollView>
        {/* Scrolls to the payment form */}
        <KeyboardSpacer
          onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
        />
      </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center'
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});