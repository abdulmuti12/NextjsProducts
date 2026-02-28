import { Product } from '@/types/product';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image Container */}
      <div className="relative h-48 bg-muted overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            loading="eager"
            className="object-cover hover:scale-105 transition-transform duration-300"
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
          <Badge className="absolute top-3 right-3 bg-destructive">
            -{product.discountPercentage.toFixed(0)}%
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        {/* Brand */}
        <div className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-2">
          {product.brand}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 text-sm mb-2">
          {product.title}
        </h3>

        {/* Category */}
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-xs capitalize">
            {product.category}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.round(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-muted-foreground'
                }
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground ml-1">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col justify-between pb-4">
        {/* Price */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-foreground">
              ${discountedPrice}
            </span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Stock Status */}
        <div className="text-xs mb-4">
          {product.stock > 0 ? (
            <span className="text-green-600 font-semibold">In Stock ({product.stock})</span>
          ) : (
            <span className="text-destructive font-semibold">Out of Stock</span>
          )}
        </div>

        {/* Detail Product Button */}
        <Link href={`/products/${product.id}`}>
          <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-medium text-sm flex items-center justify-center gap-2 transition-colors">
            <ArrowRight size={16} />
            Detail Product
          </button>
        </Link>
      </CardContent>
    </Card>
  );
}
