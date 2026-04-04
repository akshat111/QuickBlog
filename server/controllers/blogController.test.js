import { jest } from '@jest/globals';

// Set up mocks for ESM dependencies
jest.unstable_mockModule('../models/Comment.js', () => ({
  default: {
    create: jest.fn(),
    find: jest.fn(),
    deleteMany: jest.fn()
  },
}));

jest.unstable_mockModule('../models/Blog.js', () => ({
  default: {
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
    create: jest.fn(),
  },
}));

jest.unstable_mockModule('../configs/imageKit.js', () => ({
  default: {
    upload: jest.fn(),
    url: jest.fn(),
  },
}));

jest.unstable_mockModule('../configs/gemini.js', () => ({
  default: jest.fn(),
}));

jest.unstable_mockModule('fs', () => ({
  default: {
    readFileSync: jest.fn(),
  },
}));

describe('blogController', () => {
  let blogController;
  let CommentMock;

  beforeAll(async () => {
    // Dynamically import the controller after setting up mocks
    blogController = await import('./blogController.js');
    const CommentModule = await import('../models/Comment.js');
    CommentMock = CommentModule.default;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addComment', () => {
    it('should add a comment successfully', async () => {
      const req = {
        body: { blog: '12345', name: 'John Doe', content: 'This is a test comment.' }
      };
      const res = {
        json: jest.fn()
      };

      CommentMock.create.mockResolvedValue({});

      await blogController.addComment(req, res);

      expect(CommentMock.create).toHaveBeenCalledWith({ blog: '12345', name: 'John Doe', content: 'This is a test comment.' });
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Comment added for review' });
    });

    it('should handle errors when Comment.create throws', async () => {
      const req = {
        body: { blog: '12345', name: 'John Doe', content: 'This is a test comment.' }
      };
      const res = {
        json: jest.fn()
      };

      const testError = new Error('Database insertion failed');
      CommentMock.create.mockRejectedValue(testError);

      await blogController.addComment(req, res);

      expect(CommentMock.create).toHaveBeenCalledWith({ blog: '12345', name: 'John Doe', content: 'This is a test comment.' });
      expect(res.json).toHaveBeenCalledWith({ success: false, message: 'Database insertion failed' });
    });
  });
});
