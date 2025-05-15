"use client";

import type { CartItemType, Product } from '@/types';
import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  items: CartItemType[];
}

interface CartContextProps extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItemType[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.product.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.product.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload.product, quantity: action.payload.quantity }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.productId),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.productId
            ? { ...item, quantity: Math.max(0, action.payload.quantity) } // Prevent negative quantity
            : item
        ).filter(item => item.quantity > 0), // Remove if quantity is 0
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

const CART_STORAGE_KEY = 'comboexpress88_cart';

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          dispatch({ type: 'SET_CART', payload: parsedCart });
        }
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    toast({
      title: "Producto añadido",
      description: `${product.name} ha sido añadido al carrito.`,
      duration: 3000,
    });
  };

  const removeFromCart = (productId: string) => {
    const item = state.items.find(i => i.id === productId);
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    if (item) {
      toast({
        title: "Producto eliminado",
        description: `${item.name} ha sido eliminado del carrito.`,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Carrito vaciado",
      description: "Todos los productos han sido eliminados del carrito.",
      variant: "destructive",
      duration: 3000,
    });
  };

  const getItemQuantity = (productId: string): number => {
    const item = state.items.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
