import type { Category } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.id}`} passHref>
      <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col items-center text-center">
        <CardHeader>
          {category.icon && <category.icon className="h-12 w-12 text-primary mb-2 mx-auto" />}
          {category.imageUrl && (
            <div className="relative h-24 w-24 mx-auto mb-2">
              <Image 
                src={category.imageUrl} 
                alt={category.name} 
                fill
                sizes="96px" // Added sizes attribute for optimization with fill
                className="object-contain" // Replaced layout="fill" objectFit="contain"
                data-ai-hint={category.imageHint || 'category item'}
              />
            </div>
          )}
          <CardTitle className="text-lg">{category.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Explorar {category.name.toLowerCase()}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
