import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { FontAwesome } from '@expo/vector-icons';
import { Tooltip, Button,  Input, PricingCard } from 'react-native-elements';
import styles from '../../styles/styles.js'; 
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
export default class PaymentFormView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }

  render() {
    const { onSubmit, submitted, error } = this.props;

    return (
      <View>
        <View>

        
      <Text style={styles.title3}>Update your payment method</Text>
 


          <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            title='Continue '
            disabled={!this.state.cardData.valid || submitted}
            onPress={() => onSubmit(this.state.cardData)}
          />
          {/* Show errors */}
          {error && (
            <View style={styles.alertWrapper}>
              <View style={styles.alertIconWrapper}>
                <FontAwesome name="exclamation-circle" size={20} style={{ color: '#c22' }} />
              </View>
              <View style={styles.alertTextWrapper}>
                <Text style={styles.alertText}>{error}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}

