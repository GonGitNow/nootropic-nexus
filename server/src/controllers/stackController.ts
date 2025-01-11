import { Request, Response } from 'express';
import { Stack } from '../models/Stack';
import { Nootropic } from '../models/nootropicModel';
import mongoose from 'mongoose';

// Get all stacks
export const getAllStacks = async (req: Request, res: Response) => {
  try {
    const stacks = await Stack.find().populate('components.nootropic');
    res.json(stacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stacks', error });
  }
};

// Get single stack
export const getStack = async (req: Request, res: Response) => {
  try {
    const stack = await Stack.findById(req.params.id).populate('components.nootropic');
    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }
    res.json(stack);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stack', error });
  }
};

// Create stack
export const createStack = async (req: Request, res: Response) => {
  try {
    const { components, ...stackData } = req.body;

    // Verify all nootropics exist
    for (const component of components) {
      const nootropic = await Nootropic.findById(component.nootropic);
      if (!nootropic) {
        return res.status(400).json({ message: `Nootropic with ID ${component.nootropic} not found` });
      }
    }

    const stack = new Stack({
      ...stackData,
      components
    });

    await stack.save();
    res.status(201).json(stack);
  } catch (error) {
    res.status(400).json({ message: 'Error creating stack', error });
  }
};

// Update stack
export const updateStack = async (req: Request, res: Response) => {
  try {
    const { components, ...stackData } = req.body;

    if (components) {
      // Verify all nootropics exist
      for (const component of components) {
        const nootropic = await Nootropic.findById(component.nootropic);
        if (!nootropic) {
          return res.status(400).json({ message: `Nootropic with ID ${component.nootropic} not found` });
        }
      }
    }

    const stack = await Stack.findByIdAndUpdate(
      req.params.id,
      { ...stackData, components },
      { new: true }
    ).populate('components.nootropic');

    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }

    res.json(stack);
  } catch (error) {
    res.status(400).json({ message: 'Error updating stack', error });
  }
};

// Rate stack
export const rateStack = async (req: Request, res: Response) => {
  try {
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const stack = await Stack.findById(req.params.id);
    if (!stack) {
      return res.status(404).json({ message: 'Stack not found' });
    }

    stack.addRating(rating, review);
    await stack.save();

    res.json(stack);
  } catch (error) {
    res.status(400).json({ message: 'Error rating stack', error });
  }
}; 