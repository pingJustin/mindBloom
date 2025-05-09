import { Schema, model, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
 

// Define an interface for the User document
export interface IUser extends Document {
  _id: string;
  email: string;
  password:string;
  entries: ObjectId[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define the schema for the User document
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    entries: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'Entry',
      }
    ],    
     
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (user.isNew || user.isModified('password')) {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
  }

  next();
});
 
// Add a method to check the password
userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
  console.log('password', password);
  console.log('this.password', this.password);
  return await bcrypt.compare(password, this.password);
}; 
const User = model<IUser>('User', userSchema);

export default User;