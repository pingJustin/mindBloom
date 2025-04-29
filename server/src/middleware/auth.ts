// Express.js authentication middleware
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const secret = process.env.JWT_SECRET_KEY || process.env.JWT_SECRET || 'defaultsecret';

export const authMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, secret) as { _id: string; email: string };
    const user = await User.findById(decoded._id);
    if (user) {
      req.user = { _id: user._id, email: user.email };
    }
  } catch (err) {
    // Invalid token, do nothing
  }
  next();
};
