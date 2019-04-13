import { createStackNavigator } from 'react-navigation';

import { Colors } from '../constants';
import SignUpScreen from '../screens/SignUpScreen';
import SignInScreen from '../screens/SignInScreen';


export default createStackNavigator(
  {
    SignIn: {
      screen: SignInScreen,
      navigationOptions: () => ({
        title: 'Sign In',
        header: null,
      }),
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: () => ({
        title: 'Sign Up',
        header: null,
      }),
    },
  },
  // Options
  {
    initialRouteName: 'SignIn',
    cardStyle: {
      backgroundColor: Colors.background,
    },
  },
);
