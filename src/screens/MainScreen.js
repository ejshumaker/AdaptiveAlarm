import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import AnalogClock from '../components/AnalogClock';
import Buttons from '../components/Buttons';

import { GlobalStyles, Colors } from '../constants';

import { AddIcon } from '../icons/add';
import { PersonIcon } from '../icons/person';
import { MenuIcon } from '../icons/menu';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    };
  }

  componentDidMount() {
    this.setState({
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    });
  }

  render() {
    const { navigation } = this.props;
    const {
      predictedTimeHour,
      predictedTimeMin,
      predictedTimeMeridiem,
    } = this.state;
    return (
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 75,
          paddingHorizontal: 28,
        }}
        >
          <MenuIcon
            style={{}}
            onPress={() => {
              navigation.navigate('Alarm');
            }}
          />
          <PersonIcon
            style={{ }}
            onPress={() => {
              navigation.navigate('Account');
            }}
          />
          <AddIcon
            style={{ }}
            onPress={() => {
              navigation.navigate('CreateAlarm');
            }}
          />

        </View>

        <Text
          style={[
            GlobalStyles.h1,
            GlobalStyles.margin,
            {
              color: Colors.primary, fontSize: 30, marginLeft: 52, marginTop: 30,
            },
          ]}
        >
          {'PREDICTED:'}
        </Text>
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text
            style={[
              GlobalStyles.margin,
              { alignItems: 'center', color: Colors.white, fontSize: 70 },
            ]}
          >
            <Text style={[{ fontWeight: 'bold' }]}>
              {predictedTimeHour}
              {':'}
              {predictedTimeMin}
            </Text>
            <Text style={[{ fontSize: 40 }]}>
              {' '}
              {predictedTimeMeridiem.toUpperCase()}
            </Text>
          </Text>
          <AnalogClock
            minuteHandLength={105}
            minuteHandColor={Colors.white}
            minuteHandWidth={3}
            minuteHandCurved={false}
            hourHandColor={Colors.primary}
            hourHandCurved={false}
            hourHandWidth={6}
          // clockBorderColor={Colors.white}
          // clockCentreColor={Colors.white}
          />
          <View style={{ height: 50, width: 8 }} />
          <Buttons
            title="Delete Alarm"
            backgroundColor={Colors.darkGray}
            textColor={Colors.white}
            onPress={() => null}
          />
          {/* Temporary button to navigate to Home Screen, TODO: Remove */}
          <Buttons
            title="Homepage"
            backgroundColor={Colors.primary}
            textColor={Colors.black}
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
        </View>
      </View>
    );
  }
}

export default MainScreen;
