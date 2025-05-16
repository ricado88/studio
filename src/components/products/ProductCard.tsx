
"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext'; // Import useWishlist
import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isProductInWishlist } = useWishlist(); // Use wishlist context

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation if heart is on top of link area
    e.stopPropagation();
    toggleWishlist(product.id, product.name);
  };

  const productIsFavorite = isProductInWishlist(product.id);

  return (
    <Card className="flex flex-col overflow-hidden h-full group transition-all duration-300 ease-in-out hover:shadow-xl">
      <CardHeader className="p-0 relative"> {/* Added relative for heart positioning */}
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
        <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-9 w-9 rounded-full bg-background/70 hover:bg-background/90 z-10 ${productIsFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
            onClick={handleWishlistToggle}
            aria-label={productIsFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            title={productIsFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        >
            <Heart className={`h-5 w-5 transition-colors duration-200 ${productIsFavorite ? 'fill-red-500' : 'fill-transparent'}`} />
        </Button>
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
