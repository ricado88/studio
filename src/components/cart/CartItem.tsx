"use client";

import type { CartItemType } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus } from 'lucide-react';
import Link from 'next/link';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    const quantity = Math.max(0, Math.min(item.stock, newQuantity));
    if (quantity === 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, quantity);
    }
  };

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <Link href={`/products/${item.id}`} className="flex-shrink-0">
        <div className="relative h-20 w-20 rounded-md overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
            data-ai-hint={item.dataAiHint || "cart item"}
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`}>
         <h3 className="font-semibold text-lg hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} cada uno</p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min="1"
          max={item.stock}
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
          className="w-16 h-10 text-center"
          aria-label={`Cantidad de ${item.name}`}
        />
        <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.quantity + 1)} disabled={item.quantity >= item.stock}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-destructive hover:text-destructive/80">
        <X className="h-5 w-5" />
        <span className="sr-only">Eliminar {item.name} del carrito</span>
      </Button>
    </div>
  );
}
