/* eslint-disable no-undef */
/* eslint-disable import/first */

const mockSet = jest.fn();

const mockRef = jest.fn(() => ({
  set: mockSet,
}));

const mockDatabase = ({
  ref: mockRef,
});

const mockCreateUserWithEmailAndPassword = jest.fn();

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
describe('User.js -> Create Alarm tests', () => {
  const credentials = {
    email: 'test@gmail.com',
    password: 'pass',
    firstName: 'First',
    lastName: 'Last',
    userName: 'userName',
  };

  beforeEach(() => {

  });

  test('create account successfully', async () => {
    mockCreateUserWithEmailAndPassword.mockImplementation(() => new Promise((resolve) => {
      resolve({
        user: {
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        },
      });
    }));
    const result = await User.createAccount(credentials);
    expect(result).toEqual({
      userName: 'userName',
      firstName: 'First',
      lastName: 'Last',
      email: 'test@gmail.com',
      uid: 1234,
    });
  });

  test('create account with different info successfully', async () => {
    mockAuth.currentUser = {
      email: 'test2@gmail.com',
      password: 'pass2',
      uid: 123,
    };
    mockCreateUserWithEmailAndPassword.mockImplementation(() => new Promise((resolve) => {
      resolve({
        user: {
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        },
      });
    }));
    const result = await User.createAccount(credentials);
    expect(result).toEqual({
      userName: 'userName',
      firstName: 'First',
      lastName: 'Last',
      email: 'test2@gmail.com',
      uid: 123,
    });
  });

  test('check createUserWithEmailAndPassword parameters', async () => {
    mockCreateUserWithEmailAndPassword.mockImplementation(() => new Promise((resolve) => {
      resolve({
        user: {
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        },
      });
    }));
    await User.createAccount(credentials);
    expect(mockCreateUserWithEmailAndPassword).toHaveBeenLastCalledWith('test@gmail.com', 'pass');
  });


  test('check database call parameters with different user', async () => {
    mockCreateUserWithEmailAndPassword.mockImplementation(() => new Promise((resolve) => {
      resolve({
        user: {
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        },
      });
    }));
    mockAuth.currentUser = {
      email: 'test@gmail.com',
      password: 'pass',
      uid: 123,
    };
    await User.createAccount(credentials);
    expect(mockRef).toHaveBeenLastCalledWith('users/123');
    expect(mockSet).toHaveBeenLastCalledWith({
      email: 'test@gmail.com',
      uid: 123,
      firstName: 'First',
      lastName: 'Last',
      userName: 'userName',
    });
  });

  test('error creating user', async () => {
    expect.assertions(1);
    mockCreateUserWithEmailAndPassword.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('createUserError'));
    }));

    try {
      await User.createAccount(credentials);
    } catch (e) {
      expect(e).toEqual(Error('createUserError'));
    }
  });
});
