import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Audio } from 'expo';
import { alarmOff } from '../store/actions/alarmActions';

import { GlobalStyles, Colors } from '../constants';

import { RightIcon } from '../icons/right';

class AlarmScreen extends Component {
  constructor() {
    super();
    this.state = {
      time: moment().format('LT'),
      load: true,
    };
  }

  componentDidMount() {
    this.setState({
      time: moment().format('LT'),
    });
    Audio.setIsEnabledAsync(true);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentLockedModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      playThroughEarpieceAndroid: false,
    });

    this.getSoundLoaded();
    const { addListener } = this.props.navigation;
    const self = this;

    this.listeners = [
      addListener('didFocus', () => {
        this.getSoundLoaded();
      }),
    ];
  }

  componentWillUnmount() {
    this.listeners.forEach(
      (sub) => { sub.remove(); },
    );
  }


  getSoundLoaded = async () => {
    try {
      if (this.sound == null) {
        this.sound = new Audio.Sound();
      }
      if (this.state.load === true) {
        await this.sound.loadAsync(require('../constants/alarm.mp3'));
        this.setState({ load: false });
      }
      this.playSound();
    } catch (error) {
      console.log(error);
    }
  }


  playSound = async () => {
    if (this.sound != null) {
      console.log(this.sound);
      await this.sound.playAsync();
    }
  }


  stopSound = async (navigate) => {
    await this.sound.stopAsync();
    navigate('Home');
  }

  render() {
    const { time } = this.state;
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View style={{ marginTop: 75 }}>
        <View style={{ alignItems: 'flex-end', marginRight: 28 }}>
          <RightIcon onPress={() => {
            navigation.navigate('Main');
          }}
          />
        </View>
        <View style={{ alignItems: 'center', marginTop: 200 }}>
          <Text style={[GlobalStyles.h1, GlobalStyles.margin, { color: Colors.primary }]}>
            {time}
          </Text>
          <View style={{ height: 8, width: 8 }} />
          <Button
            title="Turn Off Alarm"
            color={Colors.darkGray}
            onPress={() => this.stopSound(navigate)}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  turnAlarmOff: (navigate) => {
    dispatch(alarmOff(navigate('Home')));
  },
});

AlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(AlarmScreen);
