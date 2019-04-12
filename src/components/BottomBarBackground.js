import React from 'react';
import {
  View, StyleSheet, Platform,
} from 'react-native';

// const { StatusBarManager } = NativeModules;

const styles = StyleSheet.create({
  bottomBarBackground: {
    paddingVertical: (Platform.OS === 'ios') ? 96 : 96,
    backgroundColor: 'rgba(255,255,255,0)',
  },
});

const BottomBarBackground = (props) => {
  // eslint-disable-next-line
  const { style } = props;
  return (
    <View style={[styles.bottomBarBackground, style || {}]} />
  );
};


export default BottomBarBackground;
