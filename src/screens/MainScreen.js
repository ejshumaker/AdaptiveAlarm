import React, { Component } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import PropTypes from 'prop-types';
import AnalogClock from '../components/AnalogClock';
import Buttons from '../components/Buttons';

import { GlobalStyles, Colors } from '../constants';

import { AddIcon } from '../icons/add';
import { UserIcon } from '../icons/user';
import { MenuIcon } from '../icons/menu';

class MainScreen extends Component {
  constructor() {
    super();
    this.state = {
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    };
    this.hasAlarmView = this.hasAlarmView.bind(this);
  }

  componentDidMount() {
    this.setState({
      predictedTimeHour: moment().format('hh'),
      predictedTimeMin: moment().format('mm'),
      predictedTimeMeridiem: moment().format('a'),
    });
  }

  hasAlarmView() {
    const { predictedTimeHour, predictedTimeMin, predictedTimeMeridiem } = this.state;
    return (
      <View>
        <Text style={
          [GlobalStyles.h2, { color: Colors.primary, marginTop: 28 }]
        }
        >
          {'PREDICTED:'}
        </Text>
        <View style={{ alignItems: 'center' }}>
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
        </View>
      </View>
    );
  }

  hasNoAlarmView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <Text style={
          [GlobalStyles.h1, GlobalStyles.margin, { color: Colors.primary, fontSize: 30 }]
        }
        >
          { 'No Alarm Found!' }
        </Text>
      </View>
    );
  }

  clockView() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <AnalogClock
          minuteHandLength={110}
          minuteHandColor={Colors.white}
          minuteHandWidth={2}
          minuteHandCurved={false}
          hourHandColor={Colors.primary}
          hourHandCurved={false}
          hourHandWidth={4}
          // clockBorderColor={Colors.white}
          // clockCentreColor={Colors.white}
        />
        <View style={{ height: 32, width: 8 }} />
      </View>
    );
  }

  hasAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <Buttons
          title="Delete Alarm"
          backgroundColor={Colors.primary}
          textColor={Colors.black}
          onPress={() => null}
        />
        <Buttons
          title="Create Alarm"
          backgroundColor={Colors.darkGray}
          textColor={Colors.white}
          onPress={() => null}
        />
      </View>
    );
  }

  hasNoAlarmButtons() {
    // eslint-disable-next-line no-unused-vars
    const self = this;
    return (
      <View>
        <Buttons
          title="Create Alarm"
          color={Colors.darkGray}
          onPress={() => null}
        />
      </View>
    );
  }

  menu() {
    const { navigation } = this.props;
    return (
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
        <UserIcon
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
    );
  }

  render() {
    if (true) {
      return (
        <View>
          {this.menu()}
          <View style={{ alignItems: 'center', width: '100%' }}>
            { this.hasAlarmView() }
            { this.clockView() }
            { this.hasAlarmButtons() }
          </View>
        </View>
      );
    }
    return (
      <View>
        {this.menu()}
        <View style={{ alignItems: 'center', width: '100%' }}>
          { this.hasNoAlarmView() }
          { this.clockView() }
          { this.hasNoAlarmButtons() }
        </View>
      </View>
    );
  }
}

export default MainScreen;
