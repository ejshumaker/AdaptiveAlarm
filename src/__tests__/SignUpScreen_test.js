
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
  });

  it('test SignUp screen matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
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
});
