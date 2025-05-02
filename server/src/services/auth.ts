import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_default_dev_secret';

export function authenticateToken({ req }: { req: any }) {
  const authHeader = req?.headers?.authorization || '';
  const token = authHeader.split(' ')[1]; // Bearer <token>

  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      user = decoded;
    } catch (err) {
      console.warn('Invalid or expired token');
    }
  }

  return { user }; // This is your GraphQL context
}

export const signToken = ( email: string, _id: unknown) => {
  const payload = { email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';
  console.log('secretKey', secretKey);

  return jwt.sign(payload, secretKey, { expiresIn: '24h' });
};
