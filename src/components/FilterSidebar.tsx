import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { api } from "@/lib/api";

interface FilterSidebarProps {
  onCategoryChange: (categories: string[]) => void;
}

export const FilterSidebar = ({ onCategoryChange }: FilterSidebarProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const nootropics = await api.nootropics.getAll();
        const uniqueCategories = Array.from(
          new Set(
            nootropics.flatMap(nootropic => nootropic.category)
          )
        ).sort();
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category];
      onCategoryChange(newCategories);
      return newCategories;
    });
  };

  if (loading) {
    return (
      <aside className="w-64 p-6 border-r min-h-screen">
        <h2 className="text-lg font-semibold mb-6">Filters</h2>
        <div>Loading categories...</div>
      </aside>
    );
  }

  return (
    <aside className="w-64 p-6 border-r min-h-screen">
      <h2 className="text-lg font-semibold mb-6">Filters</h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-medium">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <label htmlFor={category} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};