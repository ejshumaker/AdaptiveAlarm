import React from 'react';
import {
  TextInput, Button, View, ActivityIndicator, Text,
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

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    } return null;
  }

  render() {
    const { createAccount, navigation, errorMessage } = this.props;
    return (
      <View style={[GlobalStyles.container, { padding: 48 }]}>
        <Text style={GlobalStyles.pageTitle}>Sign Up</Text>
        { this.loader() }
        <Text style={[GlobalStyles.paragraph, { color: Colors.error, marginBottom: 8 }]}>
          {errorMessage}
        </Text>
        <TextInput
          onChangeText={value => this.onChangeText('firstName', value)}
          style={GlobalStyles.input}
          placeholder="First Name"
          placeholderTextColor={Colors.darkGray}
        />
        <TextInput
          onChangeText={value => this.onChangeText('lastName', value)}
          style={GlobalStyles.input}
          placeholder="Last Name"
          placeholderTextColor={Colors.darkGray}
        />
        <TextInput
          onChangeText={value => this.onChangeText('userName', value)}
          style={GlobalStyles.input}
          placeholder="Username"
          placeholderTextColor={Colors.darkGray}
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={GlobalStyles.input}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={Colors.darkGray}
        />
        <TextInput
          onChangeText={value => this.onChangeText('email', value)}
          style={GlobalStyles.input}
          placeholder="Email"
          placeholderTextColor={Colors.darkGray}
        />
        <Button
          title="Sign Up"
          color={Colors.primary}
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
        <Button
          title="Sign In"
          color={Colors.primary}
          onPress={() => {
            navigation.navigate('SignIn');
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
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  // Redux dispatch
  createAccount: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
  loading: state.user.loading,
});

SignUpScreen.defaultProps = {
  errorMessage: '',
};

const mapDispatchToProps = dispatch => ({
  createAccount: (credentials) => { dispatch(userCreateAccount(credentials)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
