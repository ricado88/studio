import { categories } from '@/data/products';
import CategoryCard from '@/components/products/CategoryCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Bienvenido a ComboExpress88
        </h1>
        <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
          Tu supermercado online con los mejores productos frescos, combos y más. ¡Directo a tu puerta!
        </p>
        <Link href="/products" passHref>
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
            Ver Todos los Productos
          </Button>
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestras Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Placeholder for featured products or special offers */}
      <section className="text-center py-12">
         <h2 className="text-3xl font-semibold mb-8">Ofertas Destacadas</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example offer cards */}
            <div className="p-6 border rounded-lg shadow-md bg-card">
                <h3 className="text-xl font-bold text-primary mb-2">Combo Ahorro Semanal</h3>
                <p className="text-muted-foreground mb-4">¡Todo lo que necesitas para tu semana con un descuento especial!</p>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Ver Oferta</Button>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-card">
                <h3 className="text-xl font-bold text-primary mb-2">Descuento en Lácteos</h3>
                <p className="text-muted-foreground mb-4">15% de descuento en todos nuestros productos lácteos.</p>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Ver Oferta</Button>
            </div>
            <div className="p-6 border rounded-lg shadow-md bg-card">
                <h3 className="text-xl font-bold text-primary mb-2">Frutas de Temporada</h3>
                <p className="text-muted-foreground mb-4">Las frutas más frescas y deliciosas de la temporada a precios increíbles.</p>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Ver Oferta</Button>
            </div>
         </div>
      </section>
    </div>
  );
}
