import { Request, Response } from 'express';
import { Nootropic } from '../models/nootropicModel';

// Get all nootropics
export const getAllNootropics = async (req: Request, res: Response) => {
  try {
    const nootropics = await Nootropic.find();
    res.json(nootropics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nootropics', error });
  }
};

// Get single nootropic
export const getNootropic = async (req: Request, res: Response) => {
  try {
    const nootropic = await Nootropic.findOne({ substanceName: req.params.name });
    if (!nootropic) {
      return res.status(404).json({ message: 'Nootropic not found' });
    }
    res.json(nootropic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching nootropic', error });
  }
};

// Create nootropic
export const createNootropic = async (req: Request, res: Response) => {
  try {
    const nootropic = new Nootropic(req.body);
    await nootropic.save();
    res.status(201).json(nootropic);
  } catch (error) {
    res.status(400).json({ message: 'Error creating nootropic', error });
  }
}; 