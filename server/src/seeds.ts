import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Entry from './models/Entry.js';

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mindBloom', );

    await User.deleteMany({});
    await Entry.deleteMany({});

    const users = await User.insertMany([
        
      { email: 'alice@email.com', password: 'password' },
      { email: 'bob@email.com', password: 'password' },
      { email: 'charlie@email.com', password: 'password' }  
    ]);
    console.log('users', users);
    const entries = await Entry.insertMany([
      { content: 'Hello world!', mood: 'excited', email: 'alice@email.com' },
      { content: 'Learning the MERN stack!', mood: 'sad', email: 'bob@email.com' },
      { content: 'MongoDB is fun!', mood: "happy", email: 'charlie@email.com' }
    ]);

   
    for (let i = 0; i < entries.length; i++) {
        const entry  = entries[i];
        console.log('entry', entry);
       // const user = await User.find((u: { email: string; }) => u.email === entry.email);
        const user1 = await User.updateOne({ email: entry.email },
            {
                $push: {
                    entries: entry._id  // Push the entry ID to the user's entries array
                }
            }
        );
     
      console.log('user1', user1);
       // if (user) {
       //   user.entries = user.entries || [];
       //   user.entries.push((entry._id as any)); 
        //  await user.save();
        // 
       // }
      }
      

    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();