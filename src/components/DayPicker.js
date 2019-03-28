import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styled from 'styled-components';
import { Colors } from '../constants';

const Circle = styled.View`
  width: 45px;
  height: 50px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const styles = StyleSheet.create({
  text: {
    fontSize: 22,
    color: Colors.black,
  },
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
      sButton: null,
      mButton: null,
      tButton: null,
      wButton: null,
      thButton: null,
      fButton: null,
      saButton: null,
    };
    this.updateOnPress = this.updateOnPress.bind(this);
  }

  updateOnPress(type) {
    const {
      sButton,
      mButton,
      tButton,
      wButton,
      thButton,
      fButton,
      saButton,
    } = this.state;
    switch (type) {
      case 'S':
        if (sButton === 'S') {
          this.setState({ sButton: 'default' });
        } else {
          this.setState({ sButton: type });
        }
        break;
      case 'M':
        if (mButton === 'M') {
          this.setState({ mButton: 'default' });
        } else {
          this.setState({ mButton: type });
        }
        break;
      case 'T':
        if (tButton === 'T') {
          this.setState({ tButton: 'default' });
        } else {
          this.setState({ tButton: type });
        }
        break;
      case 'W':
        if (wButton === 'W') {
          this.setState({ wButton: 'default' });
        } else {
          this.setState({ wButton: type });
        }
        break;
      case 'Th':
        if (thButton === 'Th') {
          this.setState({ thButton: 'default' });
        } else {
          this.setState({ thButton: type });
        }
        break;
      case 'F':
        if (fButton === 'F') {
          this.setState({ fButton: 'default' });
        } else {
          this.setState({ fButton: type });
        }
        break;
      case 'Sa':
        if (saButton === 'Sa') {
          this.setState({ saButton: 'default' });
        } else {
          this.setState({ saButton: type });
        }
        break;
      default:
        break;
    }
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
      <View style={styles.container}>

        <TouchableOpacity onPress={() => this.updateOnPress('S')}>
          <Circle style={{
            backgroundColor: sButton === 'S'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>S</Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('M')}>
          <Circle style={{
            backgroundColor: mButton === 'M'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>M</Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('T')}>
          <Circle style={{
            backgroundColor: tButton === 'T'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>T</Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('W')}>
          <Circle style={{
            backgroundColor: wButton === 'W'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>W</Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('Th')}>
          <Circle style={{
            backgroundColor: thButton === 'Th'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>Th</Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('F')}>
          <Circle style={{
            backgroundColor: fButton === 'F'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>F</Text>
          </Circle>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this.updateOnPress('Sa')}>
          <Circle style={{
            backgroundColor: saButton === 'Sa'
              ? Colors.primary
              : Colors.gray,
          }}
          >
            <Text style={styles.text}>Sa</Text>
          </Circle>
        </TouchableOpacity>

      </View>
    );
  }
}

export default DayPicker;
