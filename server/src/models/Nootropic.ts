import mongoose from 'mongoose';

const ReferenceSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String
}, { _id: false });

const SourceSchema = new mongoose.Schema({
  vendor: String,
  url: String,
  reliability: String,
  region: [String]
}, { _id: false });

const StackSchema = new mongoose.Schema({
  name: String,
  components: [String],
  synergy: String,
  description: String
}, { _id: false });

const NootropicSchema = new mongoose.Schema({
  substanceName: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  benefits: [String],
  potentialIQBoost: {
    minimum: Number,
    maximum: Number,
    description: String
  },
  dosage: {
    minimum: Number,
    maximum: Number,
    unit: String,
    beginnerDose: Number,
    advancedDose: Number
  },
  doseTiming: {
    timesPerDay: Number,
    withFood: Boolean,
    timeOfDay: [String],
    betweenDoses: String
  },
  howToTake: {
    method: String,
    instructions: String,
    specialConsiderations: [String]
  },
  drugInteractions: [{
    substance: String,
    severity: String,
    description: String
  }],
  sideEffects: [{
    effect: String,
    frequency: String,
    severity: String,
    description: String
  }],
  moleculeStructure: {
    imageUrl: String,
    formula: String,
    description: String
  },
  potentialStacks: [StackSchema],
  sources: [SourceSchema],
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  references: [ReferenceSchema]
});

export const Nootropic = mongoose.model('Nootropic', NootropicSchema); 