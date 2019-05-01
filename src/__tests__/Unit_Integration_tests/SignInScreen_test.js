
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignInScreen } from '../../screens/SignInScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));
jest.mock('react-native-background-timer', () => jest.fn());
jest.mock('../../assets/sounds/', () => jest.fn());
jest.mock('react-native-sound', () => ({
  loadAsync: jest.fn(),
  setIsLoopingAsync: jest.fn(),
  playAsync: jest.fn(),
  setCategory: jest.fn(),
  MAIN_BUNDLE: jest.fn(),
}));
Enzyme.configure({ adapter: new Adapter() });


describe('SignIn Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockSignInfn = jest.fn();
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<SignInScreen
      navigation={navigation}
      signIn={mockSignInfn}
      loading={false}
      // Redux state
      errorMessage=""
    />);
    wrapper2 = shallow(<SignInScreen
      navigation={navigation}
      signIn={mockSignInfn}
      loading
      // Redux state
      errorMessage=""
    />);
    jest.clearAllMocks();
  });

  it('test SignIn screen matches snapshot not loading', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test SignIn screen matches snapshot loading', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('test SignIn screen matches snapshot after state set', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the sign in action', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    wrapper.find('[title="Sign In"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockSignInfn.mock.calls.length).toBe(1);
  });

  it('should navigate to the sign up page', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner@wisc.edu',
    });
    wrapper.find('[title="Sign Up"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
  });


  it('changing email input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(0).simulate('ChangeText', 'Hello');
    expect(wrapper.state('email')).toEqual('Hello');
  });

  it('Changing password input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(1).simulate('ChangeText', 'Swizzle');
    expect(wrapper.state('password')).toEqual('Swizzle');
  });

  /* Tests still needed
  change text on password input value
  Sign up button press
  Snapshot when loading is true

  */
});
