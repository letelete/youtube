import { useCallback } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';

import { Logo } from '@/components/logo';
import { Badge, BadgeContainer, BadgeLabel } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Product, products } from '@/lib/product';

export const Route = createLazyFileRoute(
  '/(add-to-cart-with-usestate)/add-to-cart-with-usestate'
)({
  component: Page,
});

function Page() {
  return (
    <div className='container flex min-h-screen flex-col overflow-hidden p-2'>
      <Header />

      <ProductsList data={products} />
    </div>
  );
}

function Header() {
  return (
    <header className='container flex items-center justify-between py-4'>
      <Logo width={60} />

      <ShoppingCartButton />
    </header>
  );
}

function ShoppingCartButton({ itemsCount = 0 }: { itemsCount?: number }) {
  return (
    <Button variant='ghost' size='icon'>
      <BadgeContainer>
        <Icon name='shopping-cart' />

        {itemsCount !== undefined ? (
          <Badge>
            <BadgeLabel value={itemsCount} />
          </Badge>
        ) : null}
      </BadgeContainer>
    </Button>
  );
}

function ProductsList({ data }: { data: Product[] }) {
  const handleAddToCart = useCallback((product: Product) => {}, []);

  return (
    <ul>
      {data.map((product) => (
        <ProductCard
          key={product.id}
          data={product}
          onAddToCart={() => handleAddToCart(product)}
        />
      ))}
    </ul>
  );
}

function ProductCard({
  data,
  onAddToCart,
}: {
  data: Product;
  onAddToCart: () => void;
}) {
  return (
    <Card className='max-w-64'>
      <CardHeader>
        <div className='relative aspect-square h-full w-full overflow-hidden rounded-sm bg-muted'>
          <img
            className='absolute left-0 top-0 h-full w-full object-cover'
            src={data.thumbnail.src}
            alt={data.thumbnail.alt}
          />
        </div>
      </CardHeader>

      <CardContent>
        <CardTitle>{data.name}</CardTitle>
        <CardDescription>{data.price}</CardDescription>
      </CardContent>

      <CardFooter className='w-full'>
        <Button className='w-full' onClick={onAddToCart}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}
