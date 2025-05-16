
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products as allProducts } from '@/data/products';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext'; // Import useWishlist
import { ChevronLeft, ShoppingCart, Star, Heart } from 'lucide-react'; // Added Heart
import Link from 'next/link';
import ProductRecommendations from '@/components/ai/ProductRecommendations';
import { Badge } from '@/components/ui/badge';

const VIEWING_HISTORY_KEY = 'comboexpress88_viewing_history';
const MAX_HISTORY_ITEMS = 10;

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isProductInWishlist } = useWishlist(); // Use wishlist context
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [viewHistoryTrigger, setViewHistoryTrigger] = useState<string[]>([]);

  const productId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (productId) {
      const foundProduct = allProducts.find(p => p.id === productId);
      setProduct(foundProduct || null);

      const storedHistory = localStorage.getItem(VIEWING_HISTORY_KEY);
      let historyArray: string[] = [];
      if (storedHistory) {
        try {
          const parsed = JSON.parse(storedHistory);
          if (Array.isArray(parsed)) {
            historyArray = parsed;
          } else {
            console.warn('Viewing history in localStorage (ProductDetailPage) was malformed. Resetting.');
            localStorage.removeItem(VIEWING_HISTORY_KEY);
          }
        } catch (e) { 
          console.error("Error parsing viewing history from localStorage (ProductDetailPage):", e);
          localStorage.removeItem(VIEWING_HISTORY_KEY); 
        }
      }
      
      const newHistory = [productId, ...historyArray.filter(id => id !== productId)].slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(VIEWING_HISTORY_KEY, JSON.stringify(newHistory));
      setViewHistoryTrigger([productId]); 
    }
  }, [productId]);

  if (!product) {
    return (
        <div className="text-center py-10">
            <p className="text-xl text-muted-foreground">Producto no encontrado.</p>
            <Link href="/products" passHref>
                <Button variant="link" className="mt-4 text-primary">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Productos
                </Button>
            </Link>
        </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product.id, product.name);
  };

  const productIsFavorite = isProductInWishlist(product.id);

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/products" passHref>
        <Button variant="outline" className="mb-8">
          <ChevronLeft className="mr-2 h-4 w-4" /> Volver a Productos
        </Button>
      </Link>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            data-ai-hint={product.dataAiHint || "product detail"}
          />
        </div>
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary flex-grow pr-4">{product.name}</h1>
            <Button
                variant="ghost"
                size="icon"
                className={`h-10 w-10 rounded-full flex-shrink-0 ${productIsFavorite ? 'text-red-500' : 'text-muted-foreground hover:text-red-400'}`}
                onClick={handleWishlistToggle}
                aria-label={productIsFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                title={productIsFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            >
                <Heart className={`h-6 w-6 transition-colors duration-200 ${productIsFavorite ? 'fill-red-500' : 'fill-transparent'}`} />
            </Button>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">{tag}</Badge>
              ))}
            </div>
          )}
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <p className="text-4xl font-extrabold text-foreground">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
            <Star className="h-5 w-5 text-gray-300" />
            <span className="text-sm text-muted-foreground">(123 reseñas)</span>
          </div>

          <div className="flex items-center space-x-4">
            <label htmlFor="quantity" className="font-medium">Cantidad:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-20 rounded-md border border-input px-3 py-2 text-center"
            />
          </div>
          <Button 
            size="lg" 
            onClick={handleAddToCart} 
            className="w-full md:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={product.stock === 0}
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" /> {product.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
          </Button>
          {product.stock > 0 && product.stock < 10 && (
            <p className="text-sm text-destructive">¡Sólo quedan {product.stock} unidades!</p>
          )}
           {product.stock === 0 && (
            <p className="text-sm text-destructive">Este producto está actualmente agotado.</p>
          )}
        </div>
      </div>
      <ProductRecommendations currentProductId={product.id} maxRecommendations={3} triggerViewHistoryProductIds={viewHistoryTrigger} />
    </div>
  );
}
