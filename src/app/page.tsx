
import { categories, products as allProducts } from '@/data/products';
import CategoryCard from '@/components/products/CategoryCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import ProductCarousel from '@/components/ui/ProductCarousel';

export default function HomePage() {
  const carouselProducts = allProducts.slice(0, 8);

  return (
    <>
      {/* Hero Section - Full Width */}
      <section
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-[16/7] md:aspect-[16/6] lg:aspect-[16/5] overflow-hidden"
      >
        <Image
          src="https://i.imgur.com/1sKzNBI.jpeg"
          alt="Surtido de productos de primera necesidad y alimentos variados"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
          data-ai-hint="grocery items"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 p-2 sm:p-4 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
              Bienvenido a ComboExpress88
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-4 sm:mb-6 max-w-md sm:max-w-2xl mx-auto drop-shadow-md">
              Tu supermercado online con los mejores productos frescos, combos y más. ¡Directo a tu puerta!
            </p>
            <Link href="/products" passHref className="pointer-events-auto">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base sm:text-lg">
                Ver Todos los Productos
              </Button>
            </Link>
        </div>
      </section>

      {/* Rest of the page content - centered */}
      <div className="mt-12 space-y-12"> {/* Added mt-12 for spacing below full-width hero */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-center">Nuestras Categorías</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>

        <ProductCarousel products={carouselProducts} title="Nuestros Productos" />

        <section className="py-12">
           <h2 className="text-3xl font-semibold mb-8 text-center">Ofertas Especiales</h2>
           <ProductCarousel products={carouselProducts} />
        </section>
      </div>
    </>
  );
}
