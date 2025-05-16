
"use client";

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext'; // Import WishlistProvider
import { Toaster } from "@/components/ui/toaster";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider> {/* Add WishlistProvider here */}
        {children}
        <Toaster />
      </WishlistProvider>
    </CartProvider>
  );
}
