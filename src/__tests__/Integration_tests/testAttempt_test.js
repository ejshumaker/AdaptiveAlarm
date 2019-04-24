
/* eslint-disable no-undef */
/* eslint-disable import/first */
jest.mock('react-native-gesture-handler', () => {
  const View = require('react-native/Libraries/Components/View/View');
  return {
    Swipeable: View,
    DrawerLayout: View,
    State: {},
    ScrollView: View,
    Slider: View,
    Switch: View,
    TextInput: View,
    ToolbarAndroid: View,
    ViewPagerAndroid: View,
    DrawerLayoutAndroid: View,
    WebView: View,
    NativeViewGestureHandler: View,
    TapGestureHandler: View,
    FlingGestureHandler: View,
    ForceTouchGestureHandler: View,
    LongPressGestureHandler: View,
    PanGestureHandler: View,
    PinchGestureHandler: View,
    RotationGestureHandler: View,
    /* Buttons */
    RawButton: View,
    BaseButton: View,
    RectButton: View,
    BorderlessButton: View,
    /* Other */
    FlatList: View,
    gestureHandlerRootHOC: jest.fn(),
    Directions: {},
  };
});

jest.mock('../../assets/sounds/', () => jest.fn());


import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../../App';


Enzyme.configure({ adapter: new Adapter() });
describe('Account Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockSignOutfn = jest.fn();
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('test account screen matches snapshot done loading', () => {
    wrapper.setState({ fontLoaded: true });
    wrapper = wrapper.find('NavigationContainer').shallow();
    expect(wrapper).toMatchSnapshot();
  });
});
