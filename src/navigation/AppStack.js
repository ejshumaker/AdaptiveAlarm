import { createStackNavigator } from 'react-navigation';

import { Colors } from '../constants';
import HomeScreen from '../screens/HomeScreen';
import StyleDemoScreen from '../screens/StyleDemoScreen';

import AlarmScreen from '../screens/AlarmScreen';
import CreateAlarmScreen from '../screens/CreateAlarmScreen';
import MainScreen from '../screens/MainScreen';
import DayPickerTestScreen from '../screens/DayPickerTestScreen';
import AutocompleteScreen from '../screens/AutocompleteScreen';
import AccountScreen from '../screens/AccountScreen';
import AlarmListScreen from '../screens/AlarmListScreen';
import CalendarScreen from '../screens/CalendarScreen';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Adaptive Alarm',
        header: null,
      }),
    },
    CreateAlarm: {
      screen: CreateAlarmScreen,
      navigationOptions: () => ({
        title: 'Create Alarm',
        header: null,
      }),
    },
    AlarmList: {
      screen: AlarmListScreen,
      navigationOptions: () => ({
        title: 'Alarm List',
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
    Main: {
      screen: MainScreen,
      navigationOptions: () => ({
        title: 'Main',
        header: null,
      }),
    },
    DayPicker: {
      screen: DayPickerTestScreen,
      navigationOptions: () => ({
        title: 'DayPicker',
        header: null,
      }),
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: () => ({
        title: 'Account',
        header: null,
      }),
    },
    AutoComplete: {
      screen: AutocompleteScreen,
      navigationOptions: () => ({
        title: 'Autocomplete',
        headerStyle: {
          backgroundColor: Colors.darkGray,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '100',
        },
      }),
    },
    Calendar: {
      screen: CalendarScreen,
      navigationOptions: () => ({
        title: 'Calendar',
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
    initialRouteName: 'Main',
    cardStyle: {
      backgroundColor: Colors.background,
    },
  },
);
