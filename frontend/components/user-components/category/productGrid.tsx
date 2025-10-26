import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { ChevronRight, Heart } from "lucide-react";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "@/lib/localStorage/wishlist.localStorage";
import { WishlistItem } from "@/lib/utils/types/wishlist.type";
import { useAppToast } from "@/lib/tostify";
import NoProduct from "./NoProductFound";
import { useEffect, useState } from "react";

type ProductGridProps = {
  products: any[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const { toastSuccess, toastError } = useAppToast();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // ✅ Load wishlist from localStorage on mount
  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const handleAddToWishlist = (product: any) => {
    const isAvailable = product.stock > 0;
    const item: WishlistItem = {
      id: product._id,
      name: product.name,
      image: product.images?.[0] ?? "",
      price: product.originalPrice ?? "",
      originalPrice: product.discountedPrice ?? "",
      category: product.categoryID?.name ?? "",
      inStock: isAvailable,
    };

    const alreadyInWishlist = wishlist.some((w) => w.id === product._id);

    let result;
    if (alreadyInWishlist) {
      // ✅ remove if already exists
      result = removeFromWishlist(product._id);
      setWishlist(getWishlist());
      toastSuccess("Removed from wishlist");
    } else {
      // ✅ add if not in wishlist
      result = addToWishlist(item);
      setWishlist(getWishlist());
      if (result.success) {
        toastSuccess(result.message);
      } else {
        toastError(result.message);
      }
    }
  };

  const isInWishlist = (id: string) => wishlist.some((item) => item.id === id);

  if (products.length === 0) return <NoProduct />; // ✅ render this if no products

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const isAvailable = product.stock > 0;
        const alreadyInWishlist = isInWishlist(product._id);

        const truncatedProductName =
          product.name.length > 20
            ? product.name.slice(0, 20) + "..."
            : product.name;

        return (
          <Card
            key={product._id}
            className="relative overflow-hidden rounded-xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Product Image */}
            <Link href={`/product/${product._id}`} className="flex-1">
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={product.images?.[0] ?? ""}
                  alt={truncatedProductName}
                  className="w-full h-full object-cover"
                />
                <span
                  className={`absolute bottom-2 right-2 px-3 py-1 text-[10px] font-semibold rounded-[4px] shadow-sm ${
                    isAvailable
                      ? "bg-green-600 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isAvailable ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </Link>

            {/* Content */}
            <CardContent className="p-3 space-y-2">
              {/* Category */}
              <p className="text-xs font-medium text-muted-foreground flex gap-1 items-center">
                <Link
                  className="hover:underline hover:text-blue-600"
                  href={`/search?categoryID=${product.categoryID._id}`}
                >
                  {product.categoryID?.name}{" "}
                </Link>
                <ChevronRight className="w-3 h-3" />
                <Link
                  className="hover:underline hover:text-blue-600"
                  href={`/search?categoryID=${product.categoryID._id}&subCategoryID=${product.subCategoryID._id}`}
                >
                  {product.subCategoryID?.name}{" "}
                </Link>
              </p>

              {/* Name */}
              <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">
                {product.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline space-x-2">
                <span className="text-base font-bold text-primary">
                  Rs.{product.discountedPrice}
                </span>
                {product.discountedPrice && (
                  <span className="text-xs line-through text-muted-foreground">
                    Rs.{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <Link href={`/product/${product._id}`} className="flex-1">
                  <Button className="w-full bg-primary text-white text-xs font-semibold hover:bg-primary/90">
                    View Details
                  </Button>
                </Link>
                <Button
                  size="icon"
                  variant="outline"
                  className="w-9 h-9 bg-white hover:bg-white"
                  onClick={() => handleAddToWishlist(product)}
                >
                  <Heart
                    className="w-3 h-3"
                    fill={alreadyInWishlist ? "green" : "none"}
                    color={alreadyInWishlist ? "green" : "gray"}
                  />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
