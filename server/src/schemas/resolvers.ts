import Entry from '../models/Entry.js';
import User from '../models/User.js';
import { signToken } from '../services/auth.js';

const resolvers = {
  Query: {
    allEntries: async () => {
      return await Entry.find().sort({ date: -1 });
    },
    entriesByEmail: async (_: unknown, { email }: { email: string }) => {
      return await Entry.find({ email }).sort({ date: -1 });
    },
  },

  Mutation: {
    addEntry: async (
      _: unknown,
      { content, mood, email }: { content?: string; mood?: string; email: string }
    ) => {
      const newEntry = await Entry.create({
        content: content || null,
        email: email || null,
        mood: mood || null,
        createdAt: new Date().toISOString(),
      });
      console.log('email', email);
      console.log('newEntry.id', newEntry._id);
      console.log('newEntry', newEntry);
      try {
        const user = await User.findOneAndUpdate(
          { email },
          { $addToSet: { entries: newEntry._id } },
          { new: true, runValidators: true }
        );
        console.log('user', user);
        return newEntry;
      } catch (err) {
        console.log(err);
        throw new Error('Failed to add entry to user');
      }
    },

    signup: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      console.log('password', password);
      const newUser = await User.create({ email, password });
      const token = signToken(newUser.email, newUser._id);

      return {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      };
    },
    
    login: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
    console.log('password', password);
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new Error('User not found');
    }

    const isPasswordCorrect = await existingUser.isCorrectPassword(password);
    console.log('isPasswordCorrect', isPasswordCorrect);
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }

    const token = signToken(existingUser.email, existingUser._id);

    return {
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
    };
    },

  },
};

export default resolvers;
