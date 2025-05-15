"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { totalItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  
  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/products', label: 'Productos' },
    // Add more links as needed, e.g., offers, contact
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="hsl(var(--primary))"/>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fontWeight="bold" fill="hsl(var(--primary-foreground))">CE</text>
          </svg>
          <span className="text-xl font-bold text-primary">ComboExpress88</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <Input 
              type="search" 
              placeholder="Buscar productos..." 
              className="h-9 w-40 lg:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="sm" variant="ghost" aria-label="Buscar">
              <Search className="h-5 w-5" />
            </Button>
          </form>
          
          <Link href="/cart" passHref>
            <Button variant="outline" size="icon" aria-label="Carrito de compras">
              <ShoppingCart className="h-5 w-5" />
              {isMounted && totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map(link => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  ))}
                   <form onSubmit={handleSearch} className="flex flex-col gap-2 mt-4">
                    <Input 
                      type="search" 
                      placeholder="Buscar productos..." 
                      className="h-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button type="submit" variant="default">Buscar</Button>
                  </form>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
