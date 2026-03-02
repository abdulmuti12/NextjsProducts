import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button Skeleton */}
        <Skeleton className="h-6 w-32 mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-96 rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-20 w-full rounded" />
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-6">
            {/* Brand and Title */}
            <div>
              <Skeleton className="h-3 w-20 mb-3" />
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-8 w-full" />
            </div>

            {/* Rating */}
            <Skeleton className="h-5 w-40" />

            {/* Category Badges */}
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>

            {/* Price Card */}
            <div className="space-y-2 p-6 bg-muted rounded-lg">
              <Skeleton className="h-10 w-40" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Stock Status */}
            <Skeleton className="h-6 w-40" />

            {/* Description Card */}
            <div className="space-y-3 p-6 bg-muted rounded-lg">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-6 bg-muted rounded-lg">
                  <Skeleton className="h-3 w-16 mb-3" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>

            {/* Shipping/Warranty/Returns */}
            <div className="grid gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 p-3 bg-muted rounded-lg">
                  <Skeleton className="h-5 w-5 flex-shrink-0 rounded" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-40" />
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Skeleton className="flex-1 h-12 rounded-lg" />
              <Skeleton className="h-12 w-24 rounded-lg" />
              <Skeleton className="h-12 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
