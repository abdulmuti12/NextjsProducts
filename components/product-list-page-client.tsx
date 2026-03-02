'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/product-grid';
import ProductPagination from '@/components/product-pagination';
import ProductSearch from '@/components/product-search';
import ProductFilters from '@/components/product-filters';
import ProductSort from '@/components/product-sort';
import { Product } from '@/types/product';
import type { SortOption } from '@/services/products';

interface ProductListPageClientProps {
  initialCategories: string[];
  initialProducts: Product[];
  initialTotal: number;
  initialPage: number;
  initialSearch: string;
  initialCategory: string;
  initialSort: SortOption;
}

export default function ProductListPageClient({
  initialCategories,
  initialProducts,
  initialTotal,
  initialPage,
  initialSearch,
  initialCategory,
  initialSort,
}: ProductListPageClientProps) {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    const params = new URLSearchParams();
    if (query) params.set('search', query);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleClearSearch = () => {
    setIsSearching(false);
    router.push('/');
  };

  const handleCategoryChange = (category: string | null) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handleSortChange = (sort: SortOption) => {
    const params = new URLSearchParams();
    if (initialSearch) params.set('search', initialSearch);
    if (initialCategory) params.set('category', initialCategory);
    params.set('sort', sort);
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams();
    if (initialSearch) params.set('search', initialSearch);
    if (initialCategory) params.set('category', initialCategory);
    if (initialSort !== 'newest') params.set('sort', initialSort);
    params.set('page', page.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Search Bar */}
      <ProductSearch
        onSearch={handleSearch}
        onClear={handleClearSearch}
        isSearching={isSearching}
      />

      {/* Category Filters */}
      <ProductFilters
        selectedCategory={initialCategory || null}
        onCategoryChange={handleCategoryChange}
        categories={initialCategories}
        isLoading={false}
      />

      {/* Sort Controls */}
      {initialProducts.length > 0 && (
        <div className="mb-8 flex justify-end">
          <ProductSort
            sortBy={initialSort}
            onSortChange={handleSortChange}
            isLoading={false}
          />
        </div>
      )}

      {/* Products Grid */}
      {initialProducts.length > 0 ? (
        <>
          <ProductGrid products={initialProducts} />

          {/* Pagination */}
          <div className="mt-12">
            <ProductPagination
              currentPage={initialPage}
              onPageChange={handlePageChange}
              totalItems={initialTotal}
              itemsPerPage={30}
            />
          </div>
        </>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground text-lg">
            {initialSearch
              ? `No products found for "${initialSearch}"`
              : 'No products found'}
          </p>
        </div>
      )}
    </>
  );
}
