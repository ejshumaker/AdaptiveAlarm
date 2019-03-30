
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { SignInScreen } from '../screens/SignInScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
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
  });

  it('test SignIn screen matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
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
});
