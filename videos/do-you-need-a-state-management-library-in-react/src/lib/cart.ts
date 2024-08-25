import { Product } from '@/lib/product';

export interface CartItem {
  id: string;
  product: Product;
  amount: number;
}

export interface Cart {
  items: CartItem[];
}
