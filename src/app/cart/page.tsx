"use client";

import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductRecommendations from '@/components/ai/ProductRecommendations'; // For AI recommendations on cart page
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-8">Parece que no has añadido ningún producto todavía.</p>
        <Link href="/products" passHref>
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Explorar Productos
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Tu Carrito de Compras</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Resumen del Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span>Gratis</span> {/* Or calculate shipping */}
              </div>
              <hr />
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Proceder al Pago
              </Button>
              <Button variant="outline" onClick={clearCart} className="w-full text-destructive border-destructive hover:bg-destructive/10">
                Vaciar Carrito
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <ProductRecommendations maxRecommendations={3} />
    </div>
  );
}
