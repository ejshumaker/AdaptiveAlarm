// app/src/components/__tests__/Login-test.js
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AccountScreen } from '../screens/AccountScreen';

Enzyme.configure({ adapter: new Adapter() });
describe('Account Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockSignOutfn = jest.fn();

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<AccountScreen
      signOut={mockSignOutfn}
      firstName="Tristan"
      lastName="Steiner"
      navigation={jest.fn()}
      loading={false}
    />);
  });
  // ...tests here...
  it('test account screen matches snapshot', () => {
    /* wrapper.setState({
      predictedTimeHour: 12,
      predictedTimeMin: 30,
      predictedTimeMeridiem: 'am',
    }); */
    expect(wrapper).toMatchSnapshot();
    // wrapper.unmount();
  });

  it('should call the mock sign out function', () => {
    wrapper.find('[title="Sign Out"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockSignOutfn.mock.calls.length).toBe(1);
  });
});
