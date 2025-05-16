
"use client";

import Link from 'next/link';
import { ShoppingCart, Search, Menu, LogInIcon, UserPlusIcon, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react'; // MapPin añadido
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
    { href: '/delivery-zones', label: 'Zonas de Entrega', icon: <MapPin className="mr-2 h-4 w-4 inline md:hidden" /> }, // Nuevo enlace
    // { href: '/offers', label: 'Ofertas' }, // Example
    // { href: '/contact', label: 'Contacto' }, // Example
  ];

  const authLinks = [
    { href: '/login', label: 'Iniciar Sesión', icon: <LogInIcon className="mr-2 h-4 w-4 inline" /> },
    { href: '/register', label: 'Registrarse', icon: <UserPlusIcon className="mr-2 h-4 w-4 inline" /> },
  ];

  const socialLinks = [
    { 
      href: "https://www.facebook.com/share/16Ps1cE95j/", 
      label: "Facebook", 
      icon: <Facebook size={20} className="text-primary" />, 
      ariaLabel: "Facebook de ComboExpress88" 
    },
    { 
      href: "https://www.instagram.com/combospress/profilecard/?igsh=dHYzc2dvY3JpODc5", 
      label: "Instagram", 
      icon: <Instagram size={20} className="text-primary" />, 
      ariaLabel: "Instagram de ComboExpress88" 
    },
  ];

  const contactEmail = "combospress@gmail.com";
  const contactPhone = "+5354423736";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          {/* SVG Logo Placeholder */}
          <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="20" fill="hsl(var(--primary))"/>
            <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fontWeight="bold" fill="hsl(var(--primary-foreground))">CE</text>
          </svg>
          <span className="text-xl font-bold text-primary">ComboExpress88</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <Input 
              type="search" 
              placeholder="Buscar productos..." 
              className="h-9 w-32 lg:w-56"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" size="sm" variant="ghost" aria-label="Buscar" className="h-9 w-9 p-0">
              <Search className="h-5 w-5" />
            </Button>
          </form>
          
          <div className="hidden md:flex items-center gap-1">
            {authLinks.map(link => (
               <Link key={link.href} href={link.href} passHref>
                <Button variant="ghost" size="sm" className="text-sm font-medium text-foreground/70 hover:text-foreground px-2">
                  {link.icon}
                  {link.label}
                </Button>
              </Link>
            ))}
            {socialLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
                className="hover:text-primary/70 transition-colors p-2" 
              >
                {link.icon}
              </a>
            ))}
             <div className="hidden md:flex items-center gap-1 ml-2 text-xs text-foreground/60">
                <a href={`mailto:${contactEmail}`} className="hover:text-primary transition-colors flex items-center p-1" title={contactEmail}>
                    <Mail className="h-4 w-4 mr-1 text-primary" />
                    <span>Email</span>
                </a>
                <span className="opacity-50 mx-1">|</span>
                <a href={`tel:${contactPhone}`} className="hover:text-primary transition-colors flex items-center p-1" title={contactPhone}>
                    <Phone className="h-4 w-4 mr-1 text-primary" />
                    <span>Teléfono</span>
                </a>
            </div>
          </div>
          
          <Link href="/cart" passHref>
            <Button variant="outline" size="icon" aria-label="Carrito de compras" className="relative h-9 w-9">
              <ShoppingCart className="h-5 w-5" />
              {isMounted && totalItems > 0 && (
                <Badge variant="destructive" className="absolute -top-1.5 -right-1.5 h-4.5 w-4.5 p-0 flex items-center justify-center text-xs rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                <nav className="flex flex-col gap-3 mt-8">
                  {navLinks.map(link => (
                    <Link key={`mobile-${link.href}`} href={link.href} className="text-base font-medium hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-muted flex items-center">
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2"/>
                  {authLinks.map(link => (
                     <Link key={`mobile-${link.href}`} href={link.href} className="text-base font-medium hover:text-primary transition-colors py-2 px-2 rounded-md hover:bg-muted flex items-center">
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                  <hr className="my-2"/>
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Síguenos:</p>
                    <div className="flex gap-4">
                      {socialLinks.map(link => (
                        <a
                          key={`mobile-${link.href}`}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={link.ariaLabel}
                          className="hover:text-primary/70 transition-colors" // Color ya aplicado al icono
                        >
                          {link.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                  <hr className="my-2"/>
                  <div className="px-2 py-2">
                    <p className="text-sm font-medium text-muted-foreground mb-2">Contáctanos:</p>
                    <a href={`mailto:${contactEmail}`} className="flex items-center text-sm text-primary hover:text-primary/70 transition-colors py-1">
                      <Mail className="mr-2 h-4 w-4" />
                      {contactEmail}
                    </a>
                    <a href={`tel:${contactPhone}`} className="flex items-center text-sm text-primary hover:text-primary/70 transition-colors py-1 mt-1">
                      <Phone className="mr-2 h-4 w-4" />
                      {contactPhone}
                    </a>
                  </div>
                   <form onSubmit={handleSearch} className="flex flex-col gap-2 mt-4 px-2">
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

