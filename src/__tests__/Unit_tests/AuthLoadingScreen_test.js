// app/src/components/__tests__/Login-test.js
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { AuthLoadingScreen } from '../../screens/AuthLoadingScreen';

jest.mock('react-native-background-timer', () => jest.fn());
jest.mock('../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));

Enzyme.configure({ adapter: new Adapter() });


describe('AuthLoading Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockfetchUserfn = jest.fn();
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<AuthLoadingScreen
      fetchUser={mockfetchUserfn}
      navigation={navigation}
    />);
  });

  it('test AuthLoading screen matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test fetch user is called', () => {
    expect(mockfetchUserfn).toHaveBeenCalled();
  });

  // TODO test that fetch user is not called without a user
});
