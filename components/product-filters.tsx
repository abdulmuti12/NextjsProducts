'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ProductFiltersProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  isLoading?: boolean;
}

export default function ProductFilters({
  selectedCategory,
  onCategoryChange,
  categories,
  isLoading = false,
}: ProductFiltersProps) {
  return (
    <div className="mb-8 p-6 bg-card border border-border rounded-lg">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {/* All Categories Button */}
            <Button
              variant={selectedCategory === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(null)}
              disabled={isLoading}
              className="transition-colors"
            >
              All Categories
            </Button>

            {/* Category Buttons */}
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => onCategoryChange(category)}
                disabled={isLoading}
                className="transition-colors"
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Active Filter Badge */}
        {selectedCategory && (
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xs text-muted-foreground">Active Filter:</span>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
              {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              <button
                onClick={() => onCategoryChange(null)}
                className="hover:opacity-75 transition-opacity"
                aria-label="Clear filter"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
