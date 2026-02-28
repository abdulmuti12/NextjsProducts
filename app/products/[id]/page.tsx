'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ArrowLeft, Truck, RotateCcw, Shield, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Product } from '@/types/product';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch(`https://dummyjson.com/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setShowDeleteConfirm(false);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
              </div>
              <Link href="/">
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2">
                  <ArrowLeft size={16} />
                  Back to Products
                </button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const discountedPrice = (product.price * (1 - product.discountPercentage / 100)).toFixed(2);
  const averageRating = Math.round(product.rating);

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link href="/">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6 font-medium">
            <ArrowLeft size={18} />
            Back to Products
          </button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  loading="eager"
                  className="object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22100%22 height=%22100%22/%3E%3Ctext x=%2250%22 y=%2250%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2214%22 fill=%22%23999%22%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
              {product.discountPercentage > 0 && (
                <Badge className="absolute top-4 right-4 bg-destructive text-lg py-2 px-3">
                  -{product.discountPercentage.toFixed(0)}%
                </Badge>
              )}
            </div>

            {/* Additional Images Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative h-20 bg-muted rounded overflow-hidden">
                    <Image
                      src={image}
                      alt={`${product.title} - ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-6">
            {/* Brand and Title */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.title}
              </h1>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={
                      i < averageRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating.toFixed(1)} out of 5
              </span>
              {product.reviews && (
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              )}
            </div>

            {/* Category Badge */}
            <div className="flex gap-2 flex-wrap">
              <Badge variant="outline" className="text-sm capitalize py-1 px-3">
                {product.category}
              </Badge>
              {product.tags && product.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs py-1 px-2">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Price Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-foreground">
                      ${discountedPrice}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-xl text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.discountPercentage > 0 && (
                    <p className="text-sm text-green-600 font-semibold">
                      You save ${(product.price - parseFloat(discountedPrice)).toFixed(2)}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <Badge className="bg-green-100 text-green-800">In Stock</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>
              )}
              <span className="text-sm text-muted-foreground">
                {product.stock} items available
              </span>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-foreground">Description</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </CardContent>
            </Card>

            {/* Product Information Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-xs text-muted-foreground uppercase font-semibold mb-2">
                    SKU
                  </div>
                  <p className="font-medium text-foreground">{product.sku}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-xs text-muted-foreground uppercase font-semibold mb-2">
                    Weight
                  </div>
                  <p className="font-medium text-foreground">{product.weight} g</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-xs text-muted-foreground uppercase font-semibold mb-2">
                    Availability Status
                  </div>
                  <p className="font-medium text-foreground">{product.availabilityStatus}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-xs text-muted-foreground uppercase font-semibold mb-2">
                    Min Order Qty
                  </div>
                  <p className="font-medium text-foreground">{product.minimumOrderQuantity}</p>
                </CardContent>
              </Card>
            </div>

            {/* Warranty & Shipping Info */}
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Truck size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-foreground">Shipping</p>
                  <p className="text-xs text-muted-foreground">{product.shippingInformation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <Shield size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-foreground">Warranty</p>
                  <p className="text-xs text-muted-foreground">{product.warrantyInformation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                <RotateCcw size={18} className="text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm text-foreground">Return Policy</p>
                  <p className="text-xs text-muted-foreground">{product.returnPolicy}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end">
              <Link href={`/products/${productId}/edit`}>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </Link>

              <Button
                variant="destructive"
                className="gap-2"
                onClick={() => setShowDeleteConfirm(true)}
                disabled={isDeleting}
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            </div>
            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
              <Card className="border-destructive bg-destructive/5 mt-6">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">Delete Product</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Are you sure you want to delete this product? This action cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <Button
                          variant="destructive"
                          onClick={handleDelete}
                          disabled={isDeleting}
                          className="gap-2"
                        >
                          {isDeleting ? 'Deleting...' : 'Delete Product'}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={isDeleting}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mt-12 pt-8 border-t">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Customer Reviews</h2>
            <div className="grid gap-4">
              {product.reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {review.reviewerName}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
