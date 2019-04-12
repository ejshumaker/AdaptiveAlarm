import React from "react";
import {
  TextInput,
  View,
  ActivityIndicator,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userCreateAccount } from "../store/actions/userActions";
import { Colors, GlobalStyles } from "../constants";
import Buttons from "../components/Buttons";
import { EmailIcon } from "../icons/email";
import { KeyIcon } from "../icons/key";
import { PersonIcon } from "../icons/person";
import { Number1Icon } from "../icons/one";
import { Number2Icon } from "../icons/two";

class SignUpScreen extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
    email: ""
  };

  onChangeText(key, value) {
    this.setState({
      [key]: value
    });
  }

  loader() {
    const { loading } = this.props;
    if (loading) {
      return <ActivityIndicator color={Colors.primary} size="large" />;
    }
    return null;
  }

  render() {
    const { createAccount, navigation, errorMessage } = this.props;
    return (
      <View style={[GlobalStyles.container, { justifyContent: 'center', padding: 48 }]}>
        <StatusBar barStyle="light-content" />
        <Text
          style={[
            GlobalStyles.h2,
            { textAlign: "left", color: Colors.primary }
          ]}
        >
          SIGN UP:
        </Text>
        {this.loader()}
        <Text
          style={[
            GlobalStyles.paragraph,
            { color: Colors.error, marginVertical: 24 }
          ]}
        >
          {errorMessage}
        </Text>
        <View
          style={{
            flexDirection: "row",

            height: 40,
            backgroundColor: Colors.darkGray,
            borderRadius: 8,
            marginBottom: 30
          }}
        >
          <EmailIcon style={{ marginLeft: 13, marginTop: 7 }} />
          <TextInput
            keyboardAppearance={'dark'}
            onChangeText={value => this.onChangeText("email", value)}
            style={GlobalStyles.destinationInput}
            placeholder="Email"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View
          style={{
            flexDirection: "row",

            height: 40,
            backgroundColor: Colors.darkGray,
            borderRadius: 8,
            marginBottom: 30
          }}
        >
          <PersonIcon style={{ marginLeft: 13, marginTop: 7 }} />
          <TextInput
            keyboardAppearance={'dark'}
            onChangeText={value => this.onChangeText("userName", value)}
            style={GlobalStyles.destinationInput}
            placeholder="Username"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View
          style={{
            flexDirection: "row",

            height: 40,
            backgroundColor: Colors.darkGray,
            borderRadius: 8,
            marginBottom: 30
          }}
        >
          <KeyIcon style={{ marginLeft: 13, marginTop: 7 }} />
          <TextInput
            keyboardAppearance={'dark'}
            onChangeText={value => this.onChangeText("password", value)}
            style={GlobalStyles.destinationInput}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View
          style={{
            flexDirection: "row",

            height: 40,
            backgroundColor: Colors.darkGray,
            borderRadius: 8,
            marginBottom: 30
          }}
        >
          <Number1Icon style={{ marginLeft: 13, marginTop: 7 }} />
          <TextInput
            keyboardAppearance={'dark'}
            onChangeText={value => this.onChangeText("firstName", value)}
            style={GlobalStyles.destinationInput}
            placeholder="First Name"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View
          style={{
            flexDirection: "row",

            height: 40,
            backgroundColor: Colors.darkGray,
            borderRadius: 8
          }}
        >
          <Number2Icon style={{ marginLeft: 13, marginTop: 7 }} />
          <TextInput
            keyboardAppearance={'dark'}
            onChangeText={value => this.onChangeText("lastName", value)}
            style={GlobalStyles.destinationInput}
            placeholder="Last Name"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View style={{ marginTop: 60, alignItems: "center" }}>
          <Buttons
            title="Sign Up"
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={() => {
              const {
                firstName,
                lastName,
                email,
                userName,
                password
              } = this.state;
              createAccount({
                firstName,
                lastName,
                email,
                userName,
                password
              });
            }}
          />
          <Buttons
            title="Sign In"
            backgroundColor={Colors.darkGray}
            textColor={Colors.white}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          />
        </View>
      </View>
    );
  }
}

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  // Redux state
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  // Redux dispatch
  createAccount: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
  loading: state.user.loading
});

SignUpScreen.defaultProps = {
  errorMessage: ""
};

const mapDispatchToProps = dispatch => ({
  createAccount: credentials => {
    dispatch(userCreateAccount(credentials));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
