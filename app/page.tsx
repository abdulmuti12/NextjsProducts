'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductGrid from '@/components/product-grid';
import ProductPagination from '@/components/product-pagination';
import ProductSearch from '@/components/product-search';
import ProductFilters from '@/components/product-filters';
import ProductSort, { type SortOption } from '@/components/product-sort';
import { Product } from '@/types/product';
import { Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 30;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [totalItems, setTotalItems] = useState(0);

  // Map sort options to API parameters
  const getSortParams = (sort: SortOption) => {
    const sortMap: Record<SortOption, { sortBy: string; order: 'asc' | 'desc' }> = {
      'newest': { sortBy: 'id', order: 'desc' },
      'title-asc': { sortBy: 'title', order: 'asc' },
      'title-desc': { sortBy: 'title', order: 'desc' },
      'price-asc': { sortBy: 'price', order: 'asc' },
      'price-desc': { sortBy: 'price', order: 'desc' },
      'rating-desc': { sortBy: 'rating', order: 'desc' },
    };
    return sortMap[sort];
  };

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        const categoryNames = Array.isArray(data) ? data : [];
        setCategories(categoryNames);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Select only essential fields for better performance
        const selectFields = 'id,title,price,category,images,brand,discountPercentage,rating,stock,thumbnail';
        
        // Get sort parameters
        const { sortBy: apiSortBy, order } = getSortParams(sortBy);
        
        let url: string;
        if (searchQuery) {
          // Search endpoint with select parameter and sorting
          url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&select=${selectFields}&sortBy=${apiSortBy}&order=${order}`;
        } else if (selectedCategory) {
          // Category filter endpoint with select parameter and sorting
          url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${ITEMS_PER_PAGE}&skip=${(currentPage - 1) * ITEMS_PER_PAGE}&select=${selectFields}&sortBy=${apiSortBy}&order=${order}`;
        } else {
          // Regular pagination endpoint with select parameter and sorting
          const skip = (currentPage - 1) * ITEMS_PER_PAGE;
          url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}&select=${selectFields}&sortBy=${apiSortBy}&order=${order}`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) throw new Error('Failed to fetch products');
        
        const data = await response.json();
        setProducts(data.products || []);
        setTotalItems(data.total || 0);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setProducts([]);
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
    };

    fetchProducts();
  }, [currentPage, searchQuery, selectedCategory, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setIsSearching(true);
    setSelectedCategory(null);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setSearchQuery('');
  };



  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Products</h1>
            <p className="text-lg text-muted-foreground">Browse our collection of quality products</p>
          </div>
          <Link href="/add">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <ProductSearch 
          onSearch={handleSearch} 
          onClear={handleClearSearch}
          isSearching={isSearching}
        />

        {/* Category Filters */}
        <ProductFilters 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          categories={categories}
          isLoading={loading}
        />

        {/* Sort Controls */}
        {!loading && !error && products.length > 0 && (
          <div className="mb-8 flex justify-end">
            <ProductSort 
              sortBy={sortBy} 
              onSortChange={setSortBy}
              isLoading={loading}
            />
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 mb-8">
            <p className="text-destructive font-semibold">Error: {error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <>
            <ProductGrid products={products} />
            
            {/* Pagination */}
            <div className="mt-12">
              <ProductPagination 
                currentPage={currentPage} 
                onPageChange={setCurrentPage}
                totalItems={totalItems}
                itemsPerPage={ITEMS_PER_PAGE}
              />
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-muted-foreground text-lg">
              {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
