import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="space-y-3">
      {/* Image */}
      <Skeleton className="w-full aspect-square rounded-lg" />
      
      {/* Brand */}
      <Skeleton className="h-3 w-24" />
      
      {/* Title */}xq
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      
      {/* Rating */}
      <Skeleton className="h-4 w-32" />
      
      {/* Price */}
      <div className="space-y-2 pt-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}
