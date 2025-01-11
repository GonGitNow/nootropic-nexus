import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import mongoose from 'mongoose';
import { Nootropic } from '../models/nootropicModel';
import dotenv from 'dotenv';

dotenv.config();

const parseIQBoost = (boost: string | undefined): number | undefined => {
  if (!boost || boost.toLowerCase() === 'n/a') return undefined;
  
  // Remove % sign and split by hyphen if it's a range
  const cleanBoost = boost.replace('%', '').trim();
  if (cleanBoost.includes('-')) {
    // If it's a range like "3-5", take the average
    const [min, max] = cleanBoost.split('-').map(Number);
    if (isNaN(min) || isNaN(max)) return undefined;
    return (min + max) / 2;
  }
  
  const num = Number(cleanBoost);
  return isNaN(num) ? undefined : num;
};

const importData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nootropic-nexus');
    console.log('Connected to MongoDB');

    // Read and parse CSV file
    const csvFilePath = path.join(__dirname, '../data/Supplement Stack Info - Sheet1.csv');
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // Parse CSV data
    const records: any[] = await new Promise((resolve, reject) => {
      parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true
      }, (err, records) => {
        if (err) reject(err);
        else resolve(records);
      });
    });

    // Clear existing data
    await Nootropic.deleteMany({});
    console.log('Cleared existing nootropics');

    // Transform data and handle duplicates
    const processedSubstances = new Set();
    const nootropics = records
      .filter(record => {
        const substanceName = record.Substance?.trim();
        if (!substanceName || processedSubstances.has(substanceName)) {
          return false;
        }
        processedSubstances.add(substanceName);
        return true;
      })
      .map(record => ({
        substanceName: record.Substance?.trim(),
        category: record.Category?.split(',').map((cat: string) => cat.trim()).filter(Boolean),
        benefits: record.Benefits?.split(',').map((benefit: string) => benefit.trim()).filter(Boolean),
        potentialIQBoost: parseIQBoost(record['Potential IQ Boost']),
        dosage: {
          amount: record.Dosage?.split(' ')[0],
          unit: record.Dosage?.split(' ')[1]
        },
        doseTiming: record['Dose Timing'],
        howToTake: record['How to take'] === 'Yes',
        drugInteractions: record['Drug Interactions']?.split(';').map((interaction: string) => interaction.trim()).filter(Boolean),
        sideEffects: record['Side Effects']?.split(',').map((effect: string) => effect.trim()).filter(Boolean),
        moleculeStructure: record['Molecule Structure'],
        potentialStacks: record['Potential Stack']?.split(',').map((stack: string) => stack.trim()).filter(Boolean),
        lastUpdated: new Date(),
        references: []
      }));

    // Insert data into MongoDB
    await Nootropic.insertMany(nootropics);
    console.log(`Successfully imported ${nootropics.length} nootropics`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

importData(); 