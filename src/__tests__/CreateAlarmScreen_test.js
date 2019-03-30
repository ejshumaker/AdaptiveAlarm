
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { CreateAlarmScreen } from '../screens/CreateAlarmScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));

Enzyme.configure({ adapter: new Adapter() });


describe('CreateAlarm Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockcreateAlarmfn = jest.fn();
  const navigation = { navigate: jest.fn() };
  const time = new Date(2019, 4, 26, 10, 0, 0);

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<CreateAlarmScreen
      navigation={navigation}
      createAlarm={mockcreateAlarmfn}
      loading={false}
    />);
  });

  it('test CreateAlarm screen matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('test CreateAlarm screen matches snapshot after state set', () => {
    wrapper.setState({
      readyTime: 30,
      arrivalTime: time.getTime(),
      workAddress: 'Middleton, WI',
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the create alarm action', () => {
    wrapper.setState({
      readyTime: 30,
      arrivalTime: time.getTime(),
      workAddress: 'Middleton, WI',
    });
    wrapper.find('[title="Create Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockcreateAlarmfn.mock.calls.length).toBe(1);
  });
});
