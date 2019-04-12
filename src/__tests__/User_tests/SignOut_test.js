/* eslint-disable no-undef */
/* eslint-disable import/first */

import User from '../../custom_modules/User';

const mockSignOut = jest.fn();

const mockAuth = ({
  signOut: mockSignOut,
});

jest.mock('firebase', () => ({
  auth: jest.fn(() => mockAuth),
}));


jest.setTimeout(10000);
describe('User.js -> sign out tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('sign out successfully', async () => {
    mockSignOut.mockImplementation(() => new Promise((resolve) => {
      resolve('response');
    }));
    const result = await User.signOut();
    expect(result).toEqual(true);
  });
  test('sign out failure', async () => {
    mockSignOut.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('SignOutError'));
    }));
    try {
      await User.signOut();
    } catch (e) {
      expect(e).toEqual(Error('Sign Out Failed'));
    }
  });
});
