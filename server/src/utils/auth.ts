import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';

export const authenticateToken = async ({ req }: { req: any }) => {
  let token = req.headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.split(' ').pop()?.trim() || '';
  }

  if (!token) {
    return { user: null };
  }

  try {
    const { data }: any = jwt.verify(token, JWT_SECRET, { maxAge: '2h' });
    return { user: data }; // Apollo context expects returned object
  } catch (err) {
    console.warn('Invalid token');
    return { user: null };
  }
};

export const signToken = (email: string, _id: unknown) => {
  const payload = {email, _id };
  return jwt.sign({ data: payload }, JWT_SECRET, { expiresIn: '2h' });
};

export class AuthenticationError extends GraphQLError {
  constructor(message = 'Not authenticated') {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });

    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
}