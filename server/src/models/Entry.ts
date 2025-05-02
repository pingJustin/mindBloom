import { Schema, model, Document } from 'mongoose';

export interface EntryDocument extends Document {
  content: string;
  mood: string;
  email: string;
  createdAt: string;
}
   

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedEntries` array in User.js
const EntrySchema = new Schema<EntryDocument>({
  createdAt: String,
  email: String,
  content: { type: String, default: null },
  mood: { type: String, default: null },
});

 
const Entry = model<EntryDocument>('Entry', EntrySchema);
export default Entry;