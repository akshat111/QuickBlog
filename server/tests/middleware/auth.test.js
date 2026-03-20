import { jest } from '@jest/globals';

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    verify: jest.fn(),
  },
}));

describe('auth middleware', () => {
  let auth;
  let jwt;

  beforeEach(async () => {
    // Clear modules to ensure fresh mock state
    jest.clearAllMocks();

    // Import mocked dependencies
    const jwtModule = await import('jsonwebtoken');
    jwt = jwtModule.default;

    // Import auth middleware dynamically
    const authModule = await import('../../middleware/auth.js');
    auth = authModule.default;

    // Set mock env variable
    process.env.JWT_SECRET = 'test_secret';
  });

  afterEach(() => {
    delete process.env.JWT_SECRET;
  });

  it('should call next() if token is valid', () => {
    const req = {
      headers: {
        authorization: 'valid_token'
      }
    };
    const res = {
      json: jest.fn()
    };
    const next = jest.fn();

    // Mock verify to return a decoded token (success)
    jwt.verify.mockReturnValue({ id: 'user1' });

    auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid_token', 'test_secret');
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return error if token is invalid', () => {
    const req = {
      headers: {
        authorization: 'invalid_token'
      }
    };
    const res = {
      json: jest.fn()
    };
    const next = jest.fn();

    // Mock verify to throw an error
    jwt.verify.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('invalid_token', 'test_secret');
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle missing token', () => {
    const req = {
      headers: {}
    };
    const res = {
      json: jest.fn()
    };
    const next = jest.fn();

    // Mock verify to throw an error when token is undefined
    jwt.verify.mockImplementation(() => {
      throw new Error('jwt must be provided');
    });

    auth(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith(undefined, 'test_secret');
    expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });
});
