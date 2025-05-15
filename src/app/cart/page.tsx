
"use client";

import { useCart } from '@/context/CartContext';
import CartItem from '@/components/cart/CartItem';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ProductRecommendations from '@/components/ai/ProductRecommendations'; // For AI recommendations on cart page
import { ShoppingCart, CreditCard, Banknote, Mail, Send, Bitcoin } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast'; // Import useToast

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { toast } = useToast(); // Initialize useToast

  const handleProceedToPayment = () => {
    // Simulate placing the order
    console.log('Order placed with items:', items);
    console.log('Total amount:', totalPrice.toFixed(2));
    // More items for logging if needed:
    // console.log('Customer details (if available):', /* customer data */);

    toast({
      title: '¡Pedido Realizado con Éxito!',
      description: 'Revisa tu correo para las instrucciones de pago. Una vez confirmado el pago, recibirás tu factura.',
      duration: 6000, // Slightly longer duration for important info
    });

    // TODO: Implement actual order placement logic.
    // 1. Save the order details to a database (customer info, items, total price, order status: 'pending payment').
    // 2. Send an email to the customer with detailed payment instructions for the chosen method (Bank Transfer, Zelle, Crypto).
    //    This email should specify amounts, account details/wallet addresses, and how to notify the business once payment is made.
    //
    // LATER, AFTER MANUAL PAYMENT CONFIRMATION BY THE BUSINESS:
    // 3. Update the order status to 'paid' in the database.
    // 4. Generate the official invoice (e.g., using the InvoiceTemplate component with actual order data, possibly converting it to PDF).
    // 5. Send the invoice (e.g., as a PDF attachment or a secure link) to the customer via email.
    // 6. Send a copy of the same invoice to combospress@gmail.com for business records.
    //    Steps 2, 5, and 6 (email sending) require a backend service (e.g., Firebase Functions with an email provider like SendGrid, Resend, or Nodemailer).

    // Clear the cart after successful "order placement"
    clearCart();

    // Optionally, redirect to an order confirmation page (this page would need to be created)
    // import { useRouter } from 'next/navigation';
    // const router = useRouter();
    // router.push('/order-confirmation?orderId=...');
  };

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
                <span className="text-muted-foreground">Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
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
              <Separator className="my-4" />
              <div>
                <h4 className="font-semibold mb-3 text-md flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Métodos de Pago Aceptados:
                </h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li className="flex items-center">
                    <Banknote className="mr-2 h-4 w-4 text-primary" />
                    Transferencia Bancaria (USD)
                  </li>
                  <li className="flex items-center">
                    <Send className="mr-2 h-4 w-4 text-primary" />
                    Zelle (USD)
                  </li>
                  <li className="flex items-start">
                    <Bitcoin className="mr-2 h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>
                      Criptomonedas (USDT, ETH, BTC, etc.)<br />
                      <span className="text-xs">Red: BSC (BEP20)</span><br />
                      <span className="text-xs break-all">Wallet: 0x7d3a432442Ca595b2Cc3Eb22e24f36833802B067</span>
                    </span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mt-3 flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-primary" />
                  Recibirás tu factura por correo electrónico.
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Al proceder al pago, recibirás las instrucciones para completar tu orden.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button 
                size="lg" 
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleProceedToPayment} // Added onClick handler
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
      <ProductRecommendations maxRecommendations={3} />
    </div>
  );
}
