const API_BASE_URL = 'http://localhost:5000/api';

export interface Nootropic {
  substanceName: string;
  category: string[];
  benefits: string[];
  potentialIQBoost?: number;
  dosage?: {
    amount: string;
    unit: string;
  };
  doseTiming?: string;
  howToTake?: boolean;
  drugInteractions?: string[];
  sideEffects?: string[];
  moleculeStructure?: string;
  potentialStacks?: string[];
  lastUpdated?: Date;
}

export interface Stack {
  _id: string;
  name: string;
  description: string;
  components: Array<{
    nootropic: string | Nootropic;
    dosage?: {
      amount: number;
      unit: string;
    };
    timing?: string;
  }>;
  benefits: string[];
  totalRatings: number;
  averageRating: number;
  ratings: Array<{
    rating: number;
    review?: string;
    createdAt: Date;
  }>;
  instructions?: string;
  warnings: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const api = {
  nootropics: {
    getAll: async (): Promise<Nootropic[]> => {
      const response = await fetch(`${API_BASE_URL}/nootropics`);
      if (!response.ok) {
        throw new Error('Failed to fetch nootropics');
      }
      return response.json();
    },

    getByName: async (name: string): Promise<Nootropic> => {
      const response = await fetch(`${API_BASE_URL}/nootropics/${name}`);
      if (!response.ok) {
        throw new Error('Failed to fetch nootropic');
      }
      return response.json();
    },

    create: async (nootropic: Omit<Nootropic, '_id'>): Promise<Nootropic> => {
      const response = await fetch(`${API_BASE_URL}/nootropics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nootropic),
      });
      if (!response.ok) {
        throw new Error('Failed to create nootropic');
      }
      return response.json();
    }
  },

  stacks: {
    getAll: async (): Promise<Stack[]> => {
      const response = await fetch(`${API_BASE_URL}/stacks`);
      if (!response.ok) {
        throw new Error('Failed to fetch stacks');
      }
      return response.json();
    },

    getById: async (id: string): Promise<Stack> => {
      const response = await fetch(`${API_BASE_URL}/stacks/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch stack');
      }
      return response.json();
    },

    create: async (stack: Omit<Stack, '_id' | 'totalRatings' | 'averageRating' | 'ratings' | 'createdAt' | 'updatedAt'>): Promise<Stack> => {
      const response = await fetch(`${API_BASE_URL}/stacks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stack),
      });
      if (!response.ok) {
        throw new Error('Failed to create stack');
      }
      return response.json();
    },

    update: async (id: string, stack: Partial<Stack>): Promise<Stack> => {
      const response = await fetch(`${API_BASE_URL}/stacks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stack),
      });
      if (!response.ok) {
        throw new Error('Failed to update stack');
      }
      return response.json();
    },

    rate: async (id: string, rating: number, review?: string): Promise<Stack> => {
      const response = await fetch(`${API_BASE_URL}/stacks/${id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });
      if (!response.ok) {
        throw new Error('Failed to rate stack');
      }
      return response.json();
    }
  }
}; 