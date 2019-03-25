import React from 'react';
import {
  TextInput, Button, Text, View, ActivityIndicator,
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

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    } return null;
  }

  render() {
    const { signIn, navigation, errorMessage } = this.props;
    const { email, password } = this.state;
    return (
      <View style={[GlobalStyles.container, { padding: 48 }]}>
        <Text style={GlobalStyles.pageTitle}>Sign In</Text>
        { this.loader() }
        <Text style={[GlobalStyles.paragraph, { color: Colors.error, marginBottom: 50 }]}>
          {errorMessage}
        </Text>
        <TextInput
          onChangeText={value => this.onChangeText('email', value)}
          style={GlobalStyles.input}
          placeholder="Email"
          placeholderTextColor={Colors.darkGray}
        />
        <TextInput
          onChangeText={value => this.onChangeText('password', value)}
          style={GlobalStyles.input}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor={Colors.darkGray}
        />
        <Button
          title="Sign In"
          color={Colors.primary}
          onPress={() => {
            signIn({
              email,
              password,
            });
          }}
        />
        <Button
          title="Sign Up"
          color={Colors.primary}
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
  loading: PropTypes.bool.isRequired,
  // Redux dispatch
  signIn: PropTypes.func.isRequired,
};

SignInScreen.defaultProps = {
  errorMessage: '',
};

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
  loading: state.user.loading,
});

const mapDispatchToProps = dispatch => ({
  signIn: (credentials) => { dispatch(userSignIn(credentials)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
