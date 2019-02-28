import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import SetupScreen from '../screens/SetupScreen';

// TODO: Not currently active or working
export default createStackNavigator(
  {
    Home: { screen: HomeScreen },
    Setup: { screen: SetupScreen },
  },
  {
    initialRouteName: 'Home',
  },
);
