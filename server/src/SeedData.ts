//src/SeedData.ts
import bcrypt from 'bcrypt';
import {User }from './models/User'; // Adjust the import to your User model path
import { Types } from 'mongoose'; // Import Types from mongoose

// Seed data
const seedData = [
  {
    username: "janeDoe",
    email: "janedoe@example.com",
    password: "JaneSecurePassword123", // Plain password, will be hashed
    role: "user", // Assign a role
    profile: null, // Optional, reference to the user's profile
    applied_jobs: [], // Optional, initialize as empty array
    posted_jobs: [], // Optional, initialize as empty array
    notifications: [], // Optional, initialize as empty array
  },
  {
    username: "johnSmith",
    email: "johnsmith@example.com",
    password: "JohnSecurePassword123", // Plain password, will be hashed
    role: "admin", // Assign a role
    profile: null, // Optional, reference to the user's profile
    applied_jobs: [], // Optional, initialize as empty array
    posted_jobs: [], // Optional, initialize as empty array
    notifications: [], // Optional, initialize as empty array
  },
  {
    username: "maryJohnson",
    email: "maryjohnson@example.com",
    password: "MarySecurePassword123", // Plain password, will be hashed
    role: "job_seeker", // Assign a role
    profile: null, // Optional, reference to the user's profile
    applied_jobs: [], // Optional, initialize as empty array
    posted_jobs: [], // Optional, initialize as empty array
    notifications: [], // Optional, initialize as empty array
  },
  {
    username: "alexBrown",
    email: "alexbrown@example.com",
    password: "AlexSecurePassword123", // Plain password, will be hashed
    role: "user", // Assign a role
    profile: null, // Optional, reference to the user's profile
    applied_jobs: [], // Optional, initialize as empty array
    posted_jobs: [], // Optional, initialize as empty array
    notifications: [], // Optional, initialize as empty array
  },
  {
    username: "lindaTaylor",
    email: "lindataylor@example.com",
    password: "LindaSecurePassword123", // Plain password, will be hashed
    role: "job_seeker", // Assign a role
    profile: null, // Optional, reference to the user's profile
    applied_jobs: [], // Optional, initialize as empty array
    posted_jobs: [], // Optional, initialize as empty array
    notifications: [], // Optional, initialize as empty array
  },
];

// Function to hash passwords
const hashPasswords = async (data: Array<{ username: string; email: string; password: string; role: string; profile: Types.ObjectId | null; applied_jobs: Types.ObjectId[]; posted_jobs: Types.ObjectId[]; notifications: Types.ObjectId[]; }>) => {
  return Promise.all(
    data.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    })
  );
};

// Function to insert seed data into the database
export const insertSeedData = async () => {
  try {
    // Hash passwords
    const usersWithHashedPasswords = await hashPasswords(seedData);

    // Insert seed data
    await User.insertMany(usersWithHashedPasswords);
    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  }
};
