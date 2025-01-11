import { useState, useCallback } from 'react';
import { Input } from "@/components/ui/input";
import { api } from '@/lib/api';
import debounce from 'lodash/debounce';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (onSearch) {
        onSearch(searchQuery);
      }
    }, 300),
    [onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="w-full max-w-xl">
      <Input
        type="text"
        placeholder="Search nootropics..."
        value={query}
        onChange={handleSearch}
        className="w-full px-4 py-2 text-lg"
      />
    </div>
  );
};