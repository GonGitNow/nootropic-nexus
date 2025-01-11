import { connectDB } from './database';
import { Nootropic } from '../models/Nootropic';
import { seedNootropics } from './seedData';

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Nootropic.deleteMany({});
    console.log('Cleared existing nootropics');

    // Insert seed data
    await Nootropic.insertMany(seedNootropics);
    console.log('Successfully seeded nootropics');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 