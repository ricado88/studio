import type { Category, Product } from '@/types';
import { Package, Beef, Apple, Milk, GlassWater } from 'lucide-react';

export const categories: Category[] = [
  { id: 'combos', name: 'Combos', icon: Package, imageHint: 'gift basket' },
  { id: 'meats', name: 'Carnes', icon: Beef, imageHint: 'raw meat' },
  { id: 'fruits-vegetables', name: 'Frutas y Vegetales', icon: Apple, imageHint: 'fresh produce' },
  { id: 'dairy-eggs', name: 'Lácteos y Huevos', icon: Milk, imageHint: 'dairy products' },
  { id: 'beverages', name: 'Bebidas', icon: GlassWater, imageHint: 'assorted drinks' },
];

export const products: Product[] = [
  // Combos
  {
    id: 'combo001',
    name: 'Combo Familiar',
    description: 'Un surtido completo para toda la familia.',
    price: 49.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'food hamper',
    category: 'combos',
    stock: 10,
    tags: ['popular'],
  },
  {
    id: 'combo002',
    name: 'Combo Desayuno',
    description: 'Todo lo necesario para un desayuno energético.',
    price: 24.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'breakfast set',
    category: 'combos',
    stock: 15,
  },
  // Meats
  {
    id: 'meat001',
    name: 'Filete de Res Premium',
    description: 'Corte de res de primera calidad, tierno y jugoso.',
    price: 19.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'beef steak',
    category: 'meats',
    stock: 20,
  },
  {
    id: 'meat002',
    name: 'Pechuga de Pollo Fresca',
    description: 'Pechugas de pollo sin hueso y sin piel.',
    price: 9.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'chicken breast',
    category: 'meats',
    stock: 30,
    tags: ['gluten-free'],
  },
  // Fruits & Vegetables
  {
    id: 'fruit001',
    name: 'Manzanas Frescas (1kg)',
    description: 'Manzanas rojas crujientes y dulces.',
    price: 3.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'red apples',
    category: 'fruits-vegetables',
    stock: 50,
    tags: ['organic'],
  },
  {
    id: 'veg001',
    name: 'Tomates Maduros (1kg)',
    description: 'Tomates perfectos para ensaladas y salsas.',
    price: 2.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ripe tomatoes',
    category: 'fruits-vegetables',
    stock: 40,
  },
  // Dairy & Eggs
  {
    id: 'dairy001',
    name: 'Leche Entera (1L)',
    description: 'Leche fresca pasteurizada.',
    price: 1.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'milk carton',
    category: 'dairy-eggs',
    stock: 60,
  },
  {
    id: 'dairy002',
    name: 'Huevos Grandes (Docena)',
    description: 'Docena de huevos frescos de granja.',
    price: 3.49,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'egg carton',
    category: 'dairy-eggs',
    stock: 45,
    tags: ['gluten-free'],
  },
  // Beverages
  {
    id: 'bev001',
    name: 'Jugo de Naranja Natural (1L)',
    description: 'Jugo 100% natural sin azúcares añadidos.',
    price: 4.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'orange juice',
    category: 'beverages',
    stock: 25,
    tags: ['organic', 'gluten-free'],
  },
  {
    id: 'bev002',
    name: 'Agua Mineral (1.5L)',
    description: 'Agua mineral natural de manantial.',
    price: 1.29,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'water bottle',
    category: 'beverages',
    stock: 100,
  },
  {
    id: 'combo003',
    name: 'Combo Vegano',
    description: 'Selección de productos 100% veganos.',
    price: 35.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'vegan food',
    category: 'combos',
    stock: 8,
    tags: ['vegan', 'gluten-free']
  },
  {
    id: 'meat003',
    name: 'Salchichas Artesanales',
    description: 'Deliciosas salchichas hechas con recetas tradicionales.',
    price: 7.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'gourmet sausages',
    category: 'meats',
    stock: 22
  },
  {
    id: 'fruit002',
    name: 'Plátanos Canarias (manojo)',
    description: 'Plátanos dulces y nutritivos de Canarias.',
    price: 2.50,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'ripe bananas',
    category: 'fruits-vegetables',
    stock: 60
  },
  {
    id: 'dairy003',
    name: 'Queso Curado de Oveja',
    description: 'Queso intenso y aromático, perfecto para tablas.',
    price: 12.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'artisan cheese',
    category: 'dairy-eggs',
    stock: 18
  },
  {
    id: 'bev003',
    name: 'Refresco de Cola (Pack 6)',
    description: 'Pack de 6 latas de tu refresco de cola favorito.',
    price: 5.99,
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'soda cans',
    category: 'beverages',
    stock: 30
  }
];
