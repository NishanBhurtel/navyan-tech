// types/wishlist.ts
export interface WishlistItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  category: string;
  inStock: boolean;
}
