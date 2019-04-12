import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Audio } from 'expo';
// import { alarmOff } from '../store/actions/alarmActions';

import { GlobalStyles, Colors } from '../constants';

import { Buttons } from '../components';
import { RightIcon } from '../icons/right';

const beepAlarm = require('../constants/alarm.mp3');

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
    const { navigation } = this.props;
    const { addListener } = navigation;
    // const self = this;

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
    const { load } = this.state;
    try {
      if (this.sound == null) this.sound = new Audio.Sound();

      if (load === true) {
        await this.sound.loadAsync(beepAlarm);
        this.setState({ load: false });
      }
      this.playSound();
    } catch (error) {
      console.log(error);
    }
  }

  playSound = async () => {
    if (this.sound != null) {
      await this.sound.setIsLoopingAsync(true);
      await this.sound.playAsync();
    }
  }

  // check if it's been loaded
  stopSound = async (navigate) => {
    const { load } = this.state;
    if (!load) {
      await this.sound.stopAsync();
      navigate('Main');
    }
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
          <Buttons
            title="STOP"
            backgroundColor={Colors.darkGray}
            textColor={Colors.white}
            onPress={() => this.stopSound(navigate)}
          />
        </View>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  turnAlarmOff: (navigate) => {
    dispatch(alarmOff(navigate('Main')));
  },
});

AlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export { AlarmScreen };
export default connect(null, mapDispatchToProps)(AlarmScreen);
