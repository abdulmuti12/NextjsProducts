import { getProductDetails } from '@/services/products';
import { fetchProductsForStaticParams } from '@/lib/api';
import { ProductDetailContent } from '@/components/product-detail-content';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  
  try {
    const product = await getProductDetails(params.id);
    return {
      title: `${product.title} | Store`,
      description: product.description.substring(0, 160),
      openGraph: {
        images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found | Store',
    };
  }
}

export async function generateStaticParams() {
  try {
    const products = await fetchProductsForStaticParams(50);
    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductDetailPage(props: PageProps) {
  const params = await props.params;

  let product = null;
  let error: string | null = null;

  try {
    product = await getProductDetails(params.id);
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load product';
    if (error === 'Product not found') {
      notFound();
    }
  }

  if (error || !product) {
    notFound();
  }

  return <ProductDetailContent product={product} />;
}
