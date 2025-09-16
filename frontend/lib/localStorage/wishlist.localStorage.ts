// utils/wishlistStorage.ts
import { WishlistItem } from "../utils/types/wishlist.type";


const STORAGE_KEY = "wishlist";

export const getWishlist = (): WishlistItem[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as WishlistItem[];
};

export const saveWishlist = (items: WishlistItem[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const addToWishlist = (item: WishlistItem): { success: boolean; message: string } => {
  const current = getWishlist();
  const exists = current.some((w) => w.id === item.id);

  if (exists) {
    return { success: false, message: "Product already in wishlist" };
  }

  current.push(item);
  saveWishlist(current);
  return { success: true, message: "Product added to wishlist" };
};


export const removeFromWishlist = (id: number): void => {
  const current = getWishlist().filter((w) => w.id !== id);
  saveWishlist(current);
};

export const clearWishlist = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
