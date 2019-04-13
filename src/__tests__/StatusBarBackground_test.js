/* eslint-disable no-undef */
/* eslint-disable import/first */
import 'react-native';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import StatusBarBackground from '../components/StatusBarBackground';

// jest.mock('react-native-svg');

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
let wrapper = null;
const onPressMock = jest.fn();


describe('Status Bar tests', () => {
  beforeEach(() => {
    wrapper = mount(<StatusBarBackground
      onPress={onPressMock}
      title="test"
      textColor="b"
      backgroundColor="w"
    />);
    jest.clearAllMocks();
  });

  it('test StatusBarBackground matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
