'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';

interface ProductSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  isSearching: boolean;
}

export default function ProductSearch({ onSearch, onClear, isSearching }: ProductSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    } else {
      // If search input is empty, clear the search and show all products
      handleClear();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
  };

  return (
    <form onSubmit={handleSearch} className="w-full mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search products by name, brand, category..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 pr-24 border border-input rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <button
          type="submit"
          disabled={isSearching}
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
