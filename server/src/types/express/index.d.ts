declare namespace Express {
    interface Request {
      user: {
        _id: unknown;
        email: string;
      };
    }
  }