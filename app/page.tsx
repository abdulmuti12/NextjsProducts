import Link from 'next/link';
import { Suspense } from 'react';
import ProductGrid from '@/components/product-grid';
import ProductPagination from '@/components/product-pagination';
import ProductSearch from '@/components/product-search';
import ProductFilters from '@/components/product-filters';
import ProductSort from '@/components/product-sort';
import ProductListPageClient from '@/components/product-list-page-client';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAllCategories, getFilteredProducts } from '@/services/products';
import { Metadata } from 'next';

const ITEMS_PER_PAGE = 30;

export const metadata: Metadata = {
  title: 'Products | Store',
  description: 'Browse our collection of quality products',
};

export default async function Home(props: {
  searchParams: Promise<{ page?: string; search?: string; category?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1', 10);
  const search = searchParams.search || '';
  const category = searchParams.category || '';
  const sort = (searchParams.sort || 'newest') as any;

  let categories: string[] = [];
  let products: any = { products: [], total: 0 };
  let error: string | null = null;

  try {
    // Fetch categories and products in parallel
    [categories, products] = await Promise.all([
      getAllCategories(),
      getFilteredProducts(page, search || undefined, category || undefined, sort),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load data';
    categories = [];
    products = { products: [], total: 0 };
  }



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

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive rounded-lg p-6 mb-8">
            <p className="text-destructive font-semibold">Error: {error}</p>
          </div>
        )}

        {/* Client-side interactive components */}
        <ProductListPageClient
          initialCategories={categories}
          initialProducts={products.products}
          initialTotal={products.total}
          initialPage={page}
          initialSearch={search}
          initialCategory={category}
          initialSort={sort}
        />
      </div>
    </main>
  );
}
