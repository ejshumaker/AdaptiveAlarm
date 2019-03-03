import { createStackNavigator, createAppContainer } from 'react-navigation';

import { Colors } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import StyleDemoScreen from '../screens/StyleDemoScreen';

/**
 * The app navigator is where all routes are configured
 * The 'key' in the stack navigator will be the route name
 * There are more options you can customize such as title, and header
 * @eschirtz 03-01-19
 */
const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Adaptive Alarm',
        header: null,
      }),
    },
    StyleDemo: {
      screen: StyleDemoScreen,
      // You can override the "header" prop and pass a custom header component
      navigationOptions: () => ({
        title: 'Styles',
        headerStyle: {
          backgroundColor: Colors.darkGray,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '100',
        },
      }),
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',
    cardStyle: { backgroundColor: Colors.background },
  },
);

export default createAppContainer(AppNavigator);
