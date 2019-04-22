import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View, Text, TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import store from '../store';
import { alarmCalculateTime } from '../store/actions/alarmActions';

import { GlobalStyles, Colors } from '../constants';
import { Buttons, StatusBarBackground } from '../components';
import { CloseIcon } from '../icons/close';

import Alarm from '../custom_modules/Alarm';

class AlarmScreen extends Component {
  constructor() {
    super();
    this.state = {
      time: moment().format('LT'),
    };
  }

  componentDidMount() {
    this.setState({
      time: moment().format('LT'),
    });
  }

  stopSound = (navigate) => {
    Alarm.stopAlarm();
    navigate('Main');
    console.log('should have navigated');
    store.dispatch(alarmCalculateTime());
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
