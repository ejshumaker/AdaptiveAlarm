
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { AccountScreen } from '../../screens/AccountScreen';

Enzyme.configure({ adapter: new Adapter() });
describe('Account Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockSignOutfn = jest.fn();
  const navigation = { navigate: jest.fn() };

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<AccountScreen
      signOut={mockSignOutfn}
      firstName="Tristan"
      lastName="Steiner"
      navigation={navigation}
      loading={false}
    />);
  });

  it('test account screen matches snapshot done loading', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test account screen matches snapshot not done loading', () => {
    const wrapper2 = shallow(<AccountScreen
      signOut={mockSignOutfn}
      firstName="Tristan"
      lastName="Steiner"
      navigation={navigation}
      loading
    />);
    expect(wrapper2).toMatchSnapshot();
  });

  it('should call the sign out action', () => {
    wrapper.find('[title="Sign Out"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockSignOutfn.mock.calls.length).toBe(1);
  });
});
