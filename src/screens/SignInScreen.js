import React from "react";
import {
  TextInput,
  Text,
  View,
  ActivityIndicator,
  StatusBar
} from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { userSignIn } from "../store/actions/userActions";
import { Colors, GlobalStyles } from "../constants";
import Buttons from "../components/Buttons";
import { EmailIcon } from "../icons/email";
import { KeyIcon } from "../icons/key";

class SignInScreen extends React.Component {
  state = {
    email: "",
    password: ""
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
    const { signIn, navigation, errorMessage } = this.props;
    const { email, password } = this.state;
    return (
      <View style={[GlobalStyles.container, { justifyContent: 'center', padding: 48 }]}>
        <StatusBar barStyle="light-content" />
        <Text
          style={[
            GlobalStyles.h2,
            { textAlign: "left", color: Colors.primary }
          ]}
        >
          SIGN IN:
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
            borderRadius: 8
          }}
        >
          <KeyIcon style={{ marginLeft: 13, marginTop: 7 }} />
          <TextInput
            onChangeText={value => this.onChangeText("password", value)}
            style={GlobalStyles.destinationInput}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor={Colors.gray}
          />
        </View>
        <View style={{ marginTop: 60, alignItems: "center" }}>
          <Buttons
            title="Sign In"
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={() => {
              signIn({
                email,
                password
              });
            }}
          />
          <Buttons
            title="Sign Up"
            backgroundColor={Colors.darkGray}
            textColor={Colors.white}
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          />
        </View>
      </View>
    );
  }
}

SignInScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  // Redux state
  errorMessage: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  // Redux dispatch
  signIn: PropTypes.func.isRequired
};

SignInScreen.defaultProps = {
  errorMessage: ""
};

const mapStateToProps = state => ({
  errorMessage: state.user.errorMessage,
  loading: state.user.loading
});

const mapDispatchToProps = dispatch => ({
  signIn: credentials => {
    dispatch(userSignIn(credentials));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
