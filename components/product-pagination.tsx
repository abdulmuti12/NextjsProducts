'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  onPageChange,
}: ProductPaginationProps) {
  const MAX_PAGES = 4; // 30 items per page, ~120 total products from API

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < MAX_PAGES) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
        {Array.from({ length: Math.min(5, MAX_PAGES) }).map((_, i) => {
          const pageNum = i + 1;
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
        disabled={currentPage >= MAX_PAGES}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight size={18} />
      </Button>

      {/* Page Info */}
      <div className="ml-4 text-sm text-muted-foreground">
        Page {currentPage} of {MAX_PAGES}
      </div>
    </div>
  );
}
