import React, { Component } from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
import { Colors, GlobalStyles } from '../constants';


export default class SignUp extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    confirmationCode: ''
  }
  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  signUp() {
    this._printlog("SIGN UP BUTTON PRESSED", ":)");
    // FIREBASE PLUGIN FOR signUp
    /*
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        email: this.state.email,
      // first_name: this.state.first_name,
      // last_name: this.state.last_name
      },
      response: {
        userConfirmed: true
      },
    })
      .then((event, context, callback) => {
        console.log('---------------------------------');
        alert('Successful Sign Up!');
        console.log('successful sign up!');
        // console.log(JSON.stringify(event.username));
        console.log('---------------------------------');
        this.props.navigation.navigate('SignIn');
      })
      .catch(err => {
        console.log('error signing up!: ', err);
        alert('Something went wrong with signing you up. Check your information and try again!');
      });
      */

  }
  render() {
    return (
      <View style={GlobalStyles.container}>
      <TextInput
      onChangeText={value => this.onChangeText('first_name', value)}
      style={GlobalStyles.input}
      placeholder='First Name'
      />
    <TextInput
      onChangeText={value => this.onChangeText('last_name', value)}
      style={GlobalStyles.input}
      placeholder='Last Name'
      />
        <TextInput
      onChangeText={value => this.onChangeText('username', value)}
      style={GlobalStyles.input}
      placeholder='Username'
      />
        <TextInput
      onChangeText={value => this.onChangeText('password', value)}
      style={GlobalStyles.input}
      secureTextEntry={true}
      placeholder='Password'
      />
        <TextInput
      onChangeText={value => this.onChangeText('email', value)}
      style={GlobalStyles.input}
      placeholder='Email'
      />
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
