/* eslint-disable no-undef */
/* eslint-disable import/first */
import 'react-native';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Buttons from '../components/Buttons';

// jest.mock('react-native-svg');

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
let wrapper = null;
const onPressMock = jest.fn();


describe('Buttons tests', () => {
  beforeEach(() => {
    wrapper = mount(<Buttons
      onPress={onPressMock}
      title="test"
      textColor="b"
      backgroundColor="w"
    />);
    jest.clearAllMocks();
  });

  it('test Buttons matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
