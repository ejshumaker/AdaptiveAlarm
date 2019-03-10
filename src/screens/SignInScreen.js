import React from 'react';
import {
  TextInput, Button, Text, View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { userSignIn } from '../store/actions/userActions';
import { Colors, GlobalStyles } from '../constants';


class SignInScreen extends React.Component {
  state = {
    email: '',
    password: '',
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }


  render() {
    const { signIn, navigation, errorMessage } = this.props;
    const { email, password } = this.state;
    return (
      <View style={[GlobalStyles.container, { padding: 48 }]}>
        <Text style={GlobalStyles.h2}>Sign In</Text>
        <Text style={[GlobalStyles.paragraph, { color: Colors.error, marginBottom: 8 }]}>
          {errorMessage}
        </Text>
        <TextInput
          onChangeText={value => this.onChangeText('email', value)}
          style={GlobalStyles.input}
          placeholder="email"
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={GlobalStyles.input}
          secureTextEntry
          placeholder="password"
        />
        <Button
          title="Sign In"
          color={Colors.darkGray}
          onPress={() => {
            signIn({
              email,
              password,
            });
          }}
        />
        <Button
          title="Sign Up"
          color={Colors.darkGray}
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        />
      </View>
    );
  }
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  // Redux state
  errorMessage: PropTypes.string,
  // Redux dispatch
  signIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
});


const mapDispatchToProps = dispatch => ({
  signIn: (credentials) => { dispatch(userSignIn(credentials)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
