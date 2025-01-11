import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";
import { api, Nootropic } from '@/lib/api';
import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

interface CreateStackDialogProps {
  onStackCreate: (stack: {
    name: string;
    description: string;
    components: Array<{
      nootropic: string;
      dosage?: {
        amount: number;
        unit: string;
      };
      timing?: string;
    }>;
    benefits: string[];
    warnings: string[];
    instructions?: string;
  }) => Promise<void>;
}

export const CreateStackDialog = ({ onStackCreate }: CreateStackDialogProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [benefits, setBenefits] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');
  const [components, setComponents] = useState<Array<{
    nootropic: string;
    dosage?: { amount: number; unit: string };
    timing?: string;
  }>>([]);
  const [availableNootropics, setAvailableNootropics] = useState<Nootropic[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [currentWarning, setCurrentWarning] = useState('');

  useEffect(() => {
    const fetchNootropics = async () => {
      try {
        const nootropics = await api.nootropics.getAll();
        setAvailableNootropics(nootropics);
      } catch (error) {
        console.error('Failed to fetch nootropics:', error);
      }
    };
    fetchNootropics();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || components.length === 0) return;

    setLoading(true);
    try {
      await onStackCreate({
        name,
        description,
        components,
        benefits,
        warnings,
        instructions
      });
      setOpen(false);
      resetForm();
    } catch (error) {
      console.error('Failed to create stack:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setBenefits([]);
    setWarnings([]);
    setInstructions('');
    setComponents([]);
    setCurrentBenefit('');
    setCurrentWarning('');
  };

  const addComponent = () => {
    setComponents(prev => [...prev, { nootropic: '' }]);
  };

  const removeComponent = (index: number) => {
    setComponents(prev => prev.filter((_, i) => i !== index));
  };

  const updateComponent = (index: number, updates: Partial<typeof components[0]>) => {
    setComponents(prev => prev.map((comp, i) => 
      i === index ? { ...comp, ...updates } : comp
    ));
  };

  const addBenefit = () => {
    if (currentBenefit.trim()) {
      setBenefits(prev => [...prev, currentBenefit.trim()]);
      setCurrentBenefit('');
    }
  };

  const addWarning = () => {
    if (currentWarning.trim()) {
      setWarnings(prev => [...prev, currentWarning.trim()]);
      setCurrentWarning('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Stack</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Stack</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Stack Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter stack name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your stack"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>Components</Label>
            {components.map((component, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1 space-y-2">
                  <select
                    className="w-full p-2 border rounded"
                    value={component.nootropic}
                    onChange={(e) => updateComponent(index, { nootropic: e.target.value })}
                    required
                  >
                    <option value="">Select Nootropic</option>
                    {availableNootropics.map((nootropic) => (
                      <option key={nootropic.substanceName} value={nootropic.substanceName}>
                        {nootropic.substanceName}
                      </option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Amount"
                      value={component.dosage?.amount || ''}
                      onChange={(e) => updateComponent(index, {
                        dosage: { 
                          amount: Number(e.target.value),
                          unit: component.dosage?.unit || 'mg'
                        }
                      })}
                    />
                    <select
                      className="p-2 border rounded"
                      value={component.dosage?.unit || 'mg'}
                      onChange={(e) => updateComponent(index, {
                        dosage: {
                          amount: component.dosage?.amount || 0,
                          unit: e.target.value
                        }
                      })}
                    >
                      <option value="mg">mg</option>
                      <option value="g">g</option>
                      <option value="ml">ml</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Timing (e.g., Morning, With food)"
                    value={component.timing || ''}
                    onChange={(e) => updateComponent(index, { timing: e.target.value })}
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeComponent(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addComponent}>
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Benefits</Label>
            <div className="flex gap-2">
              <Input
                value={currentBenefit}
                onChange={(e) => setCurrentBenefit(e.target.value)}
                placeholder="Add a benefit"
              />
              <Button type="button" onClick={addBenefit}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {benefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="inline-flex items-center">
                  <Badge variant="secondary">
                    {benefit}
                    <button
                      type="button"
                      onClick={() => setBenefits(prev => prev.filter((_, i) => i !== index))}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Warnings</Label>
            <div className="flex gap-2">
              <Input
                value={currentWarning}
                onChange={(e) => setCurrentWarning(e.target.value)}
                placeholder="Add a warning"
              />
              <Button type="button" onClick={addWarning}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {warnings.map((warning, index) => (
                <div key={`warning-${index}`} className="inline-flex items-center">
                  <Badge variant="destructive">
                    {warning}
                    <button
                      type="button"
                      onClick={() => setWarnings(prev => prev.filter((_, i) => i !== index))}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="How to take this stack"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Stack'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};