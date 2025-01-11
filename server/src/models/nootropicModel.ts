import mongoose from 'mongoose';

const nootropicSchema = new mongoose.Schema({
  substanceName: {
    type: String,
    required: true,
    unique: true
  },
  category: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  potentialIQBoost: {
    type: Number
  },
  dosage: {
    amount: {
      type: String
    },
    unit: {
      type: String
    }
  },
  doseTiming: {
    type: String
  },
  howToTake: {
    type: Boolean,
    default: false
  },
  drugInteractions: [{
    type: String
  }],
  sideEffects: [{
    type: String
  }],
  moleculeStructure: {
    type: String
  },
  potentialStacks: [{
    type: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  references: [{
    type: String
  }]
});

export const Nootropic = mongoose.model('Nootropic', nootropicSchema); 