
import { categories, products as allProducts } from '@/data/products';
import CategoryCard from '@/components/products/CategoryCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HeroSlider from '@/components/ui/HeroSlider';
import ProductCarousel from '@/components/ui/ProductCarousel'; // Importar el nuevo carrusel

export default function HomePage() {
  const heroSlides = [
    {
      src: 'https://i.imgur.com/1sKzNBI.jpeg', 
      alt: 'Surtido de productos de primera necesidad y alimentos variados',
      dataAiHint: 'grocery items'
    },
    { src: 'https://i.imgur.com/1sKzNBI.jpeg', alt: 'La Frescura del Campo a Tu Mesa', dataAiHint: 'farm fresh' },
    { src: 'https://i.imgur.com/G4iaCqs.jpeg', alt: 'Combos Pensados Para Ti y Tu Familia', dataAiHint: 'family meal' },
    { src: 'https://i.imgur.com/EOt6GwL.jpeg', alt: 'Compra Fácil y Rápido Desde Casa', dataAiHint: 'online shopping' },
  ];

  // Seleccionar algunos productos para el carrusel (ej. los primeros 8)
  const carouselProducts = allProducts.slice(0, 8);
  // Puedes crear otra lista aquí si quieres productos diferentes para "Ofertas Especiales"
  // const offerProducts = allProducts.filter(p => p.tags?.includes('offer')).slice(0, 4);


  return (
    <div className="space-y-12">
      <section className="relative rounded-lg overflow-hidden">
        <HeroSlider slides={heroSlides} autoPlayInterval={8000} />
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


      <ProductCarousel products={carouselProducts} title="Nuestros Productos" />

      <section className="py-12"> {/* Removed text-center from section if carousel handles its own title centering */}
         <h2 className="text-3xl font-semibold mb-8 text-center">Ofertas Especiales</h2>
         {/* Contenido anterior eliminado y reemplazado por ProductCarousel */}
         <ProductCarousel products={carouselProducts} />
         {/* Si quieres productos diferentes para ofertas, usa algo como: */}
         {/* <ProductCarousel products={offerProducts} /> */}
      </section>
    </div>
  );
}
