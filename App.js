import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Navegador from './Controllers/Navegador';
 


export default class App extends Component {
  constructor(props){
  super(props);
  this.state = {
  timeoutCheck: false
  };
}



componentDidMount() {
  this.timeoutCheck = setTimeout(() => {
   this.setTimePassed();
   }, 1000);
}

setTimePassed() {
   this.setState({timeoutCheck: true});
}


render() 

    {

    if (!this.state.timeoutCheck)

        {
            return (

              <View style={styles.container} >

                  <ActivityIndicator size="large" color="#0000ff" />

              </View>

              );
        }
 
        else 
        {  
          return (  
                   <Navegador/>
            );
        }

    }
}

   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
