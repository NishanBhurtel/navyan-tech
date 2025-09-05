// types/wishlist.ts
export interface WishlistItem {
  id: number;
  name: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  badge: string;
  badgeColor: string;
  category: string;
  inStock: boolean;
}
