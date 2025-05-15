
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  invoiceId: string;
  invoiceDate: string;
  dueDate?: string;
  companyName: string;
  companyAddressLines: string[];
  companyEmail?: string;
  companyPhone?: string;
  customerName: string;
  customerAddressLines: string[];
  customerEmail?: string;
  items: InvoiceItem[];
  subtotal: number;
  taxRate?: number; // e.g., 0.07 for 7%
  taxAmount?: number;
  shipping?: number;
  totalAmount: number;
  notes?: string;
  paymentTerms?: string;
  paymentInstructions?: {
    bankTransfer?: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      swiftCode?: string;
    };
    zelle?: string;
    crypto?: {
      walletAddress: string;
      network: string;
      acceptedCoins: string;
    };
  };
}

interface InvoiceTemplateProps {
  data: InvoiceData;
}

// Sample Data for preview purposes
const sampleInvoiceData: InvoiceData = {
  invoiceId: "INV-2024-001",
  invoiceDate: new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
  dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' }),
  companyName: "ComboExpress88",
  companyAddressLines: [
    "Calle Ficticia 123",
    "Ciudad Ejemplo, CP 00000",
    "País Imaginario",
  ],
  companyEmail: "combospress@gmail.com",
  companyPhone: "+53 54423736",
  customerName: "Juan Pérez",
  customerAddressLines: [
    "Avenida Siempre Viva 742",
    "Springfield, CP 12345",
  ],
  customerEmail: "juan.perez@example.com",
  items: [
    { id: "1", description: "Combo Familiar", quantity: 1, unitPrice: 49.99, total: 49.99 },
    { id: "2", description: "Jugo de Naranja Natural (1L)", quantity: 2, unitPrice: 4.99, total: 9.98 },
    { id: "3", description: "Filete de Res Premium", quantity: 0.5, unitPrice: 19.99, total: 10.00 },
  ],
  subtotal: 69.97,
  taxRate: 0.10, // 10% tax
  taxAmount: 6.997,
  shipping: 5.00,
  totalAmount: 81.967,
  notes: "Gracias por su compra. Esperamos verle pronto.",
  paymentTerms: "Pago a 15 días.",
  paymentInstructions: {
    bankTransfer: {
        accountName: "ComboExpress88 SA",
        accountNumber: "123-456-789",
        bankName: "Banco Ejemplo",
    },
    zelle: "combospress@gmail.com",
    crypto: {
        walletAddress: "0x7d3a432442Ca595b2Cc3Eb22e24f36833802B067",
        network: "BSC (BEP20)",
        acceptedCoins: "USDT, ETH, BTC"
    }
  }
};


export default function InvoiceTemplate({ data = sampleInvoiceData }: InvoiceTemplateProps) {
  const calculatedTaxAmount = data.taxRate ? data.subtotal * data.taxRate : (data.taxAmount || 0);
  const calculatedTotal = data.subtotal + calculatedTaxAmount + (data.shipping || 0);

  return (
    <Card className="w-full max-w-4xl mx-auto my-8 shadow-xl print:shadow-none print:border-none">
      <CardHeader className="bg-muted/30 p-6 print:bg-transparent">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            {/* Placeholder for Logo */}
            <div className="flex items-center gap-2 mb-2">
                <svg width="40" height="40" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100" height="100" rx="20" fill="hsl(var(--primary))"/>
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="40" fontWeight="bold" fill="hsl(var(--primary-foreground))">CE</text>
                </svg>
                <h1 className="text-3xl font-bold text-primary">{data.companyName}</h1>
            </div>
            {data.companyAddressLines.map((line, idx) => (
              <p key={idx} className="text-sm text-muted-foreground">{line}</p>
            ))}
            {data.companyEmail && <p className="text-sm text-muted-foreground">Email: {data.companyEmail}</p>}
            {data.companyPhone && <p className="text-sm text-muted-foreground">Tel: {data.companyPhone}</p>}
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-3xl font-semibold uppercase text-primary">Factura</h2>
            <p className="text-muted-foreground">Número: <span className="font-medium text-foreground">{data.invoiceId}</span></p>
            <p className="text-muted-foreground">Fecha: <span className="font-medium text-foreground">{data.invoiceDate}</span></p>
            {data.dueDate && <p className="text-muted-foreground">Vencimiento: <span className="font-medium text-foreground">{data.dueDate}</span></p>}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-1 text-primary">Facturar a:</h3>
            <p className="font-medium text-foreground">{data.customerName}</p>
            {data.customerAddressLines.map((line, idx) => (
              <p key={idx} className="text-sm text-muted-foreground">{line}</p>
            ))}
            {data.customerEmail && <p className="text-sm text-muted-foreground">Email: {data.customerEmail}</p>}
          </div>
          {/* Optional Ship To section can be added here if different */}
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Descripción</TableHead>
              <TableHead className="text-right">Cantidad</TableHead>
              <TableHead className="text-right">Precio Unit.</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end mt-8">
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal:</span>
              <span className="font-medium">${data.subtotal.toFixed(2)}</span>
            </div>
            {(data.taxRate || data.taxAmount) && (
                <div className="flex justify-between">
                    <span className="text-muted-foreground">
                        Impuestos {data.taxRate ? `(${(data.taxRate * 100).toFixed(0)}%)` : ''}:
                    </span>
                    <span className="font-medium">${calculatedTaxAmount.toFixed(2)}</span>
                </div>
            )}
            {data.shipping && (
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío:</span>
                    <span className="font-medium">${data.shipping.toFixed(2)}</span>
                </div>
            )}
            <Separator />
            <div className="flex justify-between text-xl font-bold text-primary">
              <span>Total:</span>
              <span>${calculatedTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        {(data.notes || data.paymentTerms || data.paymentInstructions) && <Separator className="my-8" />}

        {data.paymentTerms && (
            <div className="mb-4">
                <h4 className="font-semibold mb-1 text-primary">Términos de Pago:</h4>
                <p className="text-sm text-muted-foreground">{data.paymentTerms}</p>
            </div>
        )}

        {data.paymentInstructions && (
          <div className="mb-4">
            <h4 className="font-semibold mb-1 text-primary">Instrucciones de Pago:</h4>
            {data.paymentInstructions.bankTransfer && (
              <div className="text-sm text-muted-foreground mb-2">
                <strong>Transferencia Bancaria:</strong><br />
                Beneficiario: {data.paymentInstructions.bankTransfer.accountName}<br />
                Número de Cuenta: {data.paymentInstructions.bankTransfer.accountNumber}<br />
                Banco: {data.paymentInstructions.bankTransfer.bankName}<br />
                {data.paymentInstructions.bankTransfer.swiftCode && `SWIFT/BIC: ${data.paymentInstructions.bankTransfer.swiftCode}`}
              </div>
            )}
            {data.paymentInstructions.zelle && (
              <div className="text-sm text-muted-foreground mb-2">
                <strong>Zelle:</strong> {data.paymentInstructions.zelle}
              </div>
            )}
            {data.paymentInstructions.crypto && (
              <div className="text-sm text-muted-foreground">
                <strong>Criptomonedas:</strong><br />
                Dirección: {data.paymentInstructions.crypto.walletAddress}<br />
                Red: {data.paymentInstructions.crypto.network}<br />
                Aceptadas: {data.paymentInstructions.crypto.acceptedCoins}
              </div>
            )}
          </div>
        )}

        {data.notes && (
          <div>
            <h4 className="font-semibold mb-1 text-primary">Notas Adicionales:</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-line">{data.notes}</p>
          </div>
        )}

      </CardContent>
      <CardFooter className="p-6 text-center text-xs text-muted-foreground border-t print:hidden">
        <p>Si tiene alguna pregunta sobre esta factura, por favor contacte a {data.companyName} | Email: {data.companyEmail} | Tel: {data.companyPhone}</p>
      </CardFooter>
    </Card>
  );
}
