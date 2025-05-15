
import { CreditCard, Bitcoin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-secondary-foreground">
        <p>&copy; {new Date().getFullYear()} ComboExpress88. Todos los derechos reservados.</p>
        
        <div className="mt-4">
          <p className="font-medium flex items-center justify-center">
             <CreditCard className="mr-2 h-4 w-4 text-primary" /> Métodos de Pago:
          </p>
          <p>Transferencia Bancaria (USD) y Zelle (USD).</p>
          <p className="flex items-center justify-center mt-1">
            <Bitcoin className="mr-2 h-4 w-4 text-primary" /> Criptomonedas (USDT, ETH, BTC, etc.):
          </p>
          <p className="text-xs">Red: BSC (BEP20)</p>
          <p className="text-xs break-all">Wallet: 0x7d3a432442Ca595b2Cc3Eb22e24f36833802B067</p>
        </div>
        <p className="mt-4">
          <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a> | 
          <a href="#" className="hover:text-primary transition-colors"> Términos de Servicio</a>
        </p>
      </div>
    </footer>
  );
}

