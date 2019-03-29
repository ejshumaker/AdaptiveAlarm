/* eslint-disable no-undef */
/* eslint-disable import/first */
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'; // ES6 modules
import Provider from 'redux';
import { AccountScreen } from '../screens/AccountScreen';

const middlewares = [];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

jest.setTimeout(10000);
// You would import the action from your codebase in a real scenario
const addTodo = () => ({ type: 'ADD_TODO' });

it('should dispatch action', () => {
  // Initialize mockstore with empty state
  const initialState = {};
  const store = mockStore(initialState);

  // Dispatch the action
  store.dispatch(addTodo());

  // Test if your store dispatched the expected actions
  const actions = store.getActions();
  const expectedPayload = { type: 'ADD_TODO' };
  expect(actions).toEqual([expectedPayload]);
});
// TODO add other components
it('test account screen matches snapshot', () => {
  const initialState = {};
  const store = mockStore(initialState);
  const mockSignOutfn = jest.fn();

  let wrapper = shallow(
    <AccountScreen
      signOut={mockSignOutfn}
      firstName="Tristan"
      lastName="Steiner"
    />,
  );
  wrapper = wrapper.dive({ context: { store } });
  /* wrapper.setState({
    predictedTimeHour: 12,
    predictedTimeMin: 30,
    predictedTimeMeridiem: 'am',
  }); */
  expect(wrapper).toMatchSnapshot();
  wrapper.unmount();
});

it('test functionality of main screen', () => {

});
