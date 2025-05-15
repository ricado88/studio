
import InvoiceTemplate from '@/components/invoice/InvoiceTemplate';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Sample Data for preview purposes, you might fetch this dynamically in a real app
const sampleInvoiceData = {
  invoiceId: "INV-2024-001",
  invoiceDate: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
  dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
  companyName: "ComboExpress88",
  companyAddressLines: [
    "Calle Ficticia 123, Oficina 4B",
    "Ciudad Ejemplo, Provincia Ejemplo, CP 00000",
    "País Imaginario",
  ],
  companyEmail: "combospress@gmail.com",
  companyPhone: "+53 54423736",
  customerName: "Ana García Rodriguez",
  customerAddressLines: [
    "Avenida Principal 456, Apto 10C",
    "Otra Ciudad, Otra Provincia, CP 54321",
  ],
  customerEmail: "ana.garcia@example.com",
  items: [
    { id: "combo001", description: "Combo Familiar Completo (Carnes, Vegetales, Bebidas)", quantity: 1, unitPrice: 49.99, total: 49.99 },
    { id: "fruit001", description: "Manzanas Frescas (1kg)", quantity: 2, unitPrice: 3.99, total: 7.98 },
    { id: "bev001", description: "Jugo de Naranja Natural (1L)", quantity: 4, unitPrice: 4.99, total: 19.96 },
  ],
  subtotal: 77.93,
  taxRate: 0.08, // 8% tax
  taxAmount: 6.2344, // Will be recalculated in component if only rate is given
  shipping: 10.00,
  totalAmount: 94.1644, // Will be recalculated in component
  notes: "Por favor, verifique los productos al momento de la entrega.\nLas entregas se realizan de Lunes a Sábado de 9am a 5pm.",
  paymentTerms: "Pago contra entrega o transferencia previa.",
  paymentInstructions: {
    bankTransfer: {
        accountName: "ComboExpress88 Inversiones S.L.",
        accountNumber: "ES00 1234 5678 9012 3456 7890",
        bankName: "Banco Ficticio Internacional",
        swiftCode: "BFICESMMXXX",
    },
    zelle: "pagos@comboexpress88.com",
    crypto: {
        walletAddress: "0x7d3a432442Ca595b2Cc3Eb22e24f36833802B067",
        network: "BSC (BEP20)",
        acceptedCoins: "USDT, ETH, BTC, USDC"
    }
  }
};


export default function InvoicePreviewPage() {
  return (
    <div className="min-h-screen bg-muted/20 py-8 print:bg-white print:py-0">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex justify-between items-center print:hidden">
          <Link href="/" passHref>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Volver al Inicio
            </Button>
          </Link>
          <Button onClick={() => typeof window !== 'undefined' && window.print()}>
            Imprimir / Guardar como PDF
          </Button>
        </div>
        <InvoiceTemplate data={sampleInvoiceData} />
      </div>
    </div>
  );
}
