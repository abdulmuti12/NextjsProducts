'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export default function ProductPagination({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage,
}: ProductPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Jangan tampilkan pagination jika hanya ada 1 halaman atau kurang
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate the sliding window for page numbers
  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  // Adjust startPage if we're near the end
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="flex items-center gap-2"
      >
        <ChevronLeft size={18} />
        Previous
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {Array.from({ length: endPage - startPage + 1 }).map((_, i) => {
          const pageNum = startPage + i;
          return (
            <Button
              key={pageNum}
              variant={currentPage === pageNum ? 'default' : 'outline'}
              onClick={() => {
                onPageChange(pageNum);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-10 h-10"
            >
              {pageNum}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        onClick={handleNext}
        disabled={currentPage >= totalPages}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight size={18} />
      </Button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
}
