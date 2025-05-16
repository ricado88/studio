
import ProductList from '@/components/products/ProductList';
import ProductFilters from '@/components/products/ProductFilters';
import { products } from '@/data/products';
import Image from 'next/image';

export default function ProductsPage() {
  return (
    <>
      {/* Hero Section - Full Width */}
      <section
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] aspect-[16/4] overflow-hidden"
      >
        <Image
          src="https://placehold.co/1200x300.png"
          alt="Variedad de productos disponibles"
          layout="fill"
          objectFit="cover"
          priority
          className="z-0"
          data-ai-hint="product assortment"
        />
        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/50 p-4 z-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">
              Nuestros Productos
            </h1>
        </div>
      </section>

      {/* Main content */}
      <div className="mt-8 md:mt-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 lg:w-1/5">
            <ProductFilters />
          </aside>
          <main className="w-full md:w-3/4 lg:w-4/5">
            <ProductList initialProducts={products} />
          </main>
        </div>
      </div>
    </>
  );
}
