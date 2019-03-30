/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable no-undef */
global.fetch = require('jest-fetch-mock');
require('react-native-mock-render/mock');

jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true });
const { JSDOM } = require('jsdom');

jest.mock('expo', () => ({
  Permissions: {
    askAsync: jest.fn(),
  },
  Location: {
    getCurrentPositionAsync: jest.fn(),
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
