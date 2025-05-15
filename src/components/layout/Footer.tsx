export default function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container mx-auto px-4 py-8 text-center text-sm text-secondary-foreground">
        <p>&copy; {new Date().getFullYear()} ComboExpress88. Todos los derechos reservados.</p>
        <p className="mt-2">
          <a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a> | 
          <a href="#" className="hover:text-primary transition-colors"> Términos de Servicio</a>
        </p>
      </div>
    </footer>
  );
}
