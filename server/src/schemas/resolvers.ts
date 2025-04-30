// import Entry from '../models/Entry.js';

// const resolvers = {
//   Query: {
//     allEntries: async () => {
//       return await Entry.find().sort({ date: -1 });
//     },
//     entriesByEmail: async (_: unknown, { email }: { email: string }) => {
//       return await Entry.find({ email }).sort({ date: -1 });
//     },
//   },

//   Mutation: {
//     addEntry: async (
//       _: unknown,
//       { content, mood, email }: { content?: string; mood?: string; email: string }
//     ) => {
//       return await Entry.create({
//         content: content || null,
//         mood: mood || null,
//         email,
//         date: new Date().toISOString(),
//       });
//     },
//   },
// };

// export default resolvers;
// src/schemas/resolvers.ts
import Entry from '../models/Entry.js';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
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
      return await Entry.create({
        content: content || null,
        mood: mood || null,
        email,
        date: new Date().toISOString(),
      });
    },

    signup: async (
      _: unknown,
      { email, password }: { email: string; password: string }
    ) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({ email, password: hashedPassword });
      const token = signToken(newUser.email, newUser._id);

      return {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      };
    },
  },
};

export default resolvers;
