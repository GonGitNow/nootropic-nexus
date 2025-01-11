import mongoose, { Schema, Document } from 'mongoose';

interface IRating {
  rating: number;
  review?: string;
  createdAt: Date;
}

interface IStack extends Document {
  name: string;
  description: string;
  components: Array<{
    nootropic: mongoose.Types.ObjectId;
    dosage?: {
      amount?: number;
      unit?: string;
    };
    timing?: string;
  }>;
  benefits: string[];
  ratings: IRating[];
  totalRatings: number;
  averageRating: number;
  instructions?: string;
  warnings?: string[];
  createdAt: Date;
  updatedAt: Date;
  addRating: (rating: number, review?: string) => void;
}

const RatingSchema = new Schema<IRating>({
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const StackSchema = new Schema<IStack>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  components: [{
    nootropic: { type: Schema.Types.ObjectId, ref: 'Nootropic', required: true },
    dosage: {
      amount: { type: Number },
      unit: { type: String }
    },
    timing: { type: String }
  }],
  benefits: [{ type: String }],
  ratings: [RatingSchema],
  totalRatings: { type: Number, default: 0 },
  averageRating: { type: Number, default: 0 },
  instructions: { type: String },
  warnings: [{ type: String }]
}, { timestamps: true });

StackSchema.methods.addRating = function(rating: number, review?: string) {
  this.ratings.push({ rating, review });
  this.totalRatings = this.ratings.length;
  this.averageRating = this.ratings.reduce((acc: number, curr: IRating) => acc + curr.rating, 0) / this.totalRatings;
};

export const Stack = mongoose.model<IStack>('Stack', StackSchema); 