/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';
import {
  View,
  Text,
  NetInfo,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Colors } from '../constants';

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
  return (
    <View style={styles.offlineContainer}>
      <Text style={styles.offlineText}>No Internet Connection</Text>
    </View>
  );
}

class OfflineNotice extends PureComponent {
  state = {
    isConnected: true,
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    if (isConnected) {
      this.setState({ isConnected: true });
    } else {
      this.setState({ isConnected: false });
    }
  };

  render() {
    const {
      isConnected,
    } = this.state;
    if (!isConnected) {
      return <MiniOfflineSign />;
    }
    return null;
  }
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: Colors.error,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    top: 30,
  },
  offlineText: {
    color: Colors.white,
    fontWeight: '500',
  },
});

export default OfflineNotice;
