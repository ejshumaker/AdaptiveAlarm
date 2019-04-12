/* eslint-disable no-undef */
/* eslint-disable import/first */

const mockOnce = jest.fn();

const mockRef = jest.fn(() => ({
  once: mockOnce,
}));

const mockDatabase = ({
  ref: mockRef,
});

const mockAuth = ({
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
describe('User.js -> fetch tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetch successfully', async () => {
    mockOnce.mockImplementation(() => new Promise((resolve) => {
      resolve({
        val: jest.fn(() => ({
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        })),
      });
    }));
    const result = await User.fetch();
    expect(result).toEqual({
      email: mockAuth.currentUser.email,
      uid: mockAuth.currentUser.uid,
    });
  });

  test('fetch failure', async () => {
    expect.assertions(1);
    mockOnce.mockImplementation(() => new Promise((resolve, reject) => {
      reject(Error('failed fetch'));
    }));
    try {
      await User.fetch();
    } catch (e) {
      expect(e).toEqual(Error('failed fetch'));
    }
  });

  test('check ref parameters', async () => {
    mockOnce.mockImplementation(() => new Promise((resolve) => {
      resolve({
        val: jest.fn(() => ({
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        })),
      });
    }));
    await User.fetch();
    expect(mockRef).toHaveBeenCalledTimes(1);
    expect(mockRef).toHaveBeenLastCalledWith('users/1234');
  });

  test('check once parameters', async () => {
    mockOnce.mockImplementation(() => new Promise((resolve) => {
      resolve({
        val: jest.fn(() => ({
          email: mockAuth.currentUser.email,
          uid: mockAuth.currentUser.uid,
        })),
      });
    }));
    await User.fetch();
    expect(mockOnce).toHaveBeenCalledTimes(1);
    expect(mockOnce).toHaveBeenLastCalledWith('value');
  });
});
