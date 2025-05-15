
"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card className="flex flex-col overflow-hidden h-full group transition-all duration-300 ease-in-out hover:shadow-xl">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              data-ai-hint={product.dataAiHint || "product image"}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Link href={`/products/${product.id}`} className="block">
          <CardTitle className="text-lg font-semibold mb-1 hover:text-primary transition-colors">{product.name}</CardTitle>
        </Link>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-2">{product.description}</CardDescription>
        <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={() => addToCart(product)} 
          className="w-full"
          aria-label={`Añadir ${product.name} al carrito`}
          disabled={product.stock === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
        </Button>
      </CardFooter>
       {product.stock > 0 && product.stock < 10 && (
            <p className="text-xs text-destructive px-4 pb-2">¡Sólo quedan {product.stock} unidades!</p>
        )}
        {product.stock === 0 && (
            <p className="text-xs text-destructive px-4 pb-2">Este producto está actualmente agotado.</p>
        )}
    </Card>
  );
}
