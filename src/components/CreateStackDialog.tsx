import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface CreateStackDialogProps {
  onStackCreate: (stack: {
    name: string;
    components: string[];
    benefits: string[];
    description: string;
  }) => void;
}

export const CreateStackDialog = ({ onStackCreate }: CreateStackDialogProps) => {
  const [name, setName] = useState("");
  const [components, setComponents] = useState("");
  const [benefits, setBenefits] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStackCreate({
      name,
      components: components.split(",").map(c => c.trim()),
      benefits: benefits.split(",").map(b => b.trim()),
      description,
    });
    setOpen(false);
    // Reset form
    setName("");
    setComponents("");
    setBenefits("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-6">Create New Stack</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Stack</DialogTitle>
            <DialogDescription>
              Create your own nootropic stack. Add components, benefits, and a description.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Stack Name</label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter stack name"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="components">Components (comma-separated)</label>
              <Input
                id="components"
                value={components}
                onChange={(e) => setComponents(e.target.value)}
                placeholder="e.g., Caffeine, L-Theanine, Alpha GPC"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="benefits">Benefits (comma-separated)</label>
              <Input
                id="benefits"
                value={benefits}
                onChange={(e) => setBenefits(e.target.value)}
                placeholder="e.g., Focus, Energy, Memory"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description">Description</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your stack..."
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Stack</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};