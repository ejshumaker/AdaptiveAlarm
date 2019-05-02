/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable no-undef */
import { NativeModules as RNNativeModules } from 'react-native';

global.fetch = require('jest-fetch-mock');
require('react-native-mock-render/mock');

jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true });
const { JSDOM } = require('jsdom');

jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn(() => new Promise(resolve => resolve({ status: 'granted' }))),
    LOCATION: '',
  },

  Location: {
    getCurrentPositionAsync: jest.fn(() => new Promise(resolve => resolve({
      coords: {
        latitude: 1234,
        longitude: 5678,
      },
    }))),
  },
  Alert: {
    alert: jest.fn(),
  },
  Notifications: {
    presentLocalNotificationAsync: jest.fn(),
    createChannelAndroidAsync: jest.fn(),
    createCategoryAsync: jest.fn(),
    addListener: jest.fn(),

  },
  Audio: {
    setIsEnabledAsync: jest.fn(),
    setAudioModeAsync: jest.fn(),
    Sound: jest.fn(() => ({
      loadAsync: jest.fn(),
      setIsLoopingAsync: jest.fn(),
      playAsync: jest.fn(),
    })),
  },
}));

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target),
  });
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
global.requestAnimationFrame = function (callback) {
  return setTimeout(callback, 0);
};
global.cancelAnimationFrame = function (id) {
  clearTimeout(id);
};
copyProps(window, global);
RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule = RNNativeModules.RNGestureHandlerModule || {
  State: {
    BEGAN: 'BEGAN', FAILED: 'FAILED', ACTIVE: 'ACTIVE', END: 'END',
  },
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),

};
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
  forceTouchAvailable: false,
};
jest.mock('react-native-background-timer', () => ({
  clearInterval: jest.fn(),
  stopBackgroundTimer: jest.fn(),
  setInterval: jest.fn(),
  runBackgroundTimer: jest.fn(() => 1),
}));

jest.mock('react-native-audio', () => ({
  MainBundlePath: jest.fn(),
}));

jest.mock('react-native-modal-datetime-picker', () => 'Button');
