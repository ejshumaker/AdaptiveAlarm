/**
  * Test screen to fire off background task
  * @ejshumaker 03-24-2019
*/

import React, { Component } from 'react';
import {
  View,
  Text,
  AppState,
  AsyncStorage,
} from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { TaskManager, BackgroundFetch, Location } from 'expo';
import { GlobalStyles, Colors } from '../constants';
import Buttons from '../components/Buttons';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// eslint-disable-next-line
export default class BackgroundTaskScreen extends Component {
  state = {
    status: null,
    isRegistered: false,
  };

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  didFocus = () => {
    this.checkStatusAsync();
  };

  handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      this.checkStatusAsync();
    }
  };

  toggle = async () => {
    await BackgroundFetch.setMinimumIntervalAsync(10);
    console.log('setMinimumIntervalAsync');
    if (this.state.isRegistered) {
      await BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
    } else {
      await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK);
    }
    this.setState({ isRegistered: !this.state.isRegistered });
  };

  async checkStatusAsync() {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    console.log('status: ', BackgroundFetch.Status[status]);
    console.log('isRegistered: ', isRegistered);
    this.setState({ status, isRegistered });
  }

  render() {
    return (
      <View style={GlobalStyles.centerChildrenXY}>
        <NavigationEvents onDidFocus={this.didFocus} />
        <View style={GlobalStyles.container}>
          <Text style={{ color: Colors.primary }}>
            Background fetch status:{' '}
            <Text style={{ color: 'red' }}>
              {this.state.status ? BackgroundFetch.Status[this.state.status] : null}
            </Text>
          </Text>
        </View>
        <Buttons
          title={
            this.state.isRegistered
              ? 'Unregister BackgroundFetch task'
              : 'Register BackgroundFetch task'
          }
          backgroundColor={Colors.darkGray}
          textColor={Colors.primary}
          onPress={this.toggle}
        />
      </View>
    );
  }
}

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  console.log('in BACKGROUND_FETCH_TASK');
  return BackgroundFetch.Result.NewData;
});
