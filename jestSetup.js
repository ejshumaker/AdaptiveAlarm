/* eslint-disable func-names */
/* eslint-disable global-require */
/* eslint-disable no-undef */
global.fetch = require('jest-fetch-mock');
require('react-native-mock-render/mock');

jest.mock('react-native', () => require('react-native-mock-render'), { virtual: true });
const { JSDOM } = require('jsdom');

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
