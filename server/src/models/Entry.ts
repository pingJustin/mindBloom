import { Schema, type Document } from 'mongoose';

export interface EntryDocument extends Document {
  entryId: string;
  content: string;
  mood: string;
  date: Date;
}
   

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedEntries` array in User.js
const entrySchema = new Schema<EntryDocument>({
 
entryId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  mood: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default entrySchema;