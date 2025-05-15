"use client";

import { useEffect, useState } from 'react';
import { getProductRecommendations, type ProductRecommendationsInput, type ProductRecommendationsOutput } from '@/ai/flows/product-recommendations';
import { useCart } from '@/context/CartContext';
import { products as allProducts } from '@/data/products';
import ProductCard from '@/components/products/ProductCard';
import { Loader2 } from 'lucide-react';
import type { Product } from '@/types';

interface ProductRecommendationsProps {
  currentProductId?: string; // To avoid recommending the product being viewed
  contextSearchTerm?: string; // Search term from header or page context
  maxRecommendations?: number;
  triggerViewHistoryProductIds?: string[]; // Explicitly pass viewing history if needed from parent
}

const VIEWING_HISTORY_KEY = 'comboexpress88_viewing_history';
const MAX_HISTORY_ITEMS = 10;

export default function ProductRecommendations({
  currentProductId,
  contextSearchTerm,
  maxRecommendations = 3,
  triggerViewHistoryProductIds,
}: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { items: cartItems } = useCart();
  const [viewingHistory, setViewingHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load viewing history from localStorage
    const storedHistory = localStorage.getItem(VIEWING_HISTORY_KEY);
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setViewingHistory(parsedHistory);
        }
      } catch (e) {
        console.error("Failed to parse viewing history:", e);
        localStorage.removeItem(VIEWING_HISTORY_KEY);
      }
    }
  }, []);
  
  // Update viewing history if triggerViewHistoryProductIds are provided (e.g. from product page)
  useEffect(() => {
    if (triggerViewHistoryProductIds && triggerViewHistoryProductIds.length > 0) {
      setViewingHistory(prevHistory => {
        const newHistory = [...triggerViewHistoryProductIds, ...prevHistory]
          .filter((id, index, self) => self.indexOf(id) === index) // Unique IDs
          .slice(0, MAX_HISTORY_ITEMS);
        localStorage.setItem(VIEWING_HISTORY_KEY, JSON.stringify(newHistory));
        return newHistory;
      });
    }
  }, [triggerViewHistoryProductIds]);


  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);

      const input: ProductRecommendationsInput = {
        viewingHistory: viewingHistory.filter(id => id !== currentProductId),
        cartItems: cartItems.map(item => item.id),
        searchTerm: contextSearchTerm,
        numberOfRecommendations: maxRecommendations,
      };

      try {
        const result: ProductRecommendationsOutput = await getProductRecommendations(input);
        const recommendedProducts = result.productRecommendations
          .map(rec => allProducts.find(p => p.id === rec.productId))
          .filter((p): p is Product => Boolean(p) && p.id !== currentProductId) // Ensure product exists and is not current
          .slice(0, maxRecommendations); // Ensure we don't exceed maxRecommendations
        
        setRecommendations(recommendedProducts);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('No se pudieron cargar las recomendaciones.');
        setRecommendations([]); // Clear recommendations on error
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch recommendations if cart, history, or search term changes
    // or if triggerViewHistoryProductIds changes (indicating a new page view)
    if (cartItems.length > 0 || viewingHistory.length > 0 || contextSearchTerm || triggerViewHistoryProductIds) {
       fetchRecommendations();
    } else {
       // If no context, maybe show some popular items or clear recommendations
       setRecommendations([]); // Or some default popular items
    }

  }, [cartItems, viewingHistory, contextSearchTerm, currentProductId, maxRecommendations, triggerViewHistoryProductIds]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2">Buscando recomendaciones...</p>
      </div>
    );
  }

  if (error && !recommendations.length) {
    return <p className="text-center text-destructive">{error}</p>;
  }

  if (!recommendations.length && !isLoading) {
    return null; // Don't show section if no recommendations and not loading
  }

  return (
    <section className="mt-12 py-8 border-t">
      <h2 className="text-2xl font-semibold mb-6 text-center">Productos Recomendados Para Ti</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
