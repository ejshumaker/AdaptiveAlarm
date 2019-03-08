import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Colors, GlobalStyles } from '../constants';
// IMPORT FIREBASE SHIT

export default class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    user: {}
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signIn() {
    console.log("SIGN IN BUTTON");
    const {username, password} = this.state
    this.props.navigation.navigate('Home');
  // REPLACE WITH FIREBASE VERSION !!!
  /* Auth.signIn(username, password)
    .then(user => {
      this.setState({
        user
      })
      this._printlog('SIGN IN SUCCESSFUL', '     0_0     ');
      this.props.navigation.navigate('Main');
    })
    .catch(err => this._printlog('SIGN IN ERROR', err));
    */
  }

  signUp() {
    console.log("SIGN UP BUTTON")
    this.props.navigation.navigate('SignUp');
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <TextInput
      onChangeText={value => this.onChangeText('username', value)}
      style={GlobalStyles.input}
      placeholder='username'
      />
        <TextInput
      onChangeText={value => this.onChangeText('password', value)}
      style={GlobalStyles.input}
      secureTextEntry={true}
      placeholder='password'
      />
        <Button title="Sign In"
      color={Colors.white}
      onPress={this.signIn.bind(this)} />
        <Button title="Sign Up"
      color={Colors.white}
      onPress={this.signUp.bind(this)} />
      </View>
      );
  }


  _printlog(headerInput, object) {
    console.log('------------------------------------');
    console.log(headerInput);
    console.log('------------------------------------');
    console.log(object);
    console.log('------------------------------------');
    console.log('\n\n')
  }
}
