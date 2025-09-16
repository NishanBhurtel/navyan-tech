// types/wishlist.ts
export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  category: string;
  inStock: boolean;
}
