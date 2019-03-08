import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator } from 'react-navigation';

import { Colors } from '../constants';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';


export default createSwitchNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      // You can override the "header" prop and pass a custom header component
      navigationOptions: () => ({
        title: 'Sign In',
        headerStyle: {
          backgroundColor: Colors.darkGray,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '100',
        },
      }),
    },
    SignUp: {
      screen: SignUpScreen,
      // You can override the "header" prop and pass a custom header component
      navigationOptions: () => ({
        title: 'Sign Up',
        headerStyle: {
          backgroundColor: Colors.darkGray,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '100',
        },
      }),
    }
  },
  {
    initialRouteName: 'SignIn',
    headerMode: 'screen',
    cardStyle: {
      backgroundColor: Colors.background
    },
  });
