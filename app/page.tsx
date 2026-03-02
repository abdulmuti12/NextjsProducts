import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductListPageClient from "@/components/product-list-page-client";
import { getAllCategories, getFilteredProducts } from "@/services/products";
import type { Metadata } from "next";
import type { Product } from "@/types/product";

const ITEMS_PER_PAGE = 30;

type SortKey = "newest" | "oldest" | "price_asc" | "price_desc"; // sesuaikan dengan service kamu

type SearchParams = {
  page?: string;
  search?: string;
  category?: string;
  sort?: SortKey;
};

type ProductsResponse = {
  products: Product[];
  total: number;
};

export const metadata: Metadata = {
  title: "Products | Store",
  description: "Browse our collection of quality products",
};

export default async function Home(props: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await props.searchParams;

  const page = Number.parseInt(sp.page ?? "1", 10) || 1;
  const search = sp.search ?? "";
  const category = sp.category ?? "";
  const sort: SortKey = sp.sort ?? "newest";

  let categories: string[] = [];
  let products: ProductsResponse = { products: [], total: 0 };
  let error: string | null = null;

  try {
    [categories, products] = await Promise.all([
      getAllCategories(),
      getFilteredProducts(page, search || undefined, category || undefined, sort),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load data";
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">Products</h1>
            <p className="text-lg text-muted-foreground">
              Browse our collection of quality products
            </p>
          </div>

          <Button asChild className="gap-2">
            <Link href="/add">
              <Plus className="h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>

        {error && (
          <div className="mb-8 rounded-lg border border-destructive bg-destructive/10 p-6">
            <p className="font-semibold text-destructive">Error: {error}</p>
          </div>
        )}

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