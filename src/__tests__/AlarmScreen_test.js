// app/src/components/__tests__/Login-test.js
/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moment from 'moment';
import { AlarmScreen } from '../screens/AlarmScreen';

Enzyme.configure({ adapter: new Adapter() });
describe('Alarm Screen', () => {
  let wrapper;
  // our mock login function to replace the one provided by mapDispatchToProps
  const mockturnAlarmOfffn = jest.fn();
  const navigation = { navigate: jest.fn() };
  const time1 = moment(0).format('LT');
  const time2 = moment('20111031', 'YYYYMMDD').format('LT');

  beforeEach(() => {
    // pass the mock function as the login prop
    wrapper = shallow(<AlarmScreen
      turnAlarmOff={mockturnAlarmOfffn}
      navigation={navigation}
    />);
  });

  it('test Alarm screen matches snapshot time 1', () => {
    wrapper.setState({ time: time1 });
    expect(wrapper).toMatchSnapshot();
  });

  it('test Alarm screen matches snapshot time 2', () => {
    wrapper.setState({ time: time2 });
    expect(wrapper).toMatchSnapshot();
  });

  it('should call the alarm off action', () => {
    wrapper.find('[title="Turn Off Alarm"]').simulate(
      'press',
      { preventDefault() {} },
    );
    expect(mockturnAlarmOfffn.mock.calls.length).toBe(1);
  });
});
