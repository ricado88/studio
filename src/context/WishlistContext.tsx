
"use client";

import type { Product } from '@/types';
import React, { createContext, useContext, useReducer, ReactNode, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WishlistState {
  itemIds: string[];
}

interface WishlistContextProps extends WishlistState {
  toggleWishlist: (productId: string, productName?: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

type WishlistAction =
  | { type: 'TOGGLE_ITEM'; payload: { productId: string } }
  | { type: 'SET_WISHLIST'; payload: string[] };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      const existingIndex = state.itemIds.indexOf(action.payload.productId);
      if (existingIndex > -1) {
        // Remove item
        return {
          ...state,
          itemIds: state.itemIds.filter(id => id !== action.payload.productId),
        };
      } else {
        // Add item
        return {
          ...state,
          itemIds: [...state.itemIds, action.payload.productId],
        };
      }
    }
    case 'SET_WISHLIST':
      return { ...state, itemIds: action.payload };
    default:
      return state;
  }
};

const WISHLIST_STORAGE_KEY = 'comboexpress88_wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { itemIds: [] });
  const { toast } = useToast();

  useEffect(() => {
    const storedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (storedWishlist) {
      try {
        const parsedWishlist = JSON.parse(storedWishlist);
        if (Array.isArray(parsedWishlist)) {
          dispatch({ type: 'SET_WISHLIST', payload: parsedWishlist });
        }
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage", error);
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.itemIds));
  }, [state.itemIds]);

  const isProductInWishlist = useCallback((productId: string): boolean => {
    return state.itemIds.includes(productId);
  }, [state.itemIds]);

  const toggleWishlist = (productId: string, productName?: string) => {
    const wasInWishlist = isProductInWishlist(productId);
    dispatch({ type: 'TOGGLE_ITEM', payload: { productId } });
    
    if (productName) {
      if (wasInWishlist) {
        toast({
          title: "Eliminado de Favoritos",
          description: `${productName} ha sido eliminado de tu lista de deseos.`,
          duration: 2000,
        });
      } else {
        toast({
          title: "Añadido a Favoritos",
          description: `${productName} ha sido añadido a tu lista de deseos.`,
          duration: 2000,
        });
      }
    }
  };
  
  const wishlistCount = state.itemIds.length;

  return (
    <WishlistContext.Provider
      value={{
        itemIds: state.itemIds,
        toggleWishlist,
        isProductInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextProps => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
