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
const fetchMock = jest.fn().mockImplementation(() => new Promise((resolve) => {
  const obj = ({
    geometry: {
      location: {
        lat: 'lat', lng: 'lng',
      },
    },
    formatted_address: 'address',
  });
  resolve(obj);
}));

const onAutoMock = jest.fn();
const resetSearch = jest.fn();
const updateDest = jest.fn();


describe('Location Item tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('LocationItem matches snapshot', () => {
    wrapper = shallow(<LocationItem
      description="desc"
      fetchDetails={fetchMock}
      updateDest={updateDest}
      resetSearch={resetSearch}
      place_id="12"
      onAutoCompleteInput={onAutoMock}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('LocationItem press', async () => {
    wrapper = shallow(<LocationItem
      description="desc"
      fetchDetails={fetchMock}
      updateDest={updateDest}
      resetSearch={resetSearch}
      place_id="12"
      onAutoCompleteInput={onAutoMock}
    />);
    await wrapper.simulate('press',
      { preventDefault() {} });
    expect(onAutoMock.mock.calls.length).toBe(1);
    expect(updateDest.mock.calls.length).toBe(3);
    expect(resetSearch.mock.calls.length).toBe(1);
  });
});
