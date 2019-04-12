
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignUpScreen } from '../screens/SignUpScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));

Enzyme.configure({ adapter: new Adapter() });


describe('SignUp Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockSignUpfn = jest.fn();
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<SignUpScreen
      navigation={navigation}
      createAccount={mockSignUpfn}
      loading={false}
      // Redux state
      errorMessage=""
    />);
    wrapper2 = shallow(<SignUpScreen
      navigation={navigation}
      signIn={mockSignUpfn}
      loading
      // Redux state
      errorMessage=""
    />);
  });

  it('test SignUp screen matches snapshot not loading', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test SignUp screen matches snapshot loading', () => {
    expect(wrapper2).toMatchSnapshot();
  });

  it('test SignUp screen matches snapshot after state set', () => {
    wrapper.setState({
      firstName: 'Tristan',
      lastName: 'Steiner',
      userName: 'tsteiner4',
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the sign up action', () => {
    wrapper.setState({
      firstName: 'Tristan',
      lastName: 'Steiner',
      userName: 'tsteiner4',
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    wrapper.find('[title="Sign Up"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockSignUpfn.mock.calls.length).toBe(1);
  });

  it('should navigate to the sign in page', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner@wisc.edu',
    });
    wrapper.find('[title="Sign In"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(navigation.navigate.mock.calls.length).toBe(1);
  });

  it('Changing that silly email input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(0).simulate('ChangeText', 'Swole');
    expect(wrapper.state('email')).toEqual('Swole');
  });

  it('Changing user name input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(1).simulate('ChangeText', 'Slapstick');
    expect(wrapper.state('userName')).toEqual('Slapstick');
  });

  it('Changing password input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(2).simulate('ChangeText', 'Spirit');
    expect(wrapper.state('password')).toEqual('Spirit');
  });

  it('Changing first name input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(3).simulate('ChangeText', 'slack');
    expect(wrapper.state('firstName')).toEqual('slack');
  });

  it('Changing password input should change the state\'s value', () => {
    wrapper.setState({
      password: 'testPass',
      email: 'tsteiner4@wisc.edu',
    });
    expect.assertions(1);
    wrapper.find('TextInput').at(4).simulate('ChangeText', 'Stammer');
    expect(wrapper.state('lastName')).toEqual('Stammer');
  });

  /* Tests still needed
  change text on password input value
  Sign up button press
  Snapshot when loading is true

  */
});
