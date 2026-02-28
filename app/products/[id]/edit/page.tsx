'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import EditProductForm from '@/components/edit-product-form';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';
import { Product } from '@/types/product';

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center gap-4">
              <AlertCircle className="w-12 h-12 text-destructive" />
              <div>
                <h2 className="font-semibold text-lg mb-2">Product Not Found</h2>
                <p className="text-muted-foreground mb-4">{error || 'The product you are looking for does not exist.'}</p>
                <Link href="/" className="text-primary hover:underline">
                  Return to Products
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/products/${productId}`} className="flex items-center gap-2 text-primary hover:underline mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">Edit Product</h1>
          <p className="text-lg text-muted-foreground">Update product information for: {product.title}</p>
        </div>

        {/* Form */}
        <EditProductForm productId={productId} initialProduct={product} />
      </div>
    </main>
  );
}
