import React from 'react';
import {
  View, StyleSheet, Platform, NativeModules,
} from 'react-native';

const { StatusBarManager } = NativeModules;

const styles = StyleSheet.create({
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : StatusBarManager.HEIGHT, // this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

const StatusBarBackground = (props) => {
  // eslint-disable-next-line
  const { style } = props;
  return (
    <View style={[styles.statusBarBackground, style || {}]} />
  );
};


export default StatusBarBackground;
