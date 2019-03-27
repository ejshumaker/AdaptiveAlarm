import { createStackNavigator } from 'react-navigation';

import { Colors } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import StyleDemoScreen from '../screens/StyleDemoScreen';
import AlarmScreen from '../screens/AlarmScreen';
import DayPickerTestScreen from '../screens/DayPickerTestScreen';

export default createStackNavigator(
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
    Alarm: {
      screen: AlarmScreen,
      navigationOptions: () => ({
        title: 'Alarm',
        header: null,
      }),
    },
    DayPickerTest: {
      screen: DayPickerTestScreen,
      navigationOptions: () => ({
        title: 'DayPickerTest',
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
    cardStyle: {
      backgroundColor: Colors.background,
    },
  },

);
