import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = ["Racetams", "Adaptogens", "Cholinergics", "Vitamins", "Minerals"];
const benefits = ["Memory", "Focus", "Mood", "Energy", "Anxiety Relief"];

export const FilterSidebar = () => {
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
                  <Checkbox id={category} />
                  <label htmlFor={category} className="text-sm">
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="benefits">
          <AccordionTrigger className="text-sm font-medium">Benefits</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center space-x-2">
                  <Checkbox id={benefit} />
                  <label htmlFor={benefit} className="text-sm">
                    {benefit}
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