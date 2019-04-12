
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { MainScreen } from '../screens/MainScreen';

jest.mock('firebase', () => ({
  auth: () => ({
    onAuthStateChanged: jest.fn(cb => cb({ name: 'Tristan', uid: 1 })),
  }),
}));

Enzyme.configure({ adapter: new Adapter() });


describe('Main Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockDeleteAlarmfn = jest.fn();
  const navigation = { navigate: jest.fn() };
  const time = new Date(2019, 4, 26, 10, 0, 0);

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<MainScreen
      navigation={navigation}
      deleteAlarm={mockDeleteAlarmfn}
      alarmTime={time.getTime()}
      alarmActive
      loading={false}
    />);
  });

  it('test Main screen matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the delete alarm action', () => {
    wrapper.find('[title="DELETE"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockDeleteAlarmfn.mock.calls.length).toBe(1);
  });
});
