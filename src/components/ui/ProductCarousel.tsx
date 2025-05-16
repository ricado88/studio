
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Product } from '@/types';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCarouselProps {
  products: Product[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
  title?: string;
}

const ITEMS_PER_PAGE_CONFIG = {
  base: 1, // Items for smallest screens (cols-1)
  sm: 2,   // Items for sm and up (sm:grid-cols-2)
  md: 3,   // Items for md and up (md:grid-cols-3)
  lg: 4    // Items for lg and up (lg:grid-cols-4) - Default for larger
};

export default function ProductCarousel({
  products,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  title
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentItemsPerPage, setCurrentItemsPerPage] = useState(ITEMS_PER_PAGE_CONFIG.lg);
  
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setCurrentItemsPerPage(ITEMS_PER_PAGE_CONFIG.base);      
      else if (width < 768) setCurrentItemsPerPage(ITEMS_PER_PAGE_CONFIG.sm); 
      else if (width < 1024) setCurrentItemsPerPage(ITEMS_PER_PAGE_CONFIG.md); 
      else setCurrentItemsPerPage(ITEMS_PER_PAGE_CONFIG.lg);             
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);
  
  const totalPages = Math.ceil(products.length / currentItemsPerPage);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages);
  }, [totalPages]);

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex);
  };

  useEffect(() => {
    if (!autoPlay || products.length === 0 || totalPages <= 1) {
        return;
    }
    const intervalId = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(intervalId);
  }, [autoPlay, autoPlayInterval, products.length, totalPages, goToNext, currentIndex]);

  if (!products || products.length === 0) {
    return null;
  }
  
  const getGridColsClass = () => {
    // Ensure Tailwind can purge these classes by not making them fully dynamic strings
    if (currentItemsPerPage === 1) return 'grid-cols-1';
    if (currentItemsPerPage === 2) return 'grid-cols-1 sm:grid-cols-2';
    if (currentItemsPerPage === 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
    if (currentItemsPerPage >= 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
    return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'; // Fallback
  };

  return (
    <section className={cn("py-8 group", className)}>
      {title && <h2 className="text-3xl font-semibold mb-8 text-center">{title}</h2>}
      <div className="relative">
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-in-out" // Increased duration for smoother slide
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div key={pageIndex} className="flex-shrink-0 w-full px-1">
                <div className={cn(
                  "grid gap-4 md:gap-6",
                   getGridColsClass()
                  )}>
                  {products.slice(pageIndex * currentItemsPerPage, (pageIndex * currentItemsPerPage) + currentItemsPerPage).map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 -left-2 sm:-left-4 transform -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/70 hover:bg-background/90 text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              onClick={goToPrevious}
              aria-label="Previous products"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute top-1/2 -right-2 sm:-right-4 transform -translate-y-1/2 z-20 h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-background/70 hover:bg-background/90 text-foreground opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
              onClick={goToNext}
              aria-label="Next products"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
          </>
        )}
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => goToPage(index)}
              className={cn(
                "h-2.5 w-2.5 rounded-full transition-all duration-300",
                currentIndex === index ? "bg-primary w-5" : "bg-muted hover:bg-primary/50"
              )}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
