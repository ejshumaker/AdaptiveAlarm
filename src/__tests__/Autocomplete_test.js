/* eslint-disable no-undef */
/* eslint-disable import/first */
import 'react-native';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Autocomplete from '../components/Autocomplete';

// jest.mock('react-native-svg');

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
let wrapper = null;
const onDestChangeMock = jest.fn();
const acValMock = 'test';

describe('Autocomplete tests', () => {
  beforeEach(() => {
    wrapper = shallow(<Autocomplete
      autoCompleteValue={acValMock}
      onDestChange={onDestChangeMock}
    />);
    wrapper = wrapper.find('GoogleAutoComplete').dive();
  });

  it('test autocomplete matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('autocomplete on text input', () => {
    expect.assertions(1);
    wrapper.find('CloseIcon').simulate('press',
      { preventDefault() {} });
    wrapper.find('TextInput').at(0).simulate('ChangeText', 'newVal');
    expect(wrapper.state('autoCompleteValue')).toEqual(undefined);
  });

  afterAll(() => {
    wrapper.unmount();
  });
});
