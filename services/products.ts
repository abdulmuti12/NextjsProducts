import { fetchProducts, fetchCategories, fetchProductById } from '@/lib/api';

export type SortOption = 'newest' | 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'rating-desc';

interface SortParams {
  sortBy: string;
  order: 'asc' | 'desc';
}


export function getSortParams(sort: SortOption): SortParams {
  const sortMap: Record<SortOption, SortParams> = {
    newest: { sortBy: 'id', order: 'desc' },
    'title-asc': { sortBy: 'title', order: 'asc' },
    'title-desc': { sortBy: 'title', order: 'desc' },
    'price-asc': { sortBy: 'price', order: 'asc' },
    'price-desc': { sortBy: 'price', order: 'desc' },
    'rating-desc': { sortBy: 'rating', order: 'desc' },
  };
  return sortMap[sort];
}

/**
 * Fetch products with filters and sorting
 */
export async function getFilteredProducts(
  page: number = 1,
  search?: string,
  category?: string,
  sortBy: SortOption = 'newest'
) {
  const { sortBy: apiSortBy, order } = getSortParams(sortBy);

  return fetchProducts({
    page,
    limit: 30,
    search,
    category,
    sortBy: apiSortBy,
    order,
  });
}

export async function getAllCategories() {
  return fetchCategories();
}

/**
 * Fetch product details
 */
export async function getProductDetails(id: string | number) {
  return fetchProductById(id);
}
