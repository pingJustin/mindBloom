//used code from module 18 #25

import {User} from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import { IUser } from '../models/User.js'; 
 

interface AddUserArgs {
  username?: string;
  email: string;
  password: string;
}
 
interface AddEntryArgs {
 entryData: {
    entryId: string; 
    content: string;
    mood: string;   
    date: string;
    };
 
}

interface RemoveEntryArgs {
 
  entryId: string;
}

interface Context {
  user?:  IUser;
}

const resolvers = {
  Query: {
  
    me: async (_parent: any, _args: any, context: Context): Promise<IUser | null> => {
      console.log('context', context.user);
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select('-__v -password');
      }
      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (_parent: any, args: AddUserArgs): Promise<{ token: string; user: IUser }> => {
      const user = await User.create({ ...args });
      const token = signToken( user.email, user._id);
      return { token, user };
    },
    login: async (_parent: any, { email, password }: { email: string; password: string }): Promise<{ token: string; user: IUser }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken( user.email, user._id);
      return { token, user };
    },
    addEntry: async (_parent: any, {entryData }: AddEntryArgs, context: Context): Promise<IUser | null> => {
      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet: { entries: entryData },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
   
    removeEntry: async (_parent: any, { entryId}: RemoveEntryArgs, context: Context): Promise<IUser| null> => {
      if (context.user) {
        console.log('context.user._id', context.user._id, entryId);
        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { entries: {entryId} } },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

export default resolvers;