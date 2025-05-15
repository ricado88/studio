import type { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags?: string[];
  stock: number;
  dataAiHint?: string; 
}

export interface Category {
  id: string;
  name: string;
  icon?: LucideIcon;
  imageUrl?: string;
  imageHint?: string;
}

export interface CartItemType extends Product {
  quantity: number;
}

export interface ProductRecommendation {
  productId: string;
  reason: string;
}
