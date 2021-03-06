import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TouchableOpacity, StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import { GlobalStyles, Colors } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

class DayPicker extends PureComponent {
  // possibly create getters to return the state of each day button using refs
  constructor() {
    super();
    this.state = {
      sButton: false,
      mButton: false,
      tButton: false,
      wButton: false,
      thButton: false,
      fButton: false,
      saButton: false,
    };
    this.updateOnPress = this.updateOnPress.bind(this);
  }

  componentWillMount() {
    let { days } = this.props;
    days = days || {};

    this.setState({
      sButton: days.sun,
      mButton: days.mon,
      tButton: days.tue,
      wButton: days.wed,
      thButton: days.thu,
      fButton: days.fri,
      saButton: days.sat,
    });
  }

  updateOnPress(type) {
    const { onChangeDay } = this.props;
    const {
      sButton,
      mButton,
      tButton,
      wButton,
      thButton,
      fButton,
      saButton,
    } = this.state;
    // temporarily store, so can use callback of setState
    let mon = mButton;
    let tue = tButton;
    let wed = wButton;
    let thu = thButton;
    let fri = fButton;
    let sat = saButton;
    let sun = sButton;
    switch (type) {
      case 'S':
        sun = !sButton;
        break;
      case 'M':
        mon = !mButton;
        break;
      case 'T':
        tue = !tButton;
        break;
      case 'W':
        wed = !wButton;
        break;
      case 'Th':
        thu = !thButton;
        break;
      case 'F':
        fri = !fButton;
        break;
      case 'Sa':
        sat = !saButton;
        break;
      default:
    }
    this.setState({
      mButton: mon,
      tButton: tue,
      wButton: wed,
      thButton: thu,
      fButton: fri,
      saButton: sat,
      sButton: sun,
    }, () => {
      onChangeDay({
        mon, tue, wed, thu, fri, sat, sun,
      });
    });
  }

  render() {
    const {
      sButton,
      mButton,
      tButton,
      wButton,
      thButton,
      fButton,
      saButton,
    } = this.state;
    return (
      <View style={[styles.container, {
        height: 60, alignItems: 'center', justifyContent: 'space-around', marginVertical: 8,
      }]}
      >
        <TouchableOpacity onPress={() => this.updateOnPress('S')}>
          <Circle
            style={{
              backgroundColor:
                sButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    sButton ? Colors.black : Colors.white,
                },
              ]}
            >
              S
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('M')}>
          <Circle
            style={{
              backgroundColor:
                mButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    mButton ? Colors.black : Colors.white,
                },
              ]}
            >
              M
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('T')}>
          <Circle
            style={{
              backgroundColor:
                tButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    tButton ? Colors.black : Colors.white,
                },
              ]}
            >
              T
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('W')}>
          <Circle
            style={{
              backgroundColor:
                wButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    wButton ? Colors.black : Colors.white,
                },
              ]}
            >
              W
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('Th')}>
          <Circle
            style={{
              backgroundColor:
                thButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    thButton ? Colors.black : Colors.white,
                },
              ]}
            >
              Th
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('F')}>
          <Circle
            style={{
              backgroundColor:
                fButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    fButton ? Colors.black : Colors.white,
                },
              ]}
            >
              F
            </Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('Sa')}>
          <Circle
            style={{
              backgroundColor:
                saButton ? Colors.primary : Colors.darkGray,
            }}
          >
            <Text
              style={[
                GlobalStyles.h5,
                {
                  color:
                    saButton ? Colors.black : Colors.white,
                },
              ]}
            >
              Sa
            </Text>
          </Circle>
        </TouchableOpacity>
      </View>
    );
  }
}

DayPicker.propTypes = {
  onChangeDay: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  days: PropTypes.object.isRequired,
};

const Circle = styled.View`
  width: 35px;
  height: 40px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin: 4px;
`;


export default DayPicker;
