
"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductRecommendations from '@/components/ai/ProductRecommendations';
import { ShoppingCart, CreditCard, Banknote, Mail, Send, Bitcoin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | undefined>(undefined);

  const paymentMethods = [
    {
      id: "bank_transfer",
      name: "Transferencia Bancaria (USD)",
      icon: <Banknote className="mr-2 h-5 w-5 text-primary" />,
      details: null,
    },
    {
      id: "zelle",
      name: "Zelle (USD)",
      icon: <Send className="mr-2 h-5 w-5 text-primary" />, 
      details: null,
    },
    {
      id: "crypto",
      name: "Criptomonedas (USDT, ETH, BTC, etc.)",
      icon: <Bitcoin className="mr-2 h-5 w-5 text-primary" />,
      details: (
        <div className="ml-7 mt-1 text-xs text-muted-foreground">
            Red: BSC (BEP20)<br />
            <span className="break-all">Wallet: 0x7d3a432442Ca595b2Cc3Eb22e24f36833802B067</span>
        </div>
      ),
    },
  ];

  const handleProceedToPayment = () => {
    if (!selectedPaymentMethod) {
      toast({
        title: 'Seleccione un Método de Pago',
        description: 'Por favor, elige un método de pago para continuar.',
        variant: 'destructive',
        duration: 3000,
      });
      return;
    }

    const selectedMethodDetails = paymentMethods.find(pm => pm.id === selectedPaymentMethod)?.name || 'Método no especificado';
    console.log('Order placed with items:', items);
    console.log('Total amount:', totalPrice.toFixed(2));
    console.log('Selected payment method:', selectedPaymentMethod, `(${selectedMethodDetails})`);

    toast({
      title: '¡Pedido Realizado con Éxito!',
      description: `Has seleccionado ${selectedMethodDetails}. Revisa tu correo para las instrucciones de pago. Una vez confirmado el pago, recibirás tu factura.`,
      duration: 6000,
    });

    // TODO: Implement actual order placement logic. This is a placeholder.
    // 1. Save the order details to a database (customer info, items, total price, order status: 'pending payment', selectedPaymentMethod).
    // 2. Send an email to the customer with detailed payment instructions for THE CHOSEN METHOD.
    //    This email should specify amounts, account details/wallet addresses, and how to notify the business once payment is made.
    //
    // LATER, AFTER MANUAL PAYMENT CONFIRMATION BY THE BUSINESS:
    // 3. Update the order status to 'paid' in the database.
    // 4. Generate the official invoice (potentially using a service or library).
    // 5. Send the invoice to the customer via email.
    // 6. Send a copy of the same invoice to combospress@gmail.com for business records.

    clearCart();
    setSelectedPaymentMethod(undefined);
  };

  return (
    <>
      {/* Hero Section - Full Width */}
      <section
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-[16/4] overflow-hidden"
      >
        <Image
          src="https://placehold.co/1200x300.png"
          alt="Carrito de compras con productos"
          fill
          priority
          className="z-0 object-cover"
          data-ai-hint="shopping items"
          sizes="100vw"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 p-4 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Tu Carrito de Compras
            </h1>
        </div>
      </section>

      {/* Main content */}
      <div className="mt-8 md:mt-12">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold mb-4">Tu carrito está vacío</h2>
            <p className="text-muted-foreground mb-8">Parece que no has añadido ningún producto todavía.</p>
            <Link href="/products" passHref>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Explorar Productos
              </Button>
            </Link>
          </div>
        ) : (
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
                    <span className="text-muted-foreground">Subtotal de Productos ({totalItems} {totalItems === 1 ? 'unidad' : 'unidades'})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span>Gratis</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <Separator className="my-4" />
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-md flex items-center">
                      <CreditCard className="mr-2 h-5 w-5 text-primary" />
                      Selecciona tu Método de Pago:
                    </h4>
                    <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div key={method.id}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={method.id} id={method.id} />
                            <Label htmlFor={method.id} className="flex items-center cursor-pointer text-sm">
                              {method.icon}
                              {method.name}
                            </Label>
                          </div>
                          {method.details && selectedPaymentMethod === method.id && (
                            <div className="pl-7 pt-1"> {method.details} </div>
                          )}
                          {method.details && method.id === "crypto" && selectedPaymentMethod !== "crypto" && (
                            <div className="pl-7 pt-1 text-xs text-muted-foreground opacity-70 hover:opacity-100 transition-opacity"> {method.details} </div>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mt-3 flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-primary" />
                      Recibirás tu factura por correo electrónico.
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Al proceder al pago, recibirás las instrucciones para completar tu orden según el método elegido.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button 
                    size="lg" 
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={handleProceedToPayment}
                    disabled={!selectedPaymentMethod}
                  >
                    Proceder al Pago
                  </Button>
                  <Button variant="outline" onClick={clearCart} className="w-full text-destructive border-destructive hover:bg-destructive/10 hover:text-destructive-foreground">
                    Vaciar Carrito
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        <ProductRecommendations maxRecommendations={3} />
      </div>
    </>
  );
}
