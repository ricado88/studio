import ProductList from '@/components/products/ProductList';
import ProductFilters from '@/components/products/ProductFilters';
import { products } from '@/data/products'; // For potentially passing all products initially

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">Nuestros Productos</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </aside>
        <main className="w-full md:w-3/4 lg:w-4/5">
          <ProductList initialProducts={products} />
        </main>
      </div>
    </div>
  );
}
