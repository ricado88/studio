"use client";

import { categories } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

// Define available tags for filtering
const availableTags = [
  { id: 'gluten-free', name: 'Sin Gluten' },
  { id: 'organic', name: 'Orgánico' },
  { id: 'vegan', name: 'Vegano' },
  { id: 'popular', name: 'Popular' }
];

export default function ProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get('category') || 'all';
  const selectedTags = searchParams.getAll('tags');

  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(paramsToUpdate).forEach(([name, value]) => {
        if (value === null) {
          params.delete(name);
        } else if (Array.isArray(value)) {
          params.delete(name); // Remove existing tags before adding new ones
          value.forEach(v => params.append(name, v));
        } else {
          params.set(name, value);
        }
      });
      return params.toString();
    },
    [searchParams]
  );

  const handleCategoryChange = (categoryId: string) => {
    router.push(`/products?${createQueryString({ category: categoryId === 'all' ? null : categoryId })}`);
  };

  const handleTagChange = (tagId: string, checked: boolean) => {
    let newSelectedTags = [...selectedTags];
    if (checked) {
      if (!newSelectedTags.includes(tagId)) {
        newSelectedTags.push(tagId);
      }
    } else {
      newSelectedTags = newSelectedTags.filter(t => t !== tagId);
    }
    router.push(`/products?${createQueryString({ tags: newSelectedTags.length > 0 ? newSelectedTags : null })}`);
  };
  
  const clearFilters = () => {
    router.push('/products');
  };

  return (
    <div className="space-y-6 p-4 border rounded-lg shadow-sm bg-card">
      <h3 className="text-xl font-semibold">Filtrar Productos</h3>
      
      <div>
        <Label htmlFor="category-select" className="text-base font-medium mb-2 block">Categoría</Label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger id="category-select" className="w-full">
            <SelectValue placeholder="Seleccionar categoría" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las Categorías</SelectItem>
            {categories.map(category => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-medium mb-2 block">Etiquetas</Label>
        <div className="space-y-2">
          {availableTags.map(tag => (
            <div key={tag.id} className="flex items-center space-x-2">
              <Checkbox
                id={`tag-${tag.id}`}
                checked={selectedTags.includes(tag.id)}
                onCheckedChange={(checked) => handleTagChange(tag.id, Boolean(checked))}
              />
              <Label htmlFor={`tag-${tag.id}`} className="font-normal">{tag.name}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={clearFilters} variant="outline" className="w-full">Limpiar Filtros</Button>
    </div>
  );
}
