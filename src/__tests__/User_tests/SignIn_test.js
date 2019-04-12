/* eslint-disable no-undef */
/* eslint-disable import/first */

import User from '../../custom_modules/User';

const mockSignInWithEmailAndPassword = jest.fn();

const mockAuth = ({
  signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
});

jest.mock('firebase', () => ({
  auth: jest.fn(() => mockAuth),
}));


jest.setTimeout(10000);
describe('User.js -> sign in tests', () => {
  const credentials = {
    email: 'test@gmail.com',
    password: 'pass',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sign in successfully', async () => {
    mockSignInWithEmailAndPassword.mockImplementation(() => new Promise((resolve) => {
      resolve('response');
    }));
    const result = await User.signIn(credentials);
    expect(result).toEqual('response');
  });

  test('sign in successfully parameter check', async () => {
    mockSignInWithEmailAndPassword.mockImplementation(() => new Promise((resolve) => {
      resolve('response');
    }));
    const result = await User.signIn(credentials);
    expect(result).toEqual('response');
    expect(mockSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(mockSignInWithEmailAndPassword)
      .toHaveBeenLastCalledWith(credentials.email, credentials.password);
  });

  test('sign in failure', async () => {
    mockSignInWithEmailAndPassword.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('SignInError'));
    }));
    try {
      await User.signIn(credentials);
    } catch (e) {
      expect(e).toEqual(Error('SignInError'));
    }
  });
});
