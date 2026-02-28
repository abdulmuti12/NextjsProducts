'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption = 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest';

interface ProductSortProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  isLoading?: boolean;
}

export default function ProductSort({
  sortBy,
  onSortChange,
  isLoading = false,
}: ProductSortProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-foreground">
        Sort by:
      </label>
      <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)} disabled={isLoading}>
        <SelectTrigger id="sort" className="w-48">
          <SelectValue placeholder="Select sort option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="title-asc">Title: A to Z</SelectItem>
          <SelectItem value="title-desc">Title: Z to A</SelectItem>
          <SelectItem value="price-asc">Price: Low to High</SelectItem>
          <SelectItem value="price-desc">Price: High to Low</SelectItem>
          <SelectItem value="rating-desc">Rating: Highest First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
