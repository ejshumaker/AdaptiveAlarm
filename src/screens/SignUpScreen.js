import React from 'react';
import {
  TextInput, Button, View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userCreateAccount } from '../store/actions/userActions';
import { Colors, GlobalStyles } from '../constants';

class SignUpScreen extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { createAccount } = this.props;
    return (
      <View style={GlobalStyles.container}>
        <TextInput
          onChangeText={value => this.onChangeText('firstName', value)}
          style={GlobalStyles.input}
          placeholder="First Name"
        />
        <TextInput
          onChangeText={value => this.onChangeText('lastName', value)}
          style={GlobalStyles.input}
          placeholder="Last Name"
        />
        <TextInput
          onChangeText={value => this.onChangeText('userName', value)}
          style={GlobalStyles.input}
          placeholder="Username"
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={GlobalStyles.input}
          secureTextEntry
          placeholder="Password"
        />
        <TextInput
          onChangeText={value => this.onChangeText('email', value)}
          style={GlobalStyles.input}
          placeholder="Email"
        />
        <Button
          title="Sign Up"
          color={Colors.white}
          onPress={() => {
            const {
              firstName,
              lastName,
              email,
              userName,
              password,
            } = this.state;
            createAccount({
              firstName,
              lastName,
              email,
              userName,
              password,
            });
          }}
        />
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux state
  // errorMessage: PropTypes.string,
  // Redux dispatch
  createAccount: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
});

const mapDispatchToProps = dispatch => ({
  createAccount: (credentials) => { dispatch(userCreateAccount(credentials)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
