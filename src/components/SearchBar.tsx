import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        className="pl-10 pr-4 py-6 text-lg rounded-2xl border-2 border-gray-200 focus:border-primary"
        placeholder="Search nootropics..."
        type="search"
      />
    </div>
  );
};