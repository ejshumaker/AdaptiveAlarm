import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import { alarmOff } from '../store/actions/alarmActions';

import { GlobalStyles, Colors } from '../constants';

import { RightIcon } from '../icons/right';

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

  render() {
    const { time } = this.state;
    const { navigation, turnAlarmOff } = this.props;
    const { navigate } = navigation;
    return (
      <View style={{ marginTop: 75 }}>
        <View style={{ alignItems: 'flex-end', marginRight: 28 }}>
          <RightIcon onPress={() => {
            navigation.navigate("Main");
          }} />
        </View>
        <View style={{ alignItems: 'center', marginTop: 200 }}>
          <Text style={[GlobalStyles.h1, GlobalStyles.margin, { color: Colors.primary }]}>
            {time}
          </Text>
          <View style={{ height: 8, width: 8 }} />
          <Button
            title="Turn Off Alarm"
            color={Colors.darkGray}
            onPress={() => turnAlarmOff(navigate)}
          />
        </View>
      </View >
    );
  }
}

const mapDispatchToProps = dispatch => ({
  turnAlarmOff: (navigate) => { dispatch(alarmOff(navigate('Home'))); },
});

AlarmScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  turnAlarmOff: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(AlarmScreen);
