import { createStackNavigator } from 'react-navigation';

import { Colors } from '../constants';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';


export default createStackNavigator(
  {
    AuthLoading: {
      screen: AuthLoadingScreen,
      navigationOptions: () => ({
        title: 'AuthLoading',
        header: null,
      }),
    },

  },
  // Options
  {
    initialRouteName: 'AuthLoading',
    cardStyle: {
      backgroundColor: Colors.background,
    },
  },
);
