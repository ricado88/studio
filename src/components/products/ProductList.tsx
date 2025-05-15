"use client";

import type { Product } from '@/types';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';
import { products as allProducts } from '@/data/products';
import { useEffect, useState } from 'react';

interface ProductListProps {
  initialProducts?: Product[]; // Allow passing initial products for SSR/SSG or specific views
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts || allProducts);

  useEffect(() => {
    const category = searchParams.get('category');
    const tags = searchParams.getAll('tags');
    const searchTerm = searchParams.get('search');

    let currentProducts = initialProducts || allProducts;

    if (category && category !== 'all') {
      currentProducts = currentProducts.filter(p => p.category === category);
    }

    if (tags.length > 0) {
      currentProducts = currentProducts.filter(p => 
        tags.every(tag => p.tags?.includes(tag))
      );
    }
    
    if (searchTerm) {
      currentProducts = currentProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(currentProducts);
  }, [searchParams, initialProducts]);

  if (filteredProducts.length === 0) {
    return <p className="text-center text-lg text-muted-foreground col-span-full">No se encontraron productos que coincidan con tus filtros.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
