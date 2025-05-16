
import { categories, products as allProducts } from '@/data/products';
import CategoryCard from '@/components/products/CategoryCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSlider from '@/components/ui/HeroSlider';
import ProductCarousel from '@/components/ui/ProductCarousel'; // Importar el nuevo carrusel

export default function HomePage() {
  const heroSlides = [
    { src: 'https://placehold.co/1200x500.png', alt: 'Promoción Especial Supermercado', dataAiHint: 'grocery sale' },
    { src: 'https://placehold.co/1200x500.png', alt: 'Productos Frescos de Temporada', dataAiHint: 'fresh produce' },
    { src: 'https://placehold.co/1200x500.png', alt: 'Nuevos Combos Disponibles', dataAiHint: 'food bundles' },
    { src: 'https://placehold.co/1200x500.png', alt: 'Entrega Rápida y Segura', dataAiHint: 'delivery service' },
  ];

  // Seleccionar algunos productos para el carrusel (ej. los primeros 8)
  const carouselProducts = allProducts.slice(0, 8);

  return (
    <div className="space-y-12">
      <section className="relative rounded-lg overflow-hidden">
        <HeroSlider slides={heroSlides} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 p-4 pointer-events-none">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Bienvenido a ComboExpress88
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-md sm:max-w-2xl mx-auto drop-shadow-md">
              Tu supermercado online con los mejores productos frescos, combos y más. ¡Directo a tu puerta!
            </p>
            <Link href="/products" passHref className="pointer-events-auto">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base sm:text-lg">
                Ver Todos los Productos
              </Button>
            </Link>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-8 text-center">Nuestras Categorías</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Nueva sección de carrusel de productos */}
      <ProductCarousel products={carouselProducts} title="Nuestros Productos" />

      <section className="text-center py-12">
         <h2 className="text-3xl font-semibold mb-8">Ofertas Destacadas</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Oferta que se mantiene */}
            <div className="p-6 border rounded-lg shadow-md bg-card">
                <h3 className="text-xl font-bold text-primary mb-2">Combo oferta Especial</h3>
                <p className="text-muted-foreground mb-4">¡Todo lo que necesitas para tu semana con un descuento especial!</p>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Ver Oferta</Button>
            </div>
            {/* Las otras dos ofertas han sido eliminadas */}
         </div>
      </section>
    </div>
  );
}
