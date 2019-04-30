import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, TouchableOpacity, Vibration,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Audio } from 'expo';

import sounds from '../assets/sounds';
import { GlobalStyles, Colors } from '../constants';

import { Buttons, StatusBarBackground } from '../components';
import { CloseIcon } from '../icons/close';

import store from '../store';
import { alarmCalculateTime } from '../store/actions/alarmActions';

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
    const { alarm } = this.props;
    let { soundIndex } = alarm;
    soundIndex = soundIndex || 1; // default on undefined
    try {
      if (this.sound == null) this.sound = new Audio.Sound();

      if (load === true) {
        await this.sound.loadAsync(sounds[soundIndex - 1].audio);
        this.setState({ load: false });
      }
      this.playSound();
    } catch (error) {
      console.log(error);
    }
  }

  playSound = async () => {
    const PATTERN = [10, 2000, 1000, 1000];
    if (this.sound != null) {
      Vibration.vibrate(PATTERN, true);
      await this.sound.setIsLoopingAsync(true);
      await this.sound.playAsync();
    }
  }

  // check if it's been loaded
  stopSound = async (navigate) => {
    const { load } = this.state;
    if (!load) {
      Vibration.cancel();
      await this.sound.stopAsync();
      store.dispatch(alarmCalculateTime());
      navigate('Main');
    }
  }

  menu() {
    const {
      navigation,
    } = this.props;
    const { navigate } = navigation;
    return (
      <View style={[GlobalStyles.menu]}>
        <TouchableOpacity
          onPress={() => { this.stopSound(navigate); }}
        >
          <CloseIcon />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { time } = this.state;
    const { navigation } = this.props;
    const { navigate } = navigation;
    return (
      <View>
        <StatusBarBackground />
        {this.menu()}
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

AlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  alarm: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
  alarm: state.alarm,
});

AlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};

export { AlarmScreen };
export default connect(mapStateToProps)(AlarmScreen);
