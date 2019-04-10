/* eslint-disable no-undef */
/* eslint-disable import/first */

const mockSet = jest.fn();

const mockRef = jest.fn(() => ({
  set: mockSet,
}));

const mockDatabase = ({
  ref: mockRef,
});

const mockCreateUserWithEmailAndPassword = jest.fn(() => new Promise((resolve) => {
  resolve({
    user: {
      email: 'test@gmail.com',
      uid: 1234,
    },
  });
}));

const mockAuth = ({
  createUserWithEmailAndPassword: mockCreateUserWithEmailAndPassword,
  currentUser: ({
    email: 'test@gmail.com',
    password: 'pass',
    uid: 1234,
  }),
});

jest.mock('firebase', () => ({
  auth: jest.fn(() => mockAuth),
  database: jest.fn(() => mockDatabase),
}));

import User from '../../custom_modules/User';

jest.setTimeout(10000);
describe('Create Alarm tests', () => {
  beforeEach(() => {

  });

  test('create account', async () => {
    const credentials = {
      email: 'test@gmail.com',
      password: 'pass',
      firstName: 'First',
      lastName: 'Last',
      userName: 'userName',
    };
    const result = await User.createAccount(credentials);
    expect(result).toEqual({
      userName: 'userName',
      firstName: 'First',
      lastName: 'Last',
      email: 'test@gmail.com',
      uid: 1234,
    });
  });

  test('check createUserWithEmailAndPassword call', async () => {
    const credentials = {
      email: 'test@gmail.com',
      password: 'pass',
      firstName: 'First',
      lastName: 'Last',
      userName: 'userName',
    };
    await User.createAccount(credentials);
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenLastCalledWith('test@gmail.com', 'pass');
  });


  test('check database call', async () => {
    const credentials = {
      email: 'test@gmail.com',
      password: 'pass',
      firstName: 'First',
      lastName: 'Last',
      userName: 'userName',
    };
    await User.createAccount(credentials);
    expect(mockRef).toHaveBeenLastCalledWith('users/1234');
    expect(mockSet).toHaveBeenLastCalledWith({
      email: 'test@gmail.com',
      uid: 1234,
      firstName: 'First',
      lastName: 'Last',
      userName: 'userName',
    });
  });
});
