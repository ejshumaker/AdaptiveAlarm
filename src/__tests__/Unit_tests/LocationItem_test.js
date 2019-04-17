/* eslint-disable no-undef */
/* eslint-disable import/first */
import 'react-native';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LocationItem from '../../components/LocationItem';

// jest.mock('react-native-svg');

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
let wrapper = null;
const fetchMock = jest.fn().mockImplementation(() => {
  console.log('in');
  return new Promise((resolve) => {
    const obj = ({ geometry: { location: 'location' }, formatted_address: 'address' });
    console.log(obj);
    resolve(obj);
  });
});
const updateDest = jest.fn();
const resetSearch = jest.fn();
const onAutoMock = jest.fn();


describe('Location Item tests', () => {
  beforeEach(() => {
    wrapper = shallow(<LocationItem
      description="desc"
      fetchDetails={fetchMock}
      updateDest={updateDest}
      resetSearch={resetSearch}
      place_id="12"
      onAutoCompleteInput={onAutoMock}
    />);
    jest.clearAllMocks();
  });

  it('test LocationItem matches snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
