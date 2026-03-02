import { Product } from '@/types/product';

const BASE_URL = 'https://dummyjson.com';

interface FetchOptions {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

interface CategoriesResponse extends Array<string> {}

// Fetch products with optional filtering and pagination
export async function fetchProducts(
  params: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    sortBy?: string;
    order?: 'asc' | 'desc';
  } = {},
  options: FetchOptions = {}
): Promise<ProductsResponse> {
  const {
    page = 1,
    limit = 30,
    search,
    category,
    sortBy = 'id',
    order = 'desc',
  } = params;

  const selectFields =
    'id,title,price,category,images,brand,discountPercentage,rating,stock,thumbnail';

  let url = '';

  if (search) {
    // Search endpoint doesn't support pagination, returns all matching results
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&select=${selectFields}&sortBy=${sortBy}&order=${order}`;
  } else if (category) {
    // Category endpoint supports pagination
    const skip = (page - 1) * limit;
    url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}&select=${selectFields}&sortBy=${sortBy}&order=${order}`;
  } else {
    // Regular products endpoint with pagination
    const skip = (page - 1) * limit;
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}&select=${selectFields}&sortBy=${sortBy}&order=${order}`;
  }

  const defaultOptions: FetchOptions = {
    next: {
      revalidate: 60, // ISR: revalidate every 60 seconds
      tags: ['products'],
    },
  };

  const response = await fetch(url, {
    ...defaultOptions,
    ...options,
    next: {
      ...defaultOptions.next,
      ...options.next,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data;
}

// Fetch all categories
export async function fetchCategories(
  options: FetchOptions = {}
): Promise<string[]> {
  const defaultOptions: FetchOptions = {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['categories'],
    },
  };

  const response = await fetch(`${BASE_URL}/products/category-list`, {
    ...defaultOptions,
    ...options,
    next: {
      ...defaultOptions.next,
      ...options.next,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }

  const data: string[] = await response.json();
  return data;
}

// Fetch single product by ID
export async function fetchProductById(
  id: string | number,
  options: FetchOptions = {}
): Promise<Product> {
  const defaultOptions: FetchOptions = {
    next: {
      revalidate: 60, // ISR: revalidate every 60 seconds
      tags: [`product-${id}`],
    },
  };

  const response = await fetch(`${BASE_URL}/products/${id}`, {
    ...defaultOptions,
    ...options,
    next: {
      ...defaultOptions.next,
      ...options.next,
    },
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Product not found');
    }
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }

  const data: Product = await response.json();
  return data;
}

// Fetch multiple products for static generation
export async function fetchProductsForStaticParams(
  limit: number = 50,
  options: FetchOptions = {}
): Promise<Product[]> {
  const defaultOptions: FetchOptions = {
    next: {
      revalidate: 3600,
      tags: ['products-static'],
    },
  };

  const response = await fetch(`${BASE_URL}/products?limit=${limit}`, {
    ...defaultOptions,
    ...options,
    next: {
      ...defaultOptions.next,
      ...options.next,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`);
  }

  const data: ProductsResponse = await response.json();
  return data.products;
}

// Delete product (for API route usage)
export async function deleteProduct(id: string | number): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.statusText}`);
  }
}
