import { Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-secondary-foreground">
        <p>&copy; {new Date().getFullYear()} ComboExpress88. Todos los derechos reservados.</p>
        <div className="mt-4">
          <p>Contáctanos:</p>
          <p>
            Email: <a href="mailto:combospress@gmail.com" className="hover:text-primary transition-colors">combospress@gmail.com</a>
          </p>
          <p>
            Teléfono: <a href="tel:+5354423736" className="hover:text-primary transition-colors">+53 54423736</a>
          </p>
        </div>
        <div className="mt-4 flex justify-center items-center space-x-4">
          <a 
            href="https://www.facebook.com/share/16Ps1cE95j/" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Facebook de ComboExpress88"
            className="text-secondary-foreground hover:text-primary transition-colors"
          >
            <Facebook size={24} />
          </a>
        </div>
        <p className="mt-4">
          <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a> | 
          <a href="#" className="hover:text-primary transition-colors"> Términos de Servicio</a>
        </p>
      </div>
    </footer>
  );
}
